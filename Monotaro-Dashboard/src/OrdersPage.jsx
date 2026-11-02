import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, Printer } from 'lucide-react'
import { DELIVERY_FIELDS, changeOrderStatus, labelOf, orderTotals, rupiah, shippedCount } from './data.js'
import { Field } from './CrudPage.jsx'
import DeliveryNote from './DeliveryNote.jsx'
import Select from './Select.jsx'
import ScrollTable from './ScrollTable.jsx'

const SORT_FNS = {
  id:       (o)    => o.id,
  date:     (o)    => o.orderDate,
  customer: (o, db) => db.customers.find((c) => c.id === o.customerAccountId)?.fullname ?? '',
  total:    (o, db) => orderTotals(o, db).total,
  payment:  (o)    => o.paymentMethod,
}

export default function OrdersPage({ db, setDb }) {
  const [statusFilter, setStatusFilter] = useState(null)
  const [openId, setOpenId] = useState(null)
  const [error, setError] = useState('')
  const [sortCol, setSortCol] = useState('date')
  const [sortDir, setSortDir] = useState(-1) // -1 desc, 1 asc

  const toggleSort = (col) => {
    if (sortCol === col) setSortDir((d) => -d)
    else { setSortCol(col); setSortDir(col === 'date' ? -1 : 1) }
  }

  const statusOptions = db.orderStatuses.map((s) => ({ value: s.id, label: s.name }))
  const fn = SORT_FNS[sortCol]
  const orders = db.orders
    .filter((o) => !statusFilter || o.orderStatusId === statusFilter)
    .sort((a, b) => {
      const va = fn(a, db), vb = fn(b, db)
      return (va < vb ? -1 : va > vb ? 1 : 0) * sortDir
    })
  const customer = (o) => db.customers.find((c) => c.id === o.customerAccountId)

  const setStatus = (order, statusId) => {
    try {
      setDb(changeOrderStatus(db, order.id, statusId))
      setError('')
    } catch (e) {
      setError(`Order #${order.id}: ${e.message}`)
    }
  }

  return (
    <>
      <div className="toolbar">
        <Select
          className="select-inline"
          label="Filter by status"
          value={statusFilter}
          options={[{ value: null, label: 'All statuses' }, ...statusOptions]}
          onChange={setStatusFilter}
        />
      </div>

      {error && <div className="alert" role="alert">{error}</div>}

      {/* on phones each row is laid out as a card, see table.orders in index.css */}
      <ScrollTable className="table-wrap orders-wrap">
        <table className="stack orders">
          <thead>
            <tr>
              {[['id','Order'],['date','Date'],['customer','Customer']].map(([col,label]) => (
                <th key={col}><button className="sort-btn" onClick={() => toggleSort(col)}>{label}<ChevronDown size={14} className={`sort-arrow${sortCol===col ? (sortDir===1?' asc':' desc') : ''}`} aria-hidden="true" /></button></th>
              ))}
              <th>Items</th>
              {[['total','Total'],['payment','Payment']].map(([col,label]) => (
                <th key={col}><button className="sort-btn" onClick={() => toggleSort(col)}>{label}<ChevronDown size={14} className={`sort-arrow${sortCol===col ? (sortDir===1?' asc':' desc') : ''}`} aria-hidden="true" /></button></th>
              ))}
              <th>Status</th><th />
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => {
              const { ordered, shipped } = shippedCount(o)
              return (
                <tr key={o.id}>
                  <td className="o-id">#{o.id}</td>
                  <td className="o-date">{o.orderDate}</td>
                  <td className="o-customer">{labelOf(customer(o))}</td>
                  <td className="o-items">
                    {ordered} {ordered === 1 ? 'item' : 'items'}
                    {shipped > 0 && shipped < ordered && <span className="badge badge-warn">{shipped} shipped</span>}
                  </td>
                  <td className="o-total">{rupiah(orderTotals(o, db).total)}</td>
                  <td className="o-payment">{o.paymentMethod}</td>
                  <td className="o-status">
                    <Select
                      className="select-inline"
                      label={`Status of order ${o.id}`}
                      value={o.orderStatusId}
                      options={statusOptions}
                      onChange={(id) => setStatus(o, id)}
                    />
                  </td>
                  <td className="actions"><button className="btn btn-ghost" onClick={() => setOpenId(o.id)}>Details</button></td>
                </tr>
              )
            })}
            {!orders.length && <tr><td colSpan={99} className="empty">No orders found.</td></tr>}
          </tbody>
        </table>
      </ScrollTable>

      {openId && (
        <OrderDetail key={openId} order={db.orders.find((o) => o.id === openId)} db={db} setDb={setDb} onClose={() => setOpenId(null)} />
      )}
    </>
  )
}

function OrderDetail({ order, db, setDb, onClose }) {
  const [delivery, setDelivery] = useState(order.delivery)
  const [shipped, setShipped] = useState(() => order.items.map((i) => i.shippedQty ?? 0))
  const [printing, setPrinting] = useState(false)
  const [closing, setClosing] = useState(false)
  const t = orderTotals(order, db)
  const c = db.customers.find((x) => x.id === order.customerAccountId)
  const address = db.deliveryAddresses.find((a) => a.id === order.deliveryAddressId)
  const sku = (id) => db.productSkus.find((s) => s.id === id)

  // printCount isn't in the form, so it always comes from the stored order, never the draft
  const persist = (printed = 0) =>
    setDb((db) => ({
      ...db,
      orders: db.orders.map((o) => (o.id !== order.id ? o : {
        ...o,
        delivery: { ...delivery, printCount: (o.delivery.printCount ?? 0) + printed },
        items: o.items.map((i, k) => ({ ...i, shippedQty: shipped[k] })),
      })),
    }))

  const save = (e) => {
    e.preventDefault()
    persist()
    close()
  }

  const close = () => {
    if (closing) return
    setClosing(true)
    window.setTimeout(onClose, 180)
  }

  // printing also saves, so the paper always matches what is stored
  const print = () => {
    persist(1)
    setPrinting(true)
  }

  useEffect(() => {
    if (!printing) return
    const done = () => setPrinting(false)
    window.addEventListener('afterprint', done)
    window.print()
    return () => window.removeEventListener('afterprint', done)
  }, [printing])

  const setShippedAt = (k, value) =>
    setShipped(shipped.map((n, j) => (j === k ? Math.min(order.items[k].quantity, Math.max(0, Math.floor(value) || 0)) : n)))

  return (
    <div className={`overlay${closing ? ' closing' : ''}`} onClick={close}>
      <form
        className={`modal modal-lg${closing ? ' closing' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={`Order ${order.id}`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.key === 'Escape' && close()}
        onSubmit={save}
      >
        <h2>Order #{order.id} · {labelOf(db.orderStatuses.find((s) => s.id === order.orderStatusId))}</h2>

        <div className="detail-grid">
          <div>
            <h3>Customer</h3>
            <p>{c.fullname}{c.companyName && ` · ${c.companyName}`}</p>
            <p className="muted">{c.email} · {c.phoneNumber}</p>
          </div>
          <div>
            <h3>Ship to</h3>
            <p>{address.receiverName} · {address.receiverPhoneNumber}</p>
            <p className="muted">{address.detailedAddress}, {address.regionAddress}</p>
          </div>
        </div>

        <div className="table-wrap">
          <table className="stack">
            <thead><tr><th>SKU</th><th>Qty</th><th>Price</th><th>Line total</th></tr></thead>
            <tbody>
              {order.items.map((i) => (
                <tr key={i.productSkuId}>
                  <td data-label="SKU"><span>{sku(i.productSkuId)?.name}<div className="muted">{sku(i.productSkuId)?.skuNumber}</div></span></td>
                  <td data-label="Qty">{i.quantity}</td>
                  <td data-label="Price">{rupiah(i.price)}</td>
                  <td data-label="Line total">{rupiah(i.quantity * i.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <dl className="totals">
          <dt>Subtotal</dt><dd>{rupiah(t.subtotal)}</dd>
          {t.discount > 0 && <><dt>Discount ({order.discountDecimal * 100}%)</dt><dd>− {rupiah(t.discount)}</dd></>}
          <dt>Delivery fee ({t.totalWeightKg.toFixed(2)} kg)</dt><dd>{rupiah(order.deliveryFee)}</dd>
          <dt>VAT ({Math.round(t.rate * 100)}%)</dt><dd>{rupiah(t.vat)}</dd>
          <dt className="total">Total</dt><dd className="total">{rupiah(t.total)}</dd>
        </dl>
        {order.remarks && <p className="muted">Remarks: {order.remarks}</p>}

        <h3>Delivery</h3>
        <div className="fields">
          {DELIVERY_FIELDS.map((f) => (
            <label key={f.key} className={f.type === 'textarea' ? 'wide' : undefined}>
              <span>{f.label}</span>
              <Field f={f} db={db} value={delivery[f.key]} onChange={(v) => setDelivery({ ...delivery, [f.key]: v })} />
            </label>
          ))}
        </div>

        <h3>Shipped items</h3>
        <div className="table-wrap">
          <table className="stack">
            <thead><tr><th>SKU</th><th>Ordered</th><th>Shipped</th><th>Remaining</th></tr></thead>
            <tbody>
              {order.items.map((i, k) => (
                <tr key={i.productSkuId}>
                  <td data-label="SKU">{sku(i.productSkuId)?.name}</td>
                  <td data-label="Ordered">{i.quantity}</td>
                  <td data-label="Shipped">
                    <input
                      type="number"
                      className="qty"
                      min={0}
                      max={i.quantity}
                      value={shipped[k]}
                      aria-label={`Shipped quantity of ${sku(i.productSkuId)?.name}`}
                      onChange={(e) => setShippedAt(k, Number(e.target.value))}
                    />
                  </td>
                  <td data-label="Remaining">
                    {i.quantity - shipped[k] ? <span className="badge badge-warn">{i.quantity - shipped[k]}</span> : <span className="badge">Done</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-ghost print-btn" onClick={print}>
            <Printer size={16} aria-hidden="true" /> Print delivery note
          </button>
          <button type="button" className="btn btn-ghost" onClick={close}>Cancel</button>
          <button className="btn btn-primary">Save delivery</button>
        </div>
      </form>

      {printing && createPortal(<div className="print-only"><DeliveryNote order={order} db={db} /></div>, document.body)}
    </div>
  )
}
