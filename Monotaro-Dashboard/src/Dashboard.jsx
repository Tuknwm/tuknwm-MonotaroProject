import { useEffect, useState } from 'react'
import { useIsPhone } from './BottomSheet.jsx'
import {
  BadgeCheck, Boxes, Building2, ChevronDown, CircleDot, ClipboardList, FileText, FolderTree, LayoutDashboard, Menu,
  MessageSquareQuote, Network, Package, PanelLeftClose, PanelLeftOpen, Percent, Receipt, Settings2, ShieldCheck,
  ShoppingCart, SlidersHorizontal, Star, Tags, TicketPercent, TrendingUp, Users, UsersRound,
} from 'lucide-react'
import { TABLES } from './data.js'
import CrudPage from './CrudPage.jsx'
import ConfigPage from './ConfigPage.jsx'
import VouchersPage from './VouchersPage.jsx'
import OrdersPage from './OrdersPage.jsx'
import Overview from './Overview.jsx'
import CatalogPage from './CatalogPage.jsx'

const NAV = [
  [null, ['overview']],
  ['Sales', ['orders', 'rfqs', 'blanketOrders', 'customers']],
  ['Catalog', ['products', 'productSkus', 'catalog']],
  ['Marketing', ['vouchers', 'reviews', 'testimonies']],
  ['Settings', ['vatRecords', 'config', 'admins']],
]

const ICONS = {
  overview: LayoutDashboard,
  orders: ShoppingCart, rfqs: FileText, blanketOrders: ClipboardList, customers: Users,
  products: Package, productSkus: Boxes, brands: BadgeCheck, productCategories: FolderTree,
  popularityCategories: TrendingUp, specificationAttributes: SlidersHorizontal, skuAttributes: Tags,
  catalog: Package,
  vouchers: TicketPercent, voucherUsages: Receipt, reviews: Star, testimonies: MessageSquareQuote,
  vatRecords: Percent, companyClassifications: Network, config: Settings2,
  employeeSizes: UsersRound, admins: ShieldCheck,
}

const title = (page) => page === 'overview' ? 'Overview' : page === 'config' ? 'Configuration' : page === 'catalog' ? 'Catalog' : TABLES[page].label
const groupOf = (page) => NAV.find(([, pages]) => pages.includes(page))[0]

export default function Dashboard({ admin, db, setDb, onSignOut, onReset }) {
  const [page, setPage] = useState('overview')
  // only used on phones, where the sidebar becomes a drawer
  const [menuOpen, setMenuOpen] = useState(false)
  const isPhone = useIsPhone()

  // phones: swipe right opens the menu drawer, swipe left closes it
  useEffect(() => {
    if (!isPhone) return
    let start = null
    const onStart = (e) => {
      const t = e.touches[0]
      // leave swipes to a table that can still scroll back left, and to open sheets and dialogs
      const table = e.target.closest?.('.table-wrap')
      const busy = (table && table.scrollLeft > 0) || e.target.closest?.('.sheet-overlay, .overlay')
      start = busy ? null : { x: t.clientX, y: t.clientY }
    }
    const onEnd = (e) => {
      if (!start) return
      const t = e.changedTouches[0]
      const dx = t.clientX - start.x, dy = t.clientY - start.y
      start = null
      if (Math.abs(dx) < 70 || Math.abs(dy) > Math.abs(dx) * 0.6) return
      setMenuOpen(dx > 0)
    }
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend', onEnd, { passive: true })
    return () => { window.removeEventListener('touchstart', onStart); window.removeEventListener('touchend', onEnd) }
  }, [isPhone])
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [confirming, setConfirming] = useState(null)
  const CONFIRMS = {
    reset: { title: 'Reset demo?', text: 'All demo data goes back to its original state. Your changes will be lost.', action: 'Reset', run: onReset },
    signout: { title: 'Sign out?', text: 'You will need to sign in again to use the dashboard.', action: 'Sign out', run: onSignOut },
  }
  const confirm = confirming && CONFIRMS[confirming]
  const [openGroups, setOpenGroups] = useState(() => new Set(NAV.map(([group]) => group).filter(Boolean)))

  const toggleGroup = (group) =>
    setOpenGroups((open) => {
      const next = new Set(open)
      next.has(group) ? next.delete(group) : next.add(group)
      return next
    })

  const go = (p) => {
    setPage(p)
    setMenuOpen(false)
    // links from Overview can jump into a closed group; open it so the active item stays visible
    setOpenGroups((open) => new Set(open).add(groupOf(p)))
  }

  return (
    <div className="dashboard" onKeyDown={(e) => e.key === 'Escape' && setMenuOpen(false)}>
      <header className="topbar">
        <img src="/Logo.png" alt="Monotaro.id" />
        <button className="btn btn-ghost" aria-expanded={menuOpen} aria-controls="sidebar" onClick={() => setMenuOpen(true)}>
          <Menu size={18} aria-hidden="true" /> Menu
        </button>
      </header>
      {menuOpen && <div className="backdrop" onClick={() => setMenuOpen(false)} />}

      <aside id="sidebar" className={menuOpen ? 'sidebar open' : 'sidebar'} data-collapsed={!sidebarOpen || undefined}>
        <img src="/Logo.png" alt="Monotaro.id" />

        <nav>
          {NAV.map(([group, pages]) => (
            <div key={group ?? 'main'} className="nav-group">
              {group && (
                <button
                  className="nav-label"
                  aria-expanded={openGroups.has(group)}
                  onClick={() => toggleGroup(group)}
                >
                  {group}
                  <ChevronDown className="chevron" size={16} aria-hidden="true" />
                </button>
              )}
              {/* stays mounted so it can animate; inert keeps hidden items out of tab order */}
              <div className="nav-items" data-open={!group || openGroups.has(group)} inert={group && !openGroups.has(group)}>
                <div>
                  {pages.map((p) => {
                    const Icon = ICONS[p]
                    return (
                      <button key={p} className={p === page ? 'active' : undefined} aria-current={p === page ? 'page' : undefined} onClick={() => go(p)}>
                        <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                        {title(p)}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span><strong>{admin.fullname}</strong><br />{admin.email}</span>
          <div className="footer-actions">
            <button onClick={() => { setMenuOpen(false); setConfirming('reset') }}>Reset demo</button>
            <button onClick={() => { setMenuOpen(false); setConfirming('signout') }}>Sign out</button>
          </div>
        </div>
      </aside>

      {confirm && (
        <div className="overlay" onClick={() => setConfirming(null)}>
          <div className="modal modal-sm" role="dialog" aria-modal="true" aria-label={confirm.title}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.key === 'Escape' && setConfirming(null)}
            tabIndex={-1}
          >
            <h2>{confirm.title}</h2>
            <p>{confirm.text}</p>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setConfirming(null)} autoFocus>Cancel</button>
              <button className="btn btn-danger" onClick={() => { setConfirming(null); confirm.run() }}>{confirm.action}</button>
            </div>
          </div>
        </div>
      )}

      <button
        className={sidebarOpen ? 'sidebar-collapse-btn' : 'sidebar-expand-btn'}
        onClick={() => setSidebarOpen((v) => !v)}
        aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        {sidebarOpen
          ? <PanelLeftClose size={18} strokeWidth={1.75} />
          : <PanelLeftOpen size={18} strokeWidth={1.75} />}
      </button>

      <main className="content">
        {page !== 'vouchers' && (
          <h1>{title(page)}</h1>
        )}
        {/* keyed so the enter animation replays on every page change */}
        <div className={`page page-${page}`} key={page}>
          {page === 'overview' ? <Overview db={db} go={go} />
            : page === 'catalog' ? <CatalogPage db={db} setDb={setDb} admin={admin} />
            : page === 'orders' ? <OrdersPage db={db} setDb={setDb} />
            : page === 'vouchers' ? <VouchersPage db={db} setDb={setDb} admin={admin} />
            : page === 'config' ? <ConfigPage db={db} setDb={setDb} admin={admin} />
            : <CrudPage table={page} db={db} setDb={setDb} admin={admin} />}
        </div>
      </main>
    </div>
  )
}
