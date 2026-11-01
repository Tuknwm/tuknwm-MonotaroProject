import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown } from 'lucide-react'

const MAX_HEIGHT = 280

export default function MultiSelect({ value = [], options, onChange, placeholder = 'Select…' }) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState(null)
  const btnRef = useRef(null)
  const listRef = useRef(null)
  const listId = useId()

  const label = value.length === 0
    ? placeholder
    : value.length === 1
    ? options.find((o) => o.value === value[0])?.label ?? `${value.length} selected`
    : `${value.length} selected`

  const show = () => {
    const r = btnRef.current.getBoundingClientRect()
    const width = r.width
    const below = window.innerHeight - r.bottom - 8
    const above = r.top - 8
    const up = below < Math.min(MAX_HEIGHT, options.length * 38 + 8) && above > below
    setPos({
      left: Math.max(8, Math.min(r.left, window.innerWidth - width - 8)),
      width,
      maxHeight: Math.min(MAX_HEIGHT, (up ? above : below) - 4),
      ...(up ? { bottom: window.innerHeight - r.top + 4 } : { top: r.bottom + 4 }),
    })
    setOpen(true)
  }

  const toggle = (v) =>
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v])

  useEffect(() => {
    if (!open) return
    const inside = (e) => listRef.current?.contains(e.target) || btnRef.current?.contains(e.target)
    const onPointer = (e) => !inside(e) && setOpen(false)
    const onScroll = (e) => !listRef.current?.contains(e.target) && setOpen(false)
    document.addEventListener('pointerdown', onPointer)
    window.addEventListener('scroll', onScroll, true)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      window.removeEventListener('scroll', onScroll, true)
    }
  }, [open])

  return (
    <div className="select">
      <button
        ref={btnRef}
        type="button"
        className="select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={(e) => e.key === 'Escape' && (e.preventDefault(), e.stopPropagation(), setOpen(false))}
      >
        <span className={value.length === 0 ? 'muted' : undefined}>{label}</span>
        <ChevronDown size={16} aria-hidden="true" />
      </button>

      {open && createPortal(
        <ul id={listId} ref={listRef} role="listbox" aria-multiselectable="true" className="select-list" style={pos}>
          {options.map((o) => (
            <li
              key={o.value}
              role="option"
              aria-selected={value.includes(o.value)}
              className={value.includes(o.value) ? 'active' : undefined}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => toggle(o.value)}
            >
              <input
                type="checkbox"
                checked={value.includes(o.value)}
                onChange={() => toggle(o.value)}
                tabIndex={-1}
                style={{ marginLeft: '0.5rem', accentColor: '#000' }}
              />
              <span>{o.label}</span>
            </li>
          ))}
        </ul>,
        document.body,
      )}
    </div>
  )
}
