import CrudPage from './CrudPage.jsx'

export default function VouchersPage({ db, setDb, admin }) {
  return (
    <div className="vouchers-page" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <section className="voucher-list">
        <h2 className="config-section-title">Vouchers</h2>
        <CrudPage table="vouchers" db={db} setDb={setDb} admin={admin} />
      </section>
      <section className="voucher-usage">
        <h2 className="config-section-title">Voucher Usage</h2>
        <CrudPage table="voucherUsages" db={db} setDb={setDb} admin={admin} />
      </section>
    </div>
  )
}
