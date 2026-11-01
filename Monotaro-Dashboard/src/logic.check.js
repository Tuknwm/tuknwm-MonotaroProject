// Run with `npm run check`. Asserts the order rules in data.js.
import assert from 'node:assert/strict'
import { changeOrderStatus, inUse, orderTotals, seed, shippedCount } from './data.js'

const stock = (db, id) => db.productSkus.find((s) => s.id === id).remainingStock

// order 3: 3× SKU 4 + 2× SKU 3, VAT 12%, fee 60.000
const t = orderTotals(seed.orders[2], seed)
assert.equal(t.subtotal, 3 * 325000 + 2 * 685000)
assert.equal(t.vat, Math.round(t.subtotal * 0.12))
assert.equal(t.total, t.subtotal + 60000 + t.vat)

// cancelling returns stock, reopening takes it back
const cancelled = changeOrderStatus(seed, 3, 6)
assert.equal(stock(cancelled, 4), stock(seed, 4) + 3)
const reopened = changeOrderStatus(cancelled, 3, 3)
assert.equal(stock(reopened, 4), stock(seed, 4))

// order 6 is already cancelled; reopening it fails when its SKU ran out meanwhile
const soldOut = { ...seed, productSkus: seed.productSkus.map((s) => (s.id === 3 ? { ...s, remainingStock: 0 } : s)) }
assert.throws(() => changeOrderStatus(soldOut, 6, 3), /Not enough stock/)

// cannot ship without an AWB number, or with nothing shipped yet
assert.throws(() => changeOrderStatus(seed, 3, 4), /AWB/)
const withAwb = { ...seed, orders: seed.orders.map((o) => (o.id === 3 ? { ...o, delivery: { ...o.delivery, awbNumber: 'X1' } } : o)) }
assert.throws(() => changeOrderStatus(withAwb, 3, 4), /shipped quantity/)
assert.doesNotThrow(() => changeOrderStatus(seed, 1, 4))

// order 2 is a partial shipment (25 of 40 masks): it can't be completed yet
assert.deepEqual(shippedCount(seed.orders[1]), { ordered: 45, shipped: 30 })
assert.throws(() => changeOrderStatus(seed, 2, 5), /30 of 45/)

// delete guards
assert.ok(inUse(seed, 'brands', 1))
assert.ok(inUse(seed, 'productSkus', 1))
assert.equal(inUse(seed, 'skuAttributes', 1), false)

console.log('logic checks passed')
