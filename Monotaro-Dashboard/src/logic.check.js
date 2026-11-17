import assert from 'node:assert/strict'
import { TABLES, changeOrderStatus, inUse, orderTotals, seed, shippedCount } from './data.js'

const stock = (db, id) => db.productSkus.find((s) => s.id === id).remainingStock

const t = orderTotals(seed.orders[2], seed)
assert.equal(t.subtotal, 3 * 325000 + 2 * 685000)
assert.equal(t.vat, Math.round(t.subtotal * 0.12))
assert.equal(t.total, t.subtotal + 60000 + t.vat)

const cancelled = changeOrderStatus(seed, 3, 6)
assert.equal(stock(cancelled, 4), stock(seed, 4) + 3)
const reopened = changeOrderStatus(cancelled, 3, 3)
assert.equal(stock(reopened, 4), stock(seed, 4))

const soldOut = { ...seed, productSkus: seed.productSkus.map((s) => (s.id === 3 ? { ...s, remainingStock: 0 } : s)) }
assert.throws(() => changeOrderStatus(soldOut, 6, 3), /Not enough stock/)

assert.throws(() => changeOrderStatus(seed, 3, 4), /AWB/)
const withAwb = { ...seed, orders: seed.orders.map((o) => (o.id === 3 ? { ...o, delivery: { ...o.delivery, awbNumber: 'X1' } } : o)) }
assert.throws(() => changeOrderStatus(withAwb, 3, 4), /shipped quantity/)
assert.doesNotThrow(() => changeOrderStatus(seed, 1, 4))

assert.deepEqual(shippedCount(seed.orders[1]), { ordered: 45, shipped: 30 })
assert.throws(() => changeOrderStatus(seed, 2, 5), /30 of 45/)

assert.ok(inUse(seed, 'brands', 1))
assert.ok(inUse(seed, 'productSkus', 1))
assert.ok(inUse(seed, 'skuAttributes', 1))
assert.equal(inUse(seed, 'skuAttributes', 2), false)
assert.ok(inUse(seed, 'specificationAttributes', 1))

const spec = (row) => TABLES.specificationValues.validate(TABLES.specificationValues.normalize(row), seed, 'specificationValues')
const sku = (row, db = seed) => TABLES.skuAttributeValues.validate(TABLES.skuAttributeValues.normalize(row), db, 'skuAttributeValues')
assert.match(spec({ productId: 1, specificationAttributeId: 1, value: '14' }), /already has a value/)
assert.match(spec({ id: 1, productId: 1, specificationAttributeId: 1, value: 'twelve' }), /number/)
assert.equal(spec({ id: 1, productId: 1, specificationAttributeId: 1, value: ' 18 ' }), false)
assert.match(spec({ productId: 6, specificationAttributeId: 1, value: '12' }), /only applies to Power Tools/)
assert.match(spec({ id: 4, productId: 4, specificationAttributeId: 3, value: 'maybe' }), /true or false/)
assert.equal(spec({ id: 4, productId: 4, specificationAttributeId: 3, value: 'FALSE' }), false)
assert.equal(TABLES.specificationValues.normalize({ value: ' True ' }).value, 'true')
const toolsSpec = { ...seed, specificationAttributes: [...seed.specificationAttributes, { id: 9, productCategoryId: 1, name: 'Warranty', jsonDataType: 'string' }] }
assert.equal(TABLES.specificationValues.validate({ productId: 1, specificationAttributeId: 9, value: '1 year' }, toolsSpec, 'specificationValues'), false)
assert.match(spec({ productId: 1, specificationAttributeId: 1, value: '' }), /required/)
assert.match(sku({ productSkuId: 1, skuAttributeId: 1, value: 'Red' }), /already has a value/)
assert.equal(sku({ productSkuId: 2, skuAttributeId: 2, value: 'M' }), false)
assert.match(sku({ skuAttributeId: 2, value: 'M' }), /Choose a SKU/)

assert.match(TABLES.testimonies.normalize({ id: 1 }).updatedAt, /^\d{4}-\d{2}-\d{2}$/)

console.log('logic checks passed')
