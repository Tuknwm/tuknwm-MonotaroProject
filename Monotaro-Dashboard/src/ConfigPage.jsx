import { useState } from 'react'
import { Building2, CircleDot, Network, UsersRound } from 'lucide-react'
import CrudPage from './CrudPage.jsx'
import { AddPicker, useIsPhone } from './BottomSheet.jsx'

const ROWS = [
  [['orderStatuses', 'Order Statuses', CircleDot], ['employeeSizes', 'Employee Sizes', UsersRound]],
  [['companyTypes', 'Company Types', Building2], ['companyClassifications', 'Company Classifications', Network]],
]

export default function ConfigPage({ db, setDb, admin }) {
  const isPhone = useIsPhone()
  const [picking, setPicking] = useState(false)
  const [addSignal, setAddSignal] = useState({})

  return (
    <div className="config-sections">
      {ROWS.map((row, index) => (
        <div className="config-row" key={index}>
          {row.map(([table, title, Icon]) => (
            <section key={table}>
              <h2 className="config-section-title title-with-icon">
                <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                {title}
              </h2>
              <CrudPage table={table} db={db} setDb={setDb} admin={admin} fab={false} addSignal={addSignal[table]} />
            </section>
          ))}
        </div>
      ))}
      {isPhone && (
        <AddPicker sections={ROWS.flat()} open={picking} setOpen={setPicking}
          onPick={(t) => setAddSignal((s) => ({ ...s, [t]: (s[t] ?? 0) + 1 }))} />
      )}
    </div>
  )
}
