import { useEffect, useRef, useState } from 'react'
import { Boxes, ChevronRight, ListChecks, Package, Tag, X } from 'lucide-react'
import CrudPage from './CrudPage.jsx'
import { AddPicker, useIsPhone } from './BottomSheet.jsx'

// Products. A product's "Specs" or "SKUs" link opens its panel below the table:
// its specification values (they belong to the product) and its SKUs.
export default function ProductsPage({ db, setDb, admin }) {
  const [productId, setProductId] = useState(null)
  const isPhone = useIsPhone()
  const [picking, setPicking] = useState(false)
  const [addSignal, setAddSignal] = useState({})
  const panelRef = useRef(null)
  const product = db.products.find((p) => p.id === productId)

  useEffect(() => {
    if (productId) panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [productId])

  const link = (table, one, many) => (row) => {
    const n = db[table].filter((r) => r.productId === row.id).length
    const open = row.id === productId
    return (
      <button className="sku-link" aria-pressed={open} onClick={() => setProductId(open ? null : row.id)}>
        {n} {n === 1 ? one : many}
        <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />
      </button>
    )
  }
  const extraCell = { Specs: link('specificationValues', 'spec', 'specs'), SKUs: link('productSkus', 'SKU', 'SKUs') }

  // a product only offers the specifications of its own category or that category's parent
  const category = product && db.productCategories.find((c) => c.id === product.productCategoryId)
  const fitsProduct = (spec) => spec.productCategoryId === category?.id || spec.productCategoryId === category?.parentId
  const skuIds = new Set(db.productSkus.filter((s) => s.productId === productId).map((s) => s.id))

  const add = (table) => setAddSignal((s) => ({ ...s, [table]: (s[table] ?? 0) + 1 }))

  return (
    <>
      <CrudPage table="products" db={db} setDb={setDb} admin={admin} extraCell={extraCell}
        fab={!product} addSignal={addSignal.products} />

      {product && (
        <section className="sku-section" ref={panelRef} aria-labelledby="product-panel-title">
          <div className="sku-head">
            <h2 id="product-panel-title" className="config-section-title">{product.name}</h2>
            <button className="sku-close" onClick={() => setProductId(null)}>
              <X size={16} strokeWidth={2} aria-hidden="true" />
              Close
            </button>
          </div>

          {/* keyed so search, sort and editing reset when another product is opened */}
          <div className="product-panels">
          <section className="product-panel spec-panel panel-spec" aria-labelledby="spec-title">
            <h3 id="spec-title" className="panel-title title-with-icon">
              <ListChecks size={18} strokeWidth={1.75} aria-hidden="true" />
              Product Specification
            </h3>
            <CrudPage key={`spec-${product.id}`} table="specificationValues" db={db} setDb={setDb} admin={admin}
              scope={{ productId: product.id }} refFilter={{ specificationAttributeId: fitsProduct }}
              fab={false} addSignal={addSignal.specificationValues} />
          </section>

          <section className="product-panel panel-sku" aria-labelledby="sku-title">
            <h3 id="sku-title" className="panel-title title-with-icon">
              <Boxes size={18} strokeWidth={1.75} aria-hidden="true" />
              SKUs
            </h3>
            <CrudPage key={`sku-${product.id}`} table="productSkus" db={db} setDb={setDb} admin={admin}
              scope={{ productId: product.id }} fab={false} addSignal={addSignal.productSkus} />
          </section>

          <section className="product-panel spec-panel panel-attr" aria-labelledby="sku-attr-title">
            <h3 id="sku-attr-title" className="panel-title title-with-icon">
              <Tag size={18} strokeWidth={1.75} aria-hidden="true" />
              SKU Attributes
            </h3>
            {/* values hang off SKUs, so match through the SKU and only offer this product's SKUs */}
            <CrudPage key={`attr-${product.id}`} table="skuAttributeValues" db={db} setDb={setDb} admin={admin}
              where={(v) => skuIds.has(v.productSkuId)} refFilter={{ productSkuId: (s) => s.productId === product.id }}
              fab={false} addSignal={addSignal.skuAttributeValues} />
          </section>
          </div>
        </section>
      )}

      {isPhone && product && (
        <AddPicker open={picking} setOpen={setPicking} onPick={add}
          sections={[
            ['products', 'Product', Package],
            ['specificationValues', `Specification for ${product.name}`, ListChecks],
            ['productSkus', `SKU for ${product.name}`, Boxes],
            ['skuAttributeValues', `SKU attribute for ${product.name}`, Tag],
          ]} />
      )}
    </>
  )
}
