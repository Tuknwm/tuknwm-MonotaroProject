import { useState } from 'react'
import { BadgeCheck, FolderTree, SlidersHorizontal, Tags } from 'lucide-react'
import CrudPage from './CrudPage.jsx'
import { AddPicker, useIsPhone } from './BottomSheet.jsx'

const SECTIONS = [
  ['brands', 'Brands', BadgeCheck],
  ['productCategories', 'Categories', FolderTree],
  ['specificationAttributes', 'Specifications', SlidersHorizontal],
  ['skuAttributes', 'SKU Attributes', Tags],
]

export default function CatalogPage({ db, setDb, admin }) {
  const isPhone = useIsPhone()
  const [picking, setPicking] = useState(false)
  const [addSignal, setAddSignal] = useState({})

  return (
    <div className="config-sections">
      {[SECTIONS.slice(0, 2), SECTIONS.slice(2)].map((row, index) => (
        <div className="config-row" key={index}>
          {row.map(([table, heading, Icon]) => (
            <section key={table} className={`catalog-section catalog-${table}`}>
              <h2 className="config-section-title title-with-icon">
                <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                {heading}
              </h2>
              <CrudPage table={table} db={db} setDb={setDb} admin={admin} fab={false} addSignal={addSignal[table]} />
            </section>
          ))}
        </div>
      ))}
      {isPhone && (
        <AddPicker sections={SECTIONS} open={picking} setOpen={setPicking}
          onPick={(t) => setAddSignal((s) => ({ ...s, [t]: (s[t] ?? 0) + 1 }))} />
      )}
    </div>
  )
}
