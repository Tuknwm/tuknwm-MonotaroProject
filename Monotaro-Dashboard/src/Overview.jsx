import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { labelOf, orderTotals, rupiah } from './data.js'
import './charts.js'
import './Overview.css'

const LOW_STOCK = 10
const UNPAID = ['Pending Payment', 'Cancelled']
const MOVE = { 'Pending Payment': 'customer', Paid: 'us', Processing: 'us', Shipped: 'done', Completed: 'done' }
const MOVE_LABEL = { us: 'Our move', customer: 'Waiting on customer', done: 'With courier or done' }

const compactRp = (v) => (v >= 1e6 ? `Rp ${+(v / 1e6).toFixed(1)} jt` : v >= 1e3 ? `Rp ${Math.round(v / 1e3)} rb` : `Rp ${v}`)
const count = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`
const unitOf = (n, unit) => {
  const u = unit.toLowerCase()
  return n === 1 || u === 'pcs' ? u : u.endsWith('x') ? `${u}es` : `${u}s`
}
const shortDate = (iso) => new Date(`${iso}T00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })

export default function Overview({ db, go }) {
  const [metric, setMetric] = useState('revenue')
  const [inclVat, setInclVat] = useState(false)
  const chartRef = useRef(null)

  const statusName = (o) => db.orderStatuses.find((s) => s.id === o.orderStatusId)?.name
  const customer = (id) => labelOf(db.customers.find((c) => c.id === id))
  const total = (o) => orderTotals(o, db).total
  const paid = db.orders.filter((o) => !UNPAID.includes(statusName(o)))

  const month =[...db.orders].map((o) => o.orderDate.slice(0, 7)).sort().at(-1) ?? new Date().toISOString().slice(0, 7)
  const [yy, mm] = month.split('-').map(Number)
  const days = new Date(yy, mm, 0).getDate()
  const monthName = new Date(yy, mm - 1, 1).toLocaleString('en', { month: 'long', year: 'numeric' })
  const inMonth = (o) => o.orderDate.startsWith(month)
  const monthOrders = db.orders.filter(inMonth)
  const monthPaid = paid.filter(inMonth)
  const units = (o) => o.items.reduce((n, i) => n + i.quantity, 0)

  const cumulative = (rows, value) => {
    const perDay = Array(days).fill(0)
    for (const o of rows) perDay[Number(o.orderDate.slice(8, 10)) - 1] += value(o)
    let run = 0
    return perDay.map((v) => (run += v))
  }

  const metrics = {
    revenue: {
      label: 'Paid revenue', values: cumulative(monthPaid, total), format: rupiah, tick: compactRp,
      note: `${count(monthPaid.length, 'paid order')}, VAT and delivery included`,
    },
    orders: {
      label: 'Orders placed', values: cumulative(monthOrders, () => 1), format: String, tick: String,
      note: `${monthOrders.length - monthPaid.length} unpaid or cancelled`,
    },
    units: {
      label: 'Units sold', values: cumulative(monthPaid, units), format: (v) => v.toLocaleString('id-ID'), tick: (v) => v.toLocaleString('id-ID'),
      note: `in ${count(monthPaid.length, 'paid order')}`,
    },
  }
  const active = metrics[metric]
  const monthShort = new Date(yy, mm - 1, 1).toLocaleString('en', { month: 'short' })
  const labels = Array.from({ length: days }, (_, i) => `${i + 1} ${monthShort}`)

  useEffect(() => {
    const phone = window.matchMedia('(max-width: 768px)').matches
    window.Charts.line(chartRef.current, {
      labels, series: [{ name: active.label, values: active.values }],
      format: active.format, tickFormat: active.tick, step: true, endLabel: true, fill: true, height: phone ? 200 : 318,
      xAt: phone ? [0, 10, 20, 30].filter((i) => i < days) : null,
    })
  }, [metric, db])

  const categoryOf =(skuId) => {
    const sku = db.productSkus.find((s) => s.id === skuId)
    const product = db.products.find((p) => p.id === sku?.productId)
    return db.productCategories.find((c) => c.id === product?.productCategoryId)?.name ?? 'Uncategorised'
  }
  const vatRate = (o) => db.vatRecords.find((v) => v.id === o.vatId)?.rateDecimal ?? 0
  const byCategory = {}
  for (const o of monthPaid) for (const i of o.items) {
    const c = categoryOf(i.productSkuId)
    byCategory[c] = (byCategory[c] ?? 0) + i.quantity * i.price * (inclVat ? 1 + vatRate(o) : 1)
  }
  const categoryRows = Object.entries(byCategory).map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value)
  const categoryMax = categoryRows[0]?.value || 1

  const stages = db.orderStatuses.filter((s) => MOVE[s.name])
  const stageRows = stages.map((s) => ({ ...s, move: MOVE[s.name], rows: db.orders.filter((o) => o.orderStatusId === s.id) }))
  const cancelled = db.orders.filter((o) => statusName(o) === 'Cancelled').length
  const waiting = db.orders.filter((o) => MOVE[statusName(o)] === 'us').sort((a, b) => a.orderDate.localeCompare(b.orderDate))
  const lowStock = db.productSkus.filter((s) => s.remainingStock <= LOW_STOCK).sort((a, b) => a.remainingStock - b.remainingStock)
  const reviews = [...db.reviews].sort((a, b) => b.postedAt.localeCompare(a.postedAt)).slice(0, 4)
  const skuName = (id) => db.productSkus.find((s) => s.id === id)?.name ?? '—'

  const finding = [
    waiting.length ? `${count(waiting.length, 'order')} ${waiting.length === 1 ? 'is' : 'are'} paid and waiting on us` : 'Nothing is waiting to be packed',
    lowStock[0] && `${lowStock[0].name} is down to ${lowStock[0].remainingStock} ${unitOf(lowStock[0].remainingStock, lowStock[0].unit)}`,
  ].filter(Boolean).join(', and ') + '.'

  return (
    <div className="ov">
      <div className="ov-head">
        <p>{finding}</p>
        <button className="ov-primary" onClick={() => go('orders')}>
          {waiting.length ? `Pack ${count(waiting.length, 'order')}` : 'View orders'}
          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      <div className="ov-main">
        <section className="ov-card ov-flow" aria-labelledby="ov-flow">
          <div className="ov-card-head">
            <h2 id="ov-flow">Whose move</h2>
            <ul className="ov-key" aria-label="Key">
              {Object.entries(MOVE_LABEL).map(([k, l]) => <li key={k}><i data-move={k} />{l}</li>)}
            </ul>
          </div>
          <ol className="ov-stages">
            {stageRows.map((s) => (
              <li key={s.id}>
                <button className="ov-stage" data-move={s.move} onClick={() => go('orders')}>
                  <span className="ov-stage-track" aria-hidden="true" />
                  <span className="ov-stage-count">{s.rows.length}</span>
                  <span className="ov-stage-name">{s.name}</span>
                  <span className="ov-stage-sum">{s.rows.length ? rupiah(s.rows.reduce((n, o) => n + total(o), 0)) : '—'}</span>
                </button>
              </li>
            ))}
          </ol>
          <p className="ov-note">{cancelled ? `${count(cancelled, 'order')} cancelled, not counted above.` : 'No cancelled orders.'}</p>
        </section>
        <section className="ov-card" aria-labelledby="ov-sales">
          <div className="ov-card-head">
            <h2 id="ov-sales">Sales in {monthName}</h2>
            <span className="ov-meta">Running total, day by day</span>
          </div>
          <div className="ov-tabs" role="tablist" aria-label="Metric">
            {Object.entries(metrics).map(([key, m]) => (
              <button key={key} role="tab" aria-selected={metric === key} className="ov-tab" onClick={() => setMetric(key)}>
                <span className="ov-tab-label">{m.label}</span>
                <span className="ov-tab-value">{m.format(m.values.at(-1))}</span>
                <span className="ov-tab-note">{m.note}</span>
              </button>
            ))}
          </div>
          <div className="ov-chart" ref={chartRef} />
        </section>

        <div className="ov-side">
        <section className="ov-card" aria-labelledby="ov-pack">
          <div className="ov-card-head">
            <h2 id="ov-pack">To pack and ship</h2>
            <span className="ov-meta">Oldest first</span>
          </div>
          <ul className="ov-list">
            {waiting.slice(0, 5).map((o) => (
              <li key={o.id}>
                <div>
                  <span>#{o.id} {customer(o.customerAccountId)}</span>
                  <span className="ov-sub">Ordered {shortDate(o.orderDate)} · {o.paymentMethod}</span>
                </div>
                <div className="ov-right">
                  <span className="ov-num">{rupiah(total(o))}</span>
                  <span className="ov-badge" data-solid={statusName(o) === 'Processing' || undefined}>{statusName(o)}</span>
                </div>
              </li>
            ))}
            {!waiting.length && <li className="ov-empty">Nothing is waiting to be packed.</li>}
          </ul>
          <button className="ov-link" onClick={() => go('orders')}>All orders<ArrowRight size={14} strokeWidth={2} aria-hidden="true" /></button>
        </section>

        <section className="ov-card" aria-labelledby="ov-stock">
          <div className="ov-card-head">
            <h2 id="ov-stock">Low on stock</h2>
            <button className="ov-link" onClick={() => go('products')}>Manage<ArrowRight size={14} strokeWidth={2} aria-hidden="true" /></button>
          </div>
          <ul className="ov-list">
            {lowStock.slice(0, 4).map((s) => (
              <li key={s.id}>
                <div><span>{s.name}</span><span className="ov-sub">{s.skuNumber}</span></div>
                <span className="ov-num" data-low={s.remainingStock <= 3 || undefined}>{s.remainingStock} <small>{unitOf(s.remainingStock, s.unit)}</small></span>
              </li>
            ))}
            {!lowStock.length && <li className="ov-empty">Every SKU has more than {LOW_STOCK} in stock.</li>}
          </ul>
        </section>
        </div>
      </div>

      <div className="ov-row">
        <section className="ov-card" aria-labelledby="ov-cat">
          <div className="ov-card-head">
            <h2 id="ov-cat">Sales by category</h2>
            <div className="ov-seg" role="group" aria-label="VAT">
              <button aria-pressed={!inclVat} onClick={() => setInclVat(false)}>Before VAT</button>
              <button aria-pressed={inclVat} onClick={() => setInclVat(true)}>After VAT</button>
            </div>
          </div>
          {categoryRows.length ? (
            <ul className="ov-bars">
              {categoryRows.map((r, k) => (
                <li key={r.label}>
                  <span>{r.label}</span>
                  <span className="ov-num">{rupiah(Math.round(r.value))}</span>
                  <i className="ov-bar" data-top={k === 0 || undefined} style={{ width: `${(r.value / categoryMax) * 100}%` }} />
                </li>
              ))}
            </ul>
          ) : <p className="ov-empty">No paid orders in {monthName} yet.</p>}
        </section>

        <section className="ov-card" aria-labelledby="ov-reviews">
          <div className="ov-card-head">
            <h2 id="ov-reviews">Latest reviews</h2>
            <button className="ov-link" onClick={() => go('reviews')}>Moderate<ArrowRight size={14} strokeWidth={2} aria-hidden="true" /></button>
          </div>
          <ul className="ov-list">
            {reviews.map((r) => (
              <li key={r.id}>
                <div>
                  <span>{r.title}</span>
                  <span className="ov-sub">{customer(r.customerAccountId)} on {skuName(r.productSkuId)}</span>
                </div>
                <span className="ov-num" data-low={r.stars <= 2 || undefined} aria-label={`${r.stars} out of 5 stars`}>{r.stars} <small>/ 5</small></span>
              </li>
            ))}
            {!reviews.length && <li className="ov-empty">No reviews yet.</li>}
          </ul>
        </section>
      </div>
    </div>
  )
}
