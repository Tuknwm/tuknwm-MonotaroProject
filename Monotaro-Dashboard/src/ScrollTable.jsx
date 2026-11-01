import { useEffect, useRef, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { useIsPhone } from './BottomSheet.jsx'

// The table's scroll box, plus (on phones) a round arrow at the right edge while more of the table is hidden there.
export default function ScrollTable({ className = 'table-wrap', children }) {
  const ref = useRef(null)
  const isPhone = useIsPhone()
  const [more, setMore] = useState(false)

  useEffect(() => {
    const el = ref.current
    const check = () => setMore(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
    check()
    el.addEventListener('scroll', check, { passive: true })
    // the table grows and shrinks with its rows and the window, so re-check on any size change
    const ro = new ResizeObserver(check)
    ro.observe(el)
    if (el.firstElementChild) ro.observe(el.firstElementChild)
    return () => { el.removeEventListener('scroll', check); ro.disconnect() }
  }, [])

  return (
    <div className="table-scroll">
      <div className={className} ref={ref}>{children}</div>
      {isPhone && more && (
        <button
          type="button"
          className="scroll-hint"
          aria-label="Scroll table right"
          onClick={() => ref.current.scrollBy({ left: ref.current.clientWidth * 0.7, behavior: 'smooth' })}
        >
          <ChevronRight size={20} strokeWidth={2.25} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
