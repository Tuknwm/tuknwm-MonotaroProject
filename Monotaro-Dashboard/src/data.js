// Demo data and rules. Everything lives in memory, so a page refresh resets it.

export const today = () => new Date().toISOString().slice(0, 10)

export const rupiah = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n || 0)

export const labelOf = (row) =>
  row ? row.name ?? row.fullname ?? row.code ?? row.title ?? row.value ?? `#${row.id}` : '—'

const name = { key: 'name', label: 'Name', required: true }
const jsonDataType = { key: 'jsonDataType', label: 'Data Type', options: ['string', 'number', 'boolean'], required: true }
const unique = (key, message) => (row, db, table) =>
  db[table].some((r) => r.id !== row.id && String(r[key]).toLowerCase() === String(row[key]).toLowerCase()) && message
const validPeriod = (row) => row.endDate && row.startDate > row.endDate && 'End date must be after start date.'

// attribute values (ERD: SpecificationAttributeValue, ProductSkuAttributeValue): one value per owner + attribute,
// typed by the attribute's jsonDataType
const cleanValue = (row) => {
  const v = String(row.value ?? '').trim()
  return { ...row, value: /^(true|false)$/i.test(v) ? v.toLowerCase() : v }
}
const typeProblem = (type, v) =>
  (type === 'number' && !Number.isFinite(Number(v)) && 'Value must be a number.') ||
  (type === 'boolean' && !['true', 'false'].includes(v) && 'Value must be true or false.')
const valueProblem = ({ owner, ownerKey, attrTable, attrKey }) => (row, db, table) => {
  if (!row[ownerKey]) return `Choose a ${owner}.`
  if (!row[attrKey]) return 'Choose an attribute.'
  if (!row.value) return 'Value is required.'
  if (db[table].some((r) => r.id !== row.id && r[ownerKey] === row[ownerKey] && r[attrKey] === row[attrKey]))
    return `This ${owner} already has a value for that attribute. Edit that one instead.`
  return typeProblem(db[attrTable].find((a) => a.id === row[attrKey])?.jsonDataType, row.value)
}
// a specification belongs to a category; it also applies to products in that category's subcategories
const specFitsProduct = (row, db) => {
  const product = db.products.find((p) => p.id === row.productId)
  const spec = db.specificationAttributes.find((a) => a.id === row.specificationAttributeId)
  const category = db.productCategories.find((c) => c.id === product.productCategoryId)
  if (spec.productCategoryId === category?.id || spec.productCategoryId === category?.parentId) return false
  return `${spec.name} only applies to ${labelOf(db.productCategories.find((c) => c.id === spec.productCategoryId))} products.`
}

// Field types: text (default), textarea, number, money, percent (stored 0–1), date, checkbox, password, email, stars.
// `ref` points at another table; with type 'multi' it holds an array of ids.
export const TABLES = {
  rfqs: {
    label: 'Quotation Requests', readOnly: true, noView: true,
    fields: [
      { key: 'customerAccountId', label: 'Customer', ref: 'customers' },
      { key: 'brandName', label: 'Brand' },
      { key: 'productName', label: 'Product' },
      { key: 'quantity', label: 'Qty', type: 'number' },
      { key: 'budget', label: 'Budget', type: 'money' },
      { key: 'documentFilePath', label: 'Document' },
      { key: 'productUrl', label: 'Product URL' },
    ],
  },
  blanketOrders: {
    label: 'Blanket Orders', readOnly: true, noView: true,
    fields: [
      { key: 'customerAccountId', label: 'Customer', ref: 'customers' },
      { key: 'companyName', label: 'Company' },
      { key: 'email', label: 'Email' },
      { key: 'phoneNumber', label: 'Phone' },
      { key: 'notes', label: 'Notes', type: 'textarea' },
    ],
  },
  customers: {
    label: 'Customers', readOnly: true, noDelete: true, noView: true,
    fields: [
      { key: 'fullname', label: 'Full Name' },
      { key: 'email', label: 'Email' },
      { key: 'phoneNumber', label: 'Phone' },
      { key: 'accountType', label: 'Type' },
      { key: 'companyName', label: 'Company' },
      { key: 'departmentName', label: 'Department' },
      { key: 'companyTypeId', label: 'Company Type', ref: 'companyTypes' },
      { key: 'companyClassificationId', label: 'Classification', ref: 'companyClassifications' },
      { key: 'employeeSizeCategoryId', label: 'Employees', ref: 'employeeSizes' },
    ],
    extra: [{ label: 'Orders', get: (r, db) => db.orders.filter((o) => o.customerAccountId === r.id).length }],
  },
  products: {
    label: 'Products', inlineEdit: true,
    fields: [
      name,
      { key: 'brandId', label: 'Brand', ref: 'brands', required: true },
      { key: 'productCategoryId', label: 'Category', ref: 'productCategories', required: true },
      { key: 'popularityCategoryId', label: 'Popularity', ref: 'popularityCategories' },
      { key: 'condition', label: 'Condition', options: ['New', 'Refurbished'], required: true },
      { key: 'description', label: 'Description', type: 'textarea', hideInList: true },
    ],
    extra: [
      { label: 'Specs', get: (r, db) => db.specificationValues.filter((v) => v.productId === r.id).length },
      { label: 'SKUs', get: (r, db) => db.productSkus.filter((s) => s.productId === r.id).length },
      { label: 'Stock', get: (r, db) => db.productSkus.filter((s) => s.productId === r.id).reduce((n, s) => n + s.remainingStock, 0) },
    ],
  },
  productSkus: {
    label: 'Product SKUs', inlineEdit: true,
    fields: [
      { key: 'productId', label: 'Product', ref: 'products', required: true },
      { key: 'skuNumber', label: 'SKU Number', required: true },
      name,
      { key: 'price', label: 'Price', type: 'money', required: true },
      { key: 'unit', label: 'Unit', options: ['Unit', 'Pcs', 'Set', 'Box', 'Pack'], required: true },
      { key: 'unitAmount', label: 'Unit Amount', type: 'number', required: true },
      { key: 'weightKg', label: 'Weight (kg)', type: 'number', required: true },
      { key: 'remainingStock', label: 'Stock', type: 'number', required: true },
      { key: 'imagePath', label: 'Image Path', hideInList: true },
    ],
    validate: unique('skuNumber', 'SKU number already exists.'),
  },
  brands: {
    label: 'Brands', inlineEdit: true,
    fields: [name, { key: 'isAuthorizedPartner', label: 'Authorized Partner', type: 'checkbox' }],
    validate: unique('name', 'Brand already exists.'),
  },
  productCategories: {
    label: 'Categories', inlineEdit: true,
    fields: [name, { key: 'parentId', label: 'Parent Category', ref: 'productCategories' }],
  },
  popularityCategories: { label: 'Popularity Categories', inlineEdit: true, fields: [name] },
  specificationAttributes: {
    label: 'Specifications', inlineEdit: true,
    fields: [{ key: 'productCategoryId', label: 'Category', ref: 'productCategories', required: true }, name, jsonDataType],
  },
  skuAttributes: { label: 'SKU Attributes', inlineEdit: true, fields: [name, jsonDataType] },
  specificationValues: {
    label: 'Specification Values', inlineEdit: true,
    fields: [
      { key: 'productId', label: 'Product', ref: 'products', required: true },
      { key: 'specificationAttributeId', label: 'Specification', ref: 'specificationAttributes', required: true },
      { key: 'value', label: 'Value', required: true, placeholder: 'e.g. 12' },
    ],
    normalize: cleanValue,
    validate: (row, db, table) =>
      valueProblem({ owner: 'product', ownerKey: 'productId', attrTable: 'specificationAttributes', attrKey: 'specificationAttributeId' })(row, db, table) ||
      specFitsProduct(row, db),
  },
  skuAttributeValues: {
    label: 'SKU Attribute Values', inlineEdit: true,
    fields: [
      { key: 'productSkuId', label: 'SKU', ref: 'productSkus', required: true },
      { key: 'skuAttributeId', label: 'Attribute', ref: 'skuAttributes', required: true },
      { key: 'value', label: 'Value', required: true, placeholder: 'e.g. Red' },
    ],
    normalize: cleanValue,
    validate: valueProblem({ owner: 'SKU', ownerKey: 'productSkuId', attrTable: 'skuAttributes', attrKey: 'skuAttributeId' }),
  },
  vouchers: {
    label: 'Vouchers', inlineEdit: true,
    fields: [
      { key: 'code', label: 'Code', required: true, placeholder: 'e.g. SAVE10' },
      { key: 'discountDecimal', label: 'Discount', type: 'percent', required: true, placeholder: '0.10' },
      { key: 'minPrice', label: 'Min. Purchase', type: 'money', required: true, placeholder: '100000' },
      { key: 'maxUses', label: 'Max Uses', type: 'number', required: true, placeholder: '50' },
      { key: 'startDate', label: 'Start', type: 'date', required: true },
      { key: 'endDate', label: 'End', type: 'date', required: true },
      { key: 'categoryIds', label: 'Eligible Categories', ref: 'productCategories', type: 'multi', placeholder: 'Select categories…' },
      { key: 'isForBusinessOnly', label: 'Business Only', type: 'checkbox' },
    ],
    extra: [
      { label: 'Used', get: (r, db) => `${db.voucherUsages.filter((u) => u.voucherId === r.id).length} / ${r.maxUses}` },
      { label: 'Status', get: (r) => (today() < r.startDate ? 'Scheduled' : today() > r.endDate ? 'Expired' : 'Active') },
    ],
    validate: (row, db, table) =>
      validPeriod(row) ||
      unique('code', 'Voucher code already exists.')(row, db, table) ||
      (row.discountDecimal <= 0 && 'Discount must be more than 0%.'),
    normalize: (row) => ({ ...row, code: row.code.trim().toUpperCase() }),
  },
  voucherUsages: {
    label: 'Voucher Usage', readOnly: true, noDelete: true, noView: true,
    fields: [
      { key: 'voucherId', label: 'Voucher', ref: 'vouchers' },
      { key: 'customerAccountId', label: 'Customer', ref: 'customers' },
    ],
  },
  reviews: {
    label: 'Reviews', readOnly: true, noView: true,
    fields: [
      { key: 'productSkuId', label: 'SKU', ref: 'productSkus' },
      { key: 'customerAccountId', label: 'Customer', ref: 'customers' },
      { key: 'reviewerName', label: 'Reviewer' },
      { key: 'stars', label: 'Stars', type: 'stars' },
      { key: 'title', label: 'Title' },
      { key: 'review', label: 'Review', type: 'textarea' },
      { key: 'imagePath', label: 'Image Path', hideInList: true },
      { key: 'postedAt', label: 'Posted', type: 'date' },
      { key: 'updatedAt', label: 'Updated', type: 'date', hideInList: true },
    ],
  },
  testimonies: {
    label: 'Testimonials', inlineEdit: true,
    fields: [
      { key: 'companyName', label: 'Company', required: true, placeholder: 'e.g. PT Maju Jaya Teknik' },
      { key: 'companyCity', label: 'City', required: true, placeholder: 'e.g. Jakarta' },
      { key: 'companyType', label: 'Company Type', placeholder: 'e.g. Manufacturing' },
      { key: 'representativeFullName', label: 'Representative', required: true, placeholder: 'e.g. Budi Santoso' },
      { key: 'representativePosition', label: 'Position', placeholder: 'e.g. Procurement Manager' },
      { key: 'description', label: 'Testimony', type: 'textarea', required: true, hideInList: true },
      { key: 'companyImagePath', label: 'Company Image Path', hideInList: true },
      { key: 'adminAccountId', label: 'Managed By', ref: 'admins', auto: true },
      { key: 'postedAt', label: 'Posted', type: 'date', auto: true },
      { key: 'updatedAt', label: 'Updated', type: 'date', auto: true, hideInList: true },
    ],
    // the signed-in admin owns whatever they create
    defaults: (admin) => ({ adminAccountId: admin.id, postedAt: today() }),
    normalize: (row) => ({ ...row, updatedAt: today() }),
  },
  orderStatuses: { label: 'Order Statuses', inlineEdit: true, fields: [name], validate: unique('name', 'Status already exists.') },
  vatRecords: {
    label: 'VAT Rates', inlineEdit: true,
    fields: [
      { key: 'rateDecimal', label: 'Rate', type: 'percent', required: true },
      { key: 'startDate', label: 'Start', type: 'date', required: true },
      { key: 'endDate', label: 'End', type: 'date' },
    ],
    validate: validPeriod,
  },
  companyTypes: { label: 'Company Types', inlineEdit: true, fields: [name] },
  companyClassifications: {
    label: 'Company Classifications', inlineEdit: true,
    fields: [name, { key: 'parentId', label: 'Parent', ref: 'companyClassifications' }],
  },
  employeeSizes: { label: 'Employee Sizes', inlineEdit: true, fields: [name] },
  admins: {
    label: 'Admin Accounts', inlineEdit: true,
    fields: [
      { key: 'fullname', label: 'Full Name', required: true, placeholder: 'e.g. John Doe' },
      { key: 'email', label: 'Email', type: 'email', required: true, placeholder: 'example@gmail.com' },
      { key: 'password', label: 'Password', type: 'password', required: true, placeholder: 'Write the password' },
    ],
    validate: unique('email', 'Email is already used by another admin.'),
    hideDelete: (row) => row.email.toLowerCase() === 'monotaro@admin.id',
    canDelete: (row, admin) => row.id === admin.id && 'You cannot delete your own account.',
  },
  // Orders has its own page; listed here so delete checks see its references.
  orders: {
    label: 'Orders',
    fields: [
      { key: 'customerAccountId', ref: 'customers' },
      { key: 'orderStatusId', ref: 'orderStatuses' },
      { key: 'vatId', ref: 'vatRecords' },
    ],
  },
}

export const DELIVERY_FIELDS = [
  { key: 'deliveryMethod', label: 'Method', options: ['Courier', 'Pick Up', 'Own Fleet'] },
  { key: 'courierCompanyName', label: 'Courier' },
  { key: 'soNumber', label: 'SO Number' },
  { key: 'doNumber', label: 'DO Number' },
  { key: 'poNumber', label: 'PO Number' },
  { key: 'awbNumber', label: 'AWB Number' },
  { key: 'shipmentTrackingUrl', label: 'Tracking URL' },
  { key: 'deliveryDate', label: 'Delivery Date', type: 'date' },
  { key: 'note', label: 'Note', type: 'textarea' },
]

// Returns why a row can't be deleted, or false.
export function inUse(db, table, id) {
  for (const [other, cfg] of Object.entries(TABLES)) {
    for (const f of cfg.fields) {
      if (f.ref !== table) continue
      const used = db[other].some((r) => r.id !== id && (f.type === 'multi' ? r[f.key]?.includes(id) : r[f.key] === id))
      if (used) return `Still used in ${cfg.label}. Remove or change those first.`
    }
  }
  if (table === 'productSkus' && db.orders.some((o) => o.items.some((i) => i.productSkuId === id)))
    return 'This SKU appears in orders and cannot be deleted.'
  return false
}

export function orderTotals(order, db) {
  const subtotal = order.items.reduce((n, i) => n + i.quantity * i.price, 0)
  const discount = Math.round(subtotal * (order.discountDecimal || 0))
  const rate = db.vatRecords.find((v) => v.id === order.vatId)?.rateDecimal ?? 0
  const vat = Math.round((subtotal - discount) * rate)
  const totalWeightKg = order.items.reduce(
    (n, i) => n + i.quantity * (db.productSkus.find((s) => s.id === i.productSkuId)?.weightKg ?? 0), 0)
  return { subtotal, discount, vat, rate, totalWeightKg, total: subtotal - discount + order.deliveryFee + vat }
}

export const shippedCount = (order) => {
  const ordered = order.items.reduce((n, i) => n + i.quantity, 0)
  const shipped = order.items.reduce((n, i) => n + (i.shippedQty ?? 0), 0)
  return { ordered, shipped }
}

// shortcut: rules key off status names; statuses are fixed data (no admin menu), so keep these names in sync with the seed
export function changeOrderStatus(db, orderId, statusId) {
  const order = db.orders.find((o) => o.id === orderId)
  const statusName = (id) => db.orderStatuses.find((s) => s.id === id)?.name
  const { ordered, shipped } = shippedCount(order)
  if (statusName(statusId) === 'Shipped' && !order.delivery.awbNumber)
    throw new Error('Fill in the AWB number before marking this order as Shipped.')
  if (statusName(statusId) === 'Shipped' && !shipped)
    throw new Error('Enter the shipped quantity of at least one item before marking this order as Shipped.')
  if (statusName(statusId) === 'Completed' && shipped < ordered)
    throw new Error(`Only ${shipped} of ${ordered} items have been shipped. Ship the rest before completing.`)

  // cancelling puts the items back in stock; reopening takes them out again
  let skus = db.productSkus
  const wasCancelled = statusName(order.orderStatusId) === 'Cancelled'
  const nowCancelled = statusName(statusId) === 'Cancelled'
  if (wasCancelled !== nowCancelled) {
    const sign = nowCancelled ? 1 : -1
    skus = skus.map((s) => {
      const qty = order.items.filter((i) => i.productSkuId === s.id).reduce((n, i) => n + i.quantity, 0)
      return qty ? { ...s, remainingStock: s.remainingStock + sign * qty } : s
    })
    const short = skus.find((s) => s.remainingStock < 0)
    if (short) throw new Error(`Not enough stock of ${short.name} to reopen this order.`)
  }

  return {
    ...db,
    productSkus: skus,
    orders: db.orders.map((o) => (o.id === orderId ? { ...o, orderStatusId: statusId } : o)),
  }
}

export const nextId = (rows) => Math.max(0, ...rows.map((r) => r.id)) + 1

const delivery = (d = {}) => ({
  deliveryMethod: 'Courier', courierCompanyName: '', soNumber: '', doNumber: '', poNumber: '', awbNumber: '',
  shipmentTrackingUrl: '', deliveryDate: '', note: '', printCount: 0, ...d,
})

export const seed = {
  admins: [
    { id: 1, fullname: 'Admin Monotaro', email: 'monotaro@admin.id', password: 'Admin123' },
    { id: 2, fullname: 'Sarah Wijaya', email: 'sarah@admin.id', password: 'Sarah123' },
  ],
  companyTypes: [
    { id: 1, name: 'PT' }, { id: 2, name: 'CV' }, { id: 3, name: 'Koperasi' }, { id: 4, name: 'Firma' },
  ],
  companyClassifications: [
    { id: 1, name: 'Manufacturing', parentId: null },
    { id: 2, name: 'Food & Beverage', parentId: 1 },
    { id: 3, name: 'Automotive', parentId: 1 },
    { id: 4, name: 'Retail', parentId: null },
    { id: 5, name: 'Construction', parentId: null },
  ],
  employeeSizes: [
    { id: 1, name: '1–10' }, { id: 2, name: '11–50' }, { id: 3, name: '51–200' }, { id: 4, name: '200+' },
  ],
  orderStatuses: [
    { id: 1, name: 'Pending Payment' }, { id: 2, name: 'Paid' }, { id: 3, name: 'Processing' },
    { id: 4, name: 'Shipped' }, { id: 5, name: 'Completed' }, { id: 6, name: 'Cancelled' },
  ],
  vatRecords: [
    { id: 1, rateDecimal: 0.11, startDate: '2022-04-01', endDate: '2024-12-31' },
    { id: 2, rateDecimal: 0.12, startDate: '2025-01-01', endDate: '' },
  ],
  brands: [
    { id: 1, name: '3M', isAuthorizedPartner: true },
    { id: 2, name: 'Bosch', isAuthorizedPartner: true },
    { id: 3, name: 'Makita', isAuthorizedPartner: false },
    { id: 4, name: 'Krisbow', isAuthorizedPartner: true },
    { id: 5, name: 'Kenko', isAuthorizedPartner: false },
  ],
  productCategories: [
    { id: 1, name: 'Tools', parentId: null },
    { id: 2, name: 'Power Tools', parentId: 1 },
    { id: 3, name: 'Hand Tools', parentId: 1 },
    { id: 4, name: 'Safety', parentId: null },
    { id: 5, name: 'Office Supplies', parentId: null },
  ],
  popularityCategories: [
    { id: 1, name: 'Best Seller' }, { id: 2, name: 'New Arrival' }, { id: 3, name: 'Recommended' },
  ],
  specificationAttributes: [
    { id: 1, productCategoryId: 2, name: 'Voltage', jsonDataType: 'number' },
    { id: 2, productCategoryId: 3, name: 'Material', jsonDataType: 'string' },
    { id: 3, productCategoryId: 4, name: 'Certified', jsonDataType: 'boolean' },
  ],
  skuAttributes: [
    { id: 1, name: 'Color', jsonDataType: 'string' }, { id: 2, name: 'Size', jsonDataType: 'string' },
  ],
  specificationValues: [
    { id: 1, productId: 1, specificationAttributeId: 1, value: '12' },
    { id: 2, productId: 2, specificationAttributeId: 1, value: '230' },
    { id: 3, productId: 3, specificationAttributeId: 2, value: 'Chrome vanadium' },
    { id: 4, productId: 4, specificationAttributeId: 3, value: 'true' },
    { id: 5, productId: 5, specificationAttributeId: 3, value: 'true' },
  ],
  skuAttributeValues: [
    { id: 1, productSkuId: 1, skuAttributeId: 1, value: 'Teal' },
    { id: 2, productSkuId: 5, skuAttributeId: 1, value: 'Clear' },
    { id: 3, productSkuId: 7, skuAttributeId: 1, value: 'Black' },
  ],
  products: [
    { id: 1, name: 'Makita Cordless Drill', brandId: 3, productCategoryId: 2, popularityCategoryId: 1, condition: 'New', description: 'Compact cordless driver drill for workshop use.' },
    { id: 2, name: 'Bosch Angle Grinder', brandId: 2, productCategoryId: 2, popularityCategoryId: 3, condition: 'New', description: '750W angle grinder, 100 mm disc.' },
    { id: 3, name: 'Krisbow Combination Wrench Set', brandId: 4, productCategoryId: 3, popularityCategoryId: 1, condition: 'New', description: 'Chrome vanadium wrench set.' },
    { id: 4, name: '3M Safety Glasses', brandId: 1, productCategoryId: 4, popularityCategoryId: 2, condition: 'New', description: 'Clear anti-scratch safety glasses.' },
    { id: 5, name: '3M N95 Respirator Mask', brandId: 1, productCategoryId: 4, popularityCategoryId: 1, condition: 'New', description: 'NIOSH N95 particulate respirator.' },
    { id: 6, name: 'Kenko Stapler HD-10', brandId: 5, productCategoryId: 5, popularityCategoryId: 2, condition: 'New', description: 'Small stapler for No. 10 staples.' },
  ],
  productSkus: [
    { id: 1, productId: 1, skuNumber: 'MKT-DF333-12V', name: 'Makita DF333D 12V', price: 1450000, unit: 'Unit', unitAmount: 1, weightKg: 1.3, remainingStock: 24, imagePath: '/products/mkt-df333.jpg' },
    { id: 2, productId: 1, skuNumber: 'MKT-DF457-18V', name: 'Makita DF457D 18V', price: 2150000, unit: 'Unit', unitAmount: 1, weightKg: 1.6, remainingStock: 8, imagePath: '/products/mkt-df457.jpg' },
    { id: 3, productId: 2, skuNumber: 'BSH-GWS750-100', name: 'Bosch GWS 750-100', price: 685000, unit: 'Unit', unitAmount: 1, weightKg: 1.9, remainingStock: 35, imagePath: '/products/bsh-gws750.jpg' },
    { id: 4, productId: 3, skuNumber: 'KRB-WR-8PCS', name: 'Krisbow Wrench Set 8 pcs', price: 325000, unit: 'Set', unitAmount: 8, weightKg: 2.1, remainingStock: 5, imagePath: '/products/krb-wr8.jpg' },
    { id: 5, productId: 4, skuNumber: '3M-SG-V34', name: '3M Virtua V34 Clear', price: 45000, unit: 'Pcs', unitAmount: 1, weightKg: 0.05, remainingStock: 120, imagePath: '/products/3m-v34.jpg' },
    { id: 6, productId: 5, skuNumber: '3M-N95-8210', name: '3M 8210 N95 (Box of 20)', price: 410000, unit: 'Box', unitAmount: 20, weightKg: 0.4, remainingStock: 3, imagePath: '/products/3m-8210.jpg' },
    { id: 7, productId: 6, skuNumber: 'KNK-HD10', name: 'Kenko HD-10 Stapler', price: 18500, unit: 'Pcs', unitAmount: 1, weightKg: 0.12, remainingStock: 200, imagePath: '/products/knk-hd10.jpg' },
  ],
  customers: [
    { id: 1, fullname: 'Budi Santoso', email: 'budi@majujaya.co.id', phoneNumber: '081234567801', accountType: 'Business', companyName: 'PT Maju Jaya Teknik', departmentName: 'Procurement', companyTypeId: 1, companyClassificationId: 3, employeeSizeCategoryId: 2 },
    { id: 2, fullname: 'Siti Rahma', email: 'siti.rahma@gmail.com', phoneNumber: '081234567802', accountType: 'Personal', companyName: '', departmentName: '', companyTypeId: null, companyClassificationId: null, employeeSizeCategoryId: null },
    { id: 3, fullname: 'Andi Wijaya', email: 'andi@sinarabadi.id', phoneNumber: '081234567803', accountType: 'Business', companyName: 'CV Sinar Abadi', departmentName: 'Purchasing', companyTypeId: 2, companyClassificationId: 4, employeeSizeCategoryId: 1 },
    { id: 4, fullname: 'Dewi Lestari', email: 'dewi@nusantarafood.co.id', phoneNumber: '081234567804', accountType: 'Business', companyName: 'PT Nusantara Food', departmentName: 'Purchasing', companyTypeId: 1, companyClassificationId: 2, employeeSizeCategoryId: 3 },
    { id: 5, fullname: 'Rizky Pratama', email: 'rizky.p@yahoo.com', phoneNumber: '081234567805', accountType: 'Personal', companyName: '', departmentName: '', companyTypeId: null, companyClassificationId: null, employeeSizeCategoryId: null },
  ],
  deliveryAddresses: [
    { id: 1, customerAccountId: 1, receiverName: 'Budi Santoso', receiverPhoneNumber: '081234567801', regionAddress: 'Kab. Bekasi, Kec. Cikarang Utara, 17530', detailedAddress: 'Kawasan Industri Jababeka Blok A No. 12' },
    { id: 2, customerAccountId: 2, receiverName: 'Siti Rahma', receiverPhoneNumber: '081234567802', regionAddress: 'Kota Bandung, Kec. Coblong, 40132', detailedAddress: 'Jl. Dago No. 45' },
    { id: 3, customerAccountId: 3, receiverName: 'Andi Wijaya', receiverPhoneNumber: '081234567803', regionAddress: 'Kota Surabaya, Kec. Rungkut, 60293', detailedAddress: 'Jl. Rungkut Industri III No. 8' },
    { id: 4, customerAccountId: 4, receiverName: 'Gudang Nusantara Food', receiverPhoneNumber: '081234567899', regionAddress: 'Kab. Tangerang, Kec. Cikupa, 15710', detailedAddress: 'Jl. Raya Serang Km 12' },
    { id: 5, customerAccountId: 5, receiverName: 'Rizky Pratama', receiverPhoneNumber: '081234567805', regionAddress: 'Kota Yogyakarta, Kec. Gondokusuman, 55223', detailedAddress: 'Jl. Solo No. 101' },
  ],
  orders: [
    { id: 1, customerAccountId: 1, orderStatusId: 5, vatId: 2, deliveryAddressId: 1, discountDecimal: 0, deliveryFee: 50000, orderDate: '2026-10-02', paymentMethod: 'Bank Transfer', remarks: '',
      items: [{ productSkuId: 1, quantity: 2, price: 1450000, shippedQty: 2 }, { productSkuId: 5, quantity: 10, price: 45000, shippedQty: 10 }],
      delivery: delivery({ courierCompanyName: 'JNE', soNumber: 'SO-2610-001', doNumber: 'DO-2610-001', poNumber: 'PO-MJT-0921', awbNumber: 'JNE0012345678', shipmentTrackingUrl: 'https://www.jne.co.id/tracking', deliveryDate: '2026-10-05', note: 'Received by the security post at gate A.' }) },
    { id: 2, customerAccountId: 4, orderStatusId: 4, vatId: 2, deliveryAddressId: 4, discountDecimal: 0.05, deliveryFee: 75000, orderDate: '2026-10-20', paymentMethod: 'Virtual Account', remarks: 'Deliver to warehouse gate 2.',
      items: [{ productSkuId: 6, quantity: 5, price: 410000, shippedQty: 5 }, { productSkuId: 5, quantity: 40, price: 45000, shippedQty: 25 }],
      delivery: delivery({ courierCompanyName: 'SiCepat', soNumber: 'SO-2610-014', doNumber: 'DO-2610-009', poNumber: 'PO-NF-3310', awbNumber: 'SCP000987654', shipmentTrackingUrl: 'https://www.sicepat.com/checkAwb', deliveryDate: '2026-10-22', note: 'Deliver to warehouse gate 2. Remaining 15 pcs of safety glasses follow next week.' }) },
    { id: 3, customerAccountId: 3, orderStatusId: 3, vatId: 2, deliveryAddressId: 3, discountDecimal: 0, deliveryFee: 60000, orderDate: '2026-10-27', paymentMethod: 'Bank Transfer', remarks: '',
      items: [{ productSkuId: 4, quantity: 3, price: 325000, shippedQty: 0 }, { productSkuId: 3, quantity: 2, price: 685000, shippedQty: 0 }],
      delivery: delivery({ courierCompanyName: 'J&T Express', soNumber: 'SO-2610-021', doNumber: 'DO-2610-015', poNumber: 'PO-SA-1027', deliveryDate: '2026-11-02', note: 'Call the receiver 30 minutes before arrival.' }) },
    { id: 4, customerAccountId: 2, orderStatusId: 2, vatId: 2, deliveryAddressId: 2, discountDecimal: 0, deliveryFee: 15000, orderDate: '2026-10-29', paymentMethod: 'E-Wallet', remarks: '',
      items: [{ productSkuId: 7, quantity: 4, price: 18500, shippedQty: 0 }], delivery: delivery({ courierCompanyName: 'Ninja Xpress', soNumber: 'SO-2610-024', doNumber: 'DO-2610-018', deliveryDate: '2026-11-03', note: 'Leave the parcel at the front desk.' }) },
    { id: 5, customerAccountId: 5, orderStatusId: 1, vatId: 2, deliveryAddressId: 5, discountDecimal: 0, deliveryFee: 25000, orderDate: '2026-10-30', paymentMethod: 'Virtual Account', remarks: '',
      items: [{ productSkuId: 2, quantity: 1, price: 2150000, shippedQty: 0 }], delivery: delivery({ courierCompanyName: 'AnterAja', soNumber: 'SO-2610-027', note: 'Waiting for payment before packing.' }) },
    { id: 6, customerAccountId: 1, orderStatusId: 6, vatId: 2, deliveryAddressId: 1, discountDecimal: 0, deliveryFee: 30000, orderDate: '2026-10-15', paymentMethod: 'Bank Transfer', remarks: 'Cancelled by customer.',
      items: [{ productSkuId: 3, quantity: 1, price: 685000, shippedQty: 0 }], delivery: delivery({ courierCompanyName: 'JNE', soNumber: 'SO-2610-011', note: 'Cancelled by customer before dispatch.' }) },
  ],
  vouchers: [
    { id: 1, code: 'NEWBIZ10', discountDecimal: 0.1, minPrice: 1000000, maxUses: 100, isForBusinessOnly: true, startDate: '2026-01-01', endDate: '2026-12-31', categoryIds: [1, 2, 3] },
    { id: 2, code: 'SAFETY5', discountDecimal: 0.05, minPrice: 200000, maxUses: 50, isForBusinessOnly: false, startDate: '2026-10-01', endDate: '2026-11-30', categoryIds: [4] },
    { id: 3, code: 'OFFICE15', discountDecimal: 0.15, minPrice: 100000, maxUses: 20, isForBusinessOnly: false, startDate: '2026-06-01', endDate: '2026-08-31', categoryIds: [5] },
  ],
  voucherUsages: [
    { id: 1, voucherId: 1, customerAccountId: 1 }, { id: 2, voucherId: 1, customerAccountId: 4 },
    { id: 3, voucherId: 2, customerAccountId: 4 }, { id: 4, voucherId: 3, customerAccountId: 2 },
  ],
  reviews: [
    { id: 1, productSkuId: 1, customerAccountId: 1, reviewerName: 'Budi S.', stars: 5, title: 'Solid and reliable', review: 'Battery lasts all day in our workshop.', imagePath: '/reviews/df333-workshop.jpg', postedAt: '2026-10-08', updatedAt: '2026-10-08' },
    { id: 2, productSkuId: 6, customerAccountId: 4, reviewerName: 'Dewi L.', stars: 4, title: 'Good quality', review: 'Comfortable fit, delivery was a bit slow.', imagePath: '', postedAt: '2026-10-25', updatedAt: '2026-10-26' },
    { id: 3, productSkuId: 7, customerAccountId: 2, reviewerName: 'Siti R.', stars: 2, title: 'Jams often', review: 'Stapler jams with thicker paper.', imagePath: '', postedAt: '2026-10-30', updatedAt: '2026-10-30' },
  ],
  testimonies: [
    { id: 1, companyName: 'PT Maju Jaya Teknik', companyCity: 'Bekasi', companyType: 'Manufacturing', representativeFullName: 'Budi Santoso', representativePosition: 'Procurement Manager', description: 'Ordering tools for our plant is fast and the prices are clear.', companyImagePath: '/testimonies/majujaya.png', adminAccountId: 1, postedAt: '2026-09-12', updatedAt: '2026-09-12' },
    { id: 2, companyName: 'PT Nusantara Food', companyCity: 'Tangerang', companyType: 'Food & Beverage', representativeFullName: 'Dewi Lestari', representativePosition: 'Purchasing Lead', description: 'Blanket orders save our team hours every month.', companyImagePath: '/testimonies/nusantara.png', adminAccountId: 2, postedAt: '2026-10-01', updatedAt: '2026-10-15' },
  ],
  rfqs: [
    { id: 1, customerAccountId: 1, brandName: 'Makita', productName: 'Makita HR2470 Rotary Hammer', quantity: 15, budget: 30000000, documentFilePath: 'rfq-majujaya-hr2470.pdf', productUrl: 'https://www.monotaro.id/' },
    { id: 2, customerAccountId: 3, brandName: 'Krisbow', productName: 'Krisbow Tool Cabinet 7 Drawer', quantity: 4, budget: 18000000, documentFilePath: '', productUrl: '' },
  ],
  blanketOrders: [
    { id: 1, customerAccountId: 4, customerName: 'Dewi Lestari', email: 'dewi@nusantarafood.co.id', phoneNumber: '081234567804', companyName: 'PT Nusantara Food', notes: 'Monthly supply of N95 masks and safety glasses for 3 plants.' },
    { id: 2, customerAccountId: 1, customerName: 'Budi Santoso', email: 'budi@majujaya.co.id', phoneNumber: '081234567801', companyName: 'PT Maju Jaya Teknik', notes: 'Quarterly drill bits and grinding discs.' },
  ],
}
