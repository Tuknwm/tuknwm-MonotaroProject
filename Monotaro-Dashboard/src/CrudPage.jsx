import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import BottomSheet, { Fab, useIsPhone } from './BottomSheet.jsx'
import ScrollTable from './ScrollTable.jsx'
import { TABLES, inUse, labelOf, nextId, rupiah } from './data.js'
import Select from './Select.jsx'
import MultiSelect from './MultiSelect.jsx'

export function display(db, f, value) {
  if (f.type === 'multi') return value?.length ? value.map((id) => labelOf(db[f.ref].find((r) => r.id === id))).join(', ') : '—'
  if (f.ref) return value == null ? '—' : labelOf(db[f.ref].find((r) => r.id === value))
  if (value == null || value === '') return '—'
  if (f.type === 'password') return '••••••'
  if (f.type === 'money') return rupiah(value)
  if (f.type === 'percent') return `${Math.round(value * 10000) / 100}%`
  if (f.type === 'checkbox') return value ? 'Yes' : 'No'
  if (f.type === 'stars') return '★'.repeat(value) + '☆'.repeat(5 - value)
  return String(value)
}

const EXAMPLES = {
  name: 'e.g. Product name',
  fullname: 'e.g. Budi Santoso',
  email: 'e.g. name@example.com',
  phoneNumber: 'e.g. 081234567890',
  companyName: 'e.g. PT Maju Jaya Teknik',
  companyCity: 'e.g. Jakarta',
  companyType: 'e.g. Manufacturing',
  representativeFullName: 'e.g. Budi Santoso',
  representativePosition: 'e.g. Procurement Manager',
  title: 'e.g. Great product quality',
  brandName: 'e.g. Makita',
  productName: 'e.g. Rotary Hammer',
  code: 'e.g. SAVE10',
  startDate: 'e.g. 2026-01-01',
  endDate: 'e.g. 2026-12-31',
}

const placeholderFor = (f) => f.placeholder ?? EXAMPLES[f.key] ?? (
  f.type === 'date' ? 'e.g. 2026-01-01' :
  f.type === 'number' || f.type === 'money' || f.type === 'percent' ? 'e.g. 100' :
  `e.g. ${f.label}`
)

export function Field({ f, db, value, onChange, selfId }) {
  if (f.type === 'multi') {
    const options = db[f.ref].map((r) => ({ value: r.id, label: labelOf(r) }))
    return <MultiSelect value={value ?? []} options={options} onChange={onChange} placeholder={f.placeholder ?? 'Select…'} />
  }
  if (f.ref || f.options) {
    const options = f.ref
      ? db[f.ref].filter((r) => r.id !== selfId).map((r) => ({ value: r.id, label: labelOf(r) }))
      : f.options.map((o) => ({ value: o, label: o }))
    return (
      <Select
        value={value ?? null}
        required={f.required}
        options={f.required ? options : [{ value: null, label: '—' }, ...options]}
        onChange={onChange}
      />
    )
  }
  if (f.type === 'checkbox') return <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
  if (f.type === 'textarea') return <textarea rows={3} value={value ?? ''} required={f.required} placeholder={placeholderFor(f)} onChange={(e) => onChange(e.target.value)} />

  const numeric = ['number', 'money', 'percent'].includes(f.type)
  return (
    <input
      type={numeric ? 'number' : f.type || 'text'}
      min={numeric ? 0 : undefined}
      max={f.type === 'percent' ? 1 : undefined}
      step={f.type === 'percent' ? 0.01 : 'any'}
      value={value ?? ''}
      required={f.required}
      placeholder={placeholderFor(f)}
      onChange={(e) => onChange(numeric ? (e.target.value === '' ? null : Number(e.target.value)) : e.target.value)}
    />
  )
}

const NUMERIC = new Set(['number', 'money', 'percent', 'stars'])

// fab: show this table's own + on phones (off when the page has one shared + for several tables)
// addSignal: a counter the page bumps to open this table's add form from outside
export default function CrudPage({ table, db, setDb, admin, fab = true, addSignal }) {
  const cfg = TABLES[table]
  const isPhone = useIsPhone()
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState(null)
  const [error, setError] = useState('')
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState(1)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const toggleSort = (key) => {
    if (sortCol === key) setSortDir((d) => -d)
    else { setSortCol(key); setSortDir(1) }
  }

  const columns = cfg.fields.filter((f) => !f.hideInList && (f.type !== 'password' || cfg.inlineEdit))
  const q = query.trim().toLowerCase()
  const filtered = db[table].filter(
    (r) => !q || columns.some((f) => display(db, f, r[f.key]).toLowerCase().includes(q)),
  )
  const rows = sortCol
    ? [...filtered].sort((a, b) => {
        const f = columns.find((c) => c.key === sortCol)
        const va = NUMERIC.has(f?.type) ? (a[sortCol] ?? 0) : display(db, f, a[sortCol]).toLowerCase()
        const vb = NUMERIC.has(f?.type) ? (b[sortCol] ?? 0) : display(db, f, b[sortCol]).toLowerCase()
        return (va < vb ? -1 : va > vb ? 1 : 0) * sortDir
      })
    : filtered

  const open = (row) => {
    setError('')
    setEditing(row ?? { ...cfg.defaults?.(admin) })
  }
  const cancel = () => { setEditing(null); setError('') }
  // on phones a row is added or edited in a bottom sheet instead of inline cells you'd have to scroll across
  const inSheet = isPhone && editing && !cfg.readOnly

  useEffect(() => { if (addSignal) open() }, [addSignal]) // eslint-disable-line react-hooks/exhaustive-deps

  const save = (e) => {
    e?.preventDefault()
    const row = cfg.normalize ? cfg.normalize(editing) : editing
    const problem = cfg.validate?.(row, db, table)
    if (problem) return setError(problem)
    setDb((db) => {
      const list = db[table]
      return row.id
        ? { ...db, [table]: list.map((r) => (r.id === row.id ? row : r)) }
        : { ...db, [table]: [...list, { ...row, id: nextId(list) }] }
    })
    setEditing(null)
  }

  const remove = (row) => {
    const problem = cfg.canDelete?.(row, admin) || inUse(db, table, row.id)
    if (problem) return setError(problem)
    setConfirmDelete(row)
  }

  const doDelete = () => {
    setDb((db) => ({ ...db, [table]: db[table].filter((r) => r.id !== confirmDelete.id) }))
    setConfirmDelete(null)
  }

  const deleteLabel = table === 'blanketOrders'
    ? confirmDelete?.customerName
    : table === 'rfqs'
    ? display(db, cfg.fields.find((f) => f.key === 'customerAccountId'), confirmDelete?.customerAccountId)
    : labelOf(confirmDelete)

  return (
    <>
      <div className="toolbar">
        <div className="search-field">
          <Search size={16} aria-hidden="true" />
          <input type="search" placeholder="Search…" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search" />
        </div>
        <span className="muted">{rows.length} of {db[table].length}</span>
        {!cfg.readOnly && !isPhone && <button className="btn btn-primary" onClick={() => open()}>Add new</button>}
      </div>
      {!cfg.readOnly && isPhone && fab && <Fab label={`Add ${cfg.label}`} onClick={() => open()} />}

      {error && !editing && <div className="alert" role="alert">{error}</div>}

      <ScrollTable>
        <table className="stack">
          <thead>
            <tr>
              {columns.map((f) => (
                <th key={f.key}>
                  <button className="sort-btn" onClick={() => toggleSort(f.key)}>
                    {f.label}
                    <span className="sort-arrow" data-dir={sortCol === f.key ? (sortDir === 1 ? 'asc' : 'desc') : ''} />
                  </button>
                </th>
              ))}
              {cfg.extra?.map((x) => <th key={x.label}>{x.label}</th>)}
              <th />
            </tr>
          </thead>
          <tbody>
            {cfg.inlineEdit && editing && !editing.id && !isPhone && (
              <tr className="row-editing">
                {columns.map((f) => (
                  <td key={f.key} data-label={f.label}>
                    <Field f={f} db={db} value={editing[f.key]} onChange={(v) => setEditing({ ...editing, [f.key]: v })} />
                  </td>
                ))}
                {cfg.extra?.map((x) => <td key={x.label} />)}
                <td className="actions">
                  <button className="btn btn-ghost" onClick={() => { setEditing(null); setError('') }}>Cancel</button>
                  <button className="btn btn-primary" onClick={save}>Save</button>
                </td>
              </tr>
            )}
            {rows.map((r) => {
              const isInlineEditing = cfg.inlineEdit && editing?.id === r.id && !isPhone
              return (
                <tr key={r.id} className={isInlineEditing ? 'row-editing' : undefined}>
                  {columns.map((f) => (
                    <td key={f.key} data-label={f.label}>
                      {isInlineEditing
                        ? <Field f={f} db={db} value={editing[f.key]} onChange={(v) => setEditing({ ...editing, [f.key]: v })} />
                        : display(db, f, r[f.key])}
                    </td>
                  ))}
                  {cfg.extra?.map((x) => <td key={x.label} data-label={x.label}>{x.get(r, db)}</td>)}
                  <td className="actions">
                    {isInlineEditing ? (
                      <span className="action-buttons">
                        <button className="btn btn-ghost" onClick={() => { setEditing(null); setError('') }}>Cancel</button>
                        <button className="btn btn-primary" onClick={save}>Save</button>
                      </span>
                    ) : (
                      <span className="action-buttons">
                        {!cfg.noView && (cfg.readOnly
                          ? <button className="btn btn-ghost" onClick={() => open(r)}>View</button>
                          : <button className="btn btn-ghost" onClick={() => open(r)}>Edit</button>)}
                        {!cfg.noDelete && !cfg.hideDelete?.(r) && !inUse(db, table, r.id)
                          ? <button className="btn btn-danger" onClick={() => remove(r)}>Delete</button>
                          : <span className="action-spacer" aria-hidden="true" />}
                      </span>
                    )}
                  </td>
                </tr>
              )
            })}
            {!rows.length && (
              <tr><td colSpan={99} className="empty">No data found.</td></tr>
            )}
          </tbody>
        </table>
      </ScrollTable>

      {confirmDelete && (
        <div className="overlay" onClick={() => setConfirmDelete(null)}>
          <div className="modal modal-sm" role="dialog" aria-modal="true" aria-label="Confirm delete"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.key === 'Escape' && setConfirmDelete(null)}
            tabIndex={-1}
          >
            <h2>Delete?</h2>
            <p>Are you sure you want to delete <strong>{deleteLabel}</strong>? This cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setConfirmDelete(null)} autoFocus>Cancel</button>
              <button className="btn btn-danger" onClick={doDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {inSheet && (
        <BottomSheet title={`${editing.id ? 'Edit' : 'Add'} ${cfg.label}`} onClose={cancel}>
          <form className="sheet-form" onSubmit={save}>
            <div className="fields">
              {cfg.fields.filter((f) => !f.auto).map((f) => (
                <label key={f.key}>
                  <span>{f.label}{f.required && ' *'}</span>
                  <Field f={f} db={db} value={editing[f.key]} selfId={f.ref === table ? editing.id : undefined}
                    onChange={(v) => setEditing({ ...editing, [f.key]: v })} />
                </label>
              ))}
            </div>
            {error && <div className="alert" role="alert">{error}</div>}
            <div className="sheet-actions">
              <button type="button" className="btn btn-ghost" onClick={cancel}>Cancel</button>
              <button className="btn btn-primary">Save</button>
            </div>
          </form>
        </BottomSheet>
      )}

      {editing && !cfg.inlineEdit && !inSheet && (
        <div className="overlay" onClick={() => setEditing(null)}>
          <form
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label={cfg.label}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.key === 'Escape' && setEditing(null)}
            onSubmit={save}
          >
            <h2>{cfg.readOnly ? 'Details' : editing.id ? 'Edit' : 'Add'} · {cfg.label}</h2>
            <div className="fields">
              {cfg.fields.map((f) => (
                <label key={f.key} className={f.type === 'textarea' || f.type === 'multi' ? 'wide' : undefined}>
                  <span>{f.label}{f.required && !cfg.readOnly && ' *'}</span>
                  {cfg.readOnly || f.auto
                    ? <div className="readonly">{display(db, f, editing[f.key])}</div>
                    : <Field f={f} db={db} value={editing[f.key]} selfId={f.ref === table ? editing.id : undefined}
                        onChange={(v) => setEditing({ ...editing, [f.key]: v })} />}
                </label>
              ))}
            </div>
            {error && <div className="alert" role="alert">{error}</div>}
            <div className="modal-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setEditing(null)} autoFocus={cfg.readOnly}>
                {cfg.readOnly ? 'Close' : 'Cancel'}
              </button>
              {!cfg.readOnly && <button className="btn btn-primary">Save</button>}
            </div>
          </form>
        </div>
      )}
    </>
  )
}
