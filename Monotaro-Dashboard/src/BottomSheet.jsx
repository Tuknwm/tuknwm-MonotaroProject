import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { Plus } from 'lucide-react'

const phone = window.matchMedia('(max-width: 768px)')
// resize too: some environments (device emulation) change the width without firing the query's change event
const subscribe = (cb) => {
  phone.addEventListener('change', cb)
  window.addEventListener('resize', cb)
  return () => { phone.removeEventListener('change', cb); window.removeEventListener('resize', cb) }
}
export const useIsPhone = () => useSyncExternalStore(subscribe, () => phone.matches)

// rendered into <body>: the page wrapper animates with a transform, which would drag fixed elements along
const SWIPE_CLOSE = 100

// from: 'bottom' (default) slides up from the bottom edge; 'top' slides down from the top edge.
// closeRef: gets the animated close function, so buttons inside (Cancel, Save) can close it with the same animation.
const CLOSE_MS = 220

// action: optional button shown on the title row (desktop Save)
export default function BottomSheet({ title, onClose, children, from = 'bottom', closeRef, action }) {
  const dir = from === 'top' ? -1 : 1
  const ref = useRef(null)
  const startY = useRef(null)
  const drag = useRef(0)
  const dragged = useRef(false)
  const closingRef = useRef(false)
  const [dragY, setDragY] = useState(0)
  const [closing, setClosing] = useState(false)
  useEffect(() => { ref.current?.focus() }, [])

  // slide out the way it came, then let the parent unmount it
  const close = () => {
    if (closingRef.current) return
    closingRef.current = true
    setClosing(true)
    setTimeout(onClose, CLOSE_MS)
  }
  useEffect(() => { if (closeRef) closeRef.current = close })

  const setDrag = (v) => { drag.current = v; setDragY(v) }
  const moveTo = (y) => {
    const v = Math.max(0, dir * (y - startY.current))
    if (v > 5) dragged.current = true
    setDrag(v)
  }
  const end = () => {
    if (startY.current == null) return
    startY.current = null
    if (drag.current > SWIPE_CLOSE) close()
    else setDrag(0)
    setTimeout(() => { dragged.current = false })
  }

  // swipe it back toward its edge to close: only from the top of the sheet's scroll, so scrolling a long form still works
  const onTouchStart = (e) => { startY.current = ref.current.scrollTop > 0 ? null : e.touches[0].clientY }
  const onTouchMove = (e) => { if (startY.current != null) moveTo(e.touches[0].clientY) }
  // the mouse drags from anywhere that isn't a control, so fields and buttons still click normally
  const onMouseDown = (e) => {
    if (e.button !== 0 || e.target.closest('input, textarea, button, a, label, .select-trigger')) return
    startY.current = e.clientY
    const move = (ev) => moveTo(ev.clientY)
    const up = () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); end() }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
  }

  return createPortal(
    <div className={`sheet-overlay${from === 'top' ? ' from-top' : ''}${closing ? ' closing' : ''}`}
      onClick={() => { if (!dragged.current) close() }}>
      <div className={`sheet${from === 'top' ? ' sheet-top' : ''}${closing ? ' closing' : ''}`} role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} ref={ref}
        style={dragY ? { transform: `translateY(${dir * dragY}px)`, transition: 'none' } : undefined}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.key === 'Escape' && close()}
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={end} onTouchCancel={end}
        onMouseDown={onMouseDown}
      >
        <div className="sheet-handle" aria-hidden="true" />
        {action ? <div className="sheet-head"><h2>{title}</h2>{action}</div> : <h2>{title}</h2>}
        {children}
      </div>
    </div>,
    document.body,
  )
}

export function Fab({ label, onClick }) {
  return createPortal(
    <button className="fab" onClick={onClick} aria-label={label}><Plus size={26} strokeWidth={2.25} aria-hidden="true" /></button>,
    document.body,
  )
}

// one + for a page with several tables: pick the table first, then its add sheet opens
export function AddPicker({ sections, onPick, open, setOpen }) {
  return (
    <>
      <Fab label="Add new" onClick={() => setOpen(true)} />
      {open && (
        <BottomSheet title="Add new" onClose={() => setOpen(false)}>
          <div className="sheet-choices">
            {sections.map(([table, label, Icon]) => (
              <button key={table} onClick={() => { setOpen(false); onPick(table) }}>
                <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
        </BottomSheet>
      )}
    </>
  )
}
