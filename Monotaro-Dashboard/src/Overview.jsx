import { useEffect, useRef, useState } from 'react'
import { labelOf, orderTotals, rupiah, shippedCount } from './data.js'
import './charts.js'
import { ArrowRight } from 'lucide-react'

const LOW_STOCK = 10
const UNPAID = ['Pending Payment', 'Cancelled']
const WAITING_ON_US = ['Paid', 'Processing']

// one colour per subject, kept the same everywhere it appears on the screen
const STAGE_HUE = { 'Pending Payment': '#ca8a04', Paid: '#ca8a04', Processing: '#ca8a04', Shipped: '#ca8a04', Completed: '#ca8a04' }
const CATEGORY_HUE = { Safety: '#ca8a04', 'Power Tools': '#ca8a04', 'Hand Tools': '#ca8a04', 'Office Supplies': '#ca8a04', Tools: '#ca8a04' }

const compactRp =(v) => (v >= 1e6 ? `Rp ${+(v / 1e6).toFixed(1)} jt` : v >= 1e3 ? `Rp ${Math.round(v / 1e3)} rb` : `Rp ${v}`)
const count = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`
const unitOf = (n, unit) => {
  const u = unit.toLowerCase()
  return n === 1 || u === 'pcs' ? u : u.endsWith('x') ? `${u}es` : `${u}s`
}

export default function Overview({ db, go }) {
  const [metric, setMetric] = useState('revenue')
  const chartRef = useRef(null)

  const statusName = (o) => db.orderStatuses.find((s) => s.id === o.orderStatusId)?.name
  const customer = (id) => labelOf(db.customers.find((c) => c.id === id))
  const total = (o) => orderTotals(o, db).total
  const paid = db.orders.filter((o) => !UNPAID.includes(statusName(o)))

  // the month on screen is the month of the latest order, so the demo data always fills it
  const month = [...db.orders].map((o) => o.orderDate.slice(0, 7)).sort().at(-1) ?? new Date().toISOString().slice(0, 7)
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
      label: 'Paid revenue', hue: '#ca8a04', values: cumulative(monthPaid, total), format: rupiah, tick: compactRp,
      note: `${count(monthPaid.length, 'paid order')}, VAT and delivery included`,
    },
      orders: {
      label: 'Orders placed', hue: '#ca8a04', values: cumulative(monthOrders, () => 1), format: (v) => String(v), tick: (v) => String(v),
      note: `${monthOrders.length - monthPaid.length} unpaid or cancelled`,
    },
      units: {
      label: 'Units sold', hue: '#ca8a04', values: cumulative(monthPaid, units), format: (v) => v.toLocaleString('id-ID'), tick: (v) => v.toLocaleString('id-ID'),
      note: `in ${count(monthPaid.length, 'paid order')}`,
    },
  }
  const active = metrics[metric]
  const labels = Array.from({ length: days }, (_, i) => `${i + 1} ${new Date(yy, mm - 1, 1).toLocaleString('en', { month: 'short' })}`)

  useEffect(() => {
    window.Charts.line(chartRef.current, {
      labels, series: [{ name: active.label, values: active.values, colour: active.hue }],
      format: active.format, tickFormat: active.tick, step: true, endLabel: true, fill: true, height: 240,
    })
  }, [metric, db]) // eslint-disable-line react-hooks/exhaustive-deps

  // item sales by category, before discount, VAT and delivery
  const categoryOf = (skuId) => {
    const sku = db.productSkus.find((s) => s.id === skuId)
    const product = db.products.find((p) => p.id === sku?.productId)
    return db.productCategories.find((c) => c.id === product?.productCategoryId)?.name ?? 'Uncategorised'
  }
  const byCategory = {}
  for (const o of monthPaid) for (const i of o.items) byCategory[categoryOf(i.productSkuId)] = (byCategory[categoryOf(i.productSkuId)] ?? 0) + i.quantity * i.price
  const categoryRows = Object.entries(byCategory).map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value)
  const categoryMax = categoryRows[0]?.value || 1

  const stages = db.orderStatuses.filter((s) => s.name !== 'Cancelled')
  const cancelled = monthOrders.filter((o) => statusName(o) === 'Cancelled')
  const waiting = db.orders.filter((o) => WAITING_ON_US.includes(statusName(o)))
  const lowStock = db.productSkus.filter((s) => s.remainingStock <= LOW_STOCK).sort((a, b) => a.remainingStock - b.remainingStock)
  const reviews = [...db.reviews].sort((a, b) => b.postedAt.localeCompare(a.postedAt)).slice(0, 3)
  const skuName = (id) => db.productSkus.find((s) => s.id === id)?.name ?? '—'

  const finding = [
    waiting.length ? `${count(waiting.length, 'order')} ${waiting.length === 1 ? 'is' : 'are'} paid and waiting to be packed` : 'Nothing is waiting to be packed',
    lowStock[0] && `${lowStock[0].name} is down to ${lowStock[0].remainingStock} ${unitOf(lowStock[0].remainingStock, lowStock[0].unit)}`,
  ].filter(Boolean).join(', and ') + '.'

  return (
    <div className="ov">
      <div className="ov-glow" aria-hidden="true"><span /><span /><span /><span /></div>
      <div className="ov-head">
        <p>{finding}</p>
        {waiting.length > 0 && (
          <button className="ov-primary" onClick={() => go('orders')}>Pack {count(waiting.length, 'order')}</button>
        )}
      </div>

      <div className="ov-top">
      <section className="ov-card" aria-labelledby="ov-sales">
        <div className="ov-card-head">
          <h2 id="ov-sales">Sales in {monthName}</h2>
          <span className="ov-meta">Running total, day by day</span>
        </div>
        <div className="ov-tabs" role="tablist" aria-label="Metric">
          {Object.entries(metrics).map(([key, m]) => (
            <button key={key} role="tab" aria-selected={metric === key} className="ov-tab" style={{ '--hue': m.hue }} onClick={() => setMetric(key)}>
              <span className="ov-tab-label">{m.label}</span>
              <span className="ov-tab-value">{m.format(m.values.at(-1))}</span>
              <span className="ov-tab-note">{m.note}</span>
            </button>
          ))}
        </div>
        <div className="ov-chart" ref={chartRef} />
      </section>

      <section className="ov-card" aria-labelledby="ov-pipeline">
        <div className="ov-card-head">
          <h2 id="ov-pipeline">Order pipeline</h2>
          <button className="ov-link" onClick={() => go('orders')}>All orders<ArrowRight size={14} strokeWidth={2} aria-hidden="true" /></button>
        </div>
        <ol className="ov-stages">
          {stages.map((s) => {
            const rows = db.orders.filter((o) => o.orderStatusId === s.id).sort((a, b) => a.orderDate.localeCompare(b.orderDate))
            return (
              <li key={s.id} className="ov-stage" style={{ '--hue': STAGE_HUE[s.name] ?? '#ca8a04' }} data-waiting={WAITING_ON_US.includes(s.name) || undefined}>
                <div className="ov-stage-head">
                  <span><i className="ov-dot" />{s.name}</span>
                  {WAITING_ON_US.includes(s.name) && rows.length > 0 && <span className="badge">To pack</span>}
                </div>
                <strong className="ov-stage-count">{rows.length}</strong>
                {rows.map((o) => {
                  const { ordered, shipped } = shippedCount(o)
                  return (
                    <div key={o.id} className="ov-order">
                      <div className="ov-order-line">
                        <span>#{o.id} {customer(o.customerAccountId)}</span>
                        <span className="ov-num">{rupiah(total(o))}</span>
                      </div>
                      {s.name === 'Shipped' && shipped < ordered && (
                        <span className="ov-sub">{shipped} of {ordered} units shipped</span>
                      )}
                    </div>
                  )
                })}
                {!rows.length && <span className="ov-sub">None</span>}
              </li>
            )
          })}
        </ol>
        {cancelled.length > 0 && (
          <p className="ov-foot">
            Cancelled in {monthName}: {cancelled.map((o) => `#${o.id} ${customer(o.customerAccountId)}, ${rupiah(total(o))}`).join(' · ')}
          </p>
        )}
      </section>
      </div>

      <div className="ov-row">
        <section className="ov-card" aria-labelledby="ov-cat">
          <div className="ov-card-head">
            <h2 id="ov-cat">Item sales by category</h2>
            <span className="ov-meta">Before VAT</span>
          </div>
          {categoryRows.length ? (
            <ul className="ov-bars">
              {categoryRows.map((r) => (
                <li key={r.label} style={{ '--hue': CATEGORY_HUE[r.label] ?? '#ca8a04' }}>
                  <span>{r.label}</span>
                  <span className="ov-num">{rupiah(r.value)}</span>
                  <span className="ov-bar" style={{ width: `${(r.value / categoryMax) * 100}%` }} />
                </li>
              ))}
            </ul>
          ) : <p className="ov-empty">No paid orders in {monthName} yet.</p>}
        </section>

        <section className="ov-card" aria-labelledby="ov-stock">
          <div className="ov-card-head">
            <h2 id="ov-stock">Low on stock</h2>
            <button className="ov-link" onClick={() => go('productSkus')}>Manage<ArrowRight size={14} strokeWidth={2} aria-hidden="true" /></button>
          </div>
          <ul className="ov-list">
            {lowStock.map((s) => (
              <li key={s.id}>
                <div><span>{s.name}</span><span className="ov-sub">{s.skuNumber}</span></div>
                <span className="ov-num" data-low={s.remainingStock <= 3 || undefined}>{s.remainingStock} <small>{unitOf(s.remainingStock, s.unit)}</small></span>
              </li>
            ))}
            {!lowStock.length && <li className="ov-empty">Every SKU has more than {LOW_STOCK} in stock.</li>}
          </ul>
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
