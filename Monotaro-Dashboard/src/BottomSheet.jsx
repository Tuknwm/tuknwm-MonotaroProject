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

export default function BottomSheet({ title, onClose, children }) {
  const ref = useRef(null)
  const startY = useRef(null)
  const [dragY, setDragY] = useState(0)
  useEffect(() => { ref.current?.focus() }, [])

  // swipe down to close: only from the top of the sheet's scroll, so scrolling a long form still works
  const onTouchStart = (e) => { startY.current = ref.current.scrollTop > 0 ? null : e.touches[0].clientY }
  const onTouchMove = (e) => { if (startY.current != null) setDragY(Math.max(0, e.touches[0].clientY - startY.current)) }
  const onTouchEnd = () => {
    if (startY.current == null) return
    startY.current = null
    if (dragY > SWIPE_CLOSE) onClose()
    else setDragY(0)
  }

  return createPortal(
    <div className="sheet-overlay" onClick={onClose}>
      <div className="sheet" role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} ref={ref}
        style={dragY ? { transform: `translateY(${dragY}px)`, transition: 'none' } : undefined}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onTouchCancel={onTouchEnd}
      >
        <div className="sheet-handle" aria-hidden="true" />
        <h2>{title}</h2>
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
