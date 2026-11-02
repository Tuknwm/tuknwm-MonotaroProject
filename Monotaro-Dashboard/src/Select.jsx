import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Check, ChevronDown } from 'lucide-react'

const MAX_HEIGHT = 280

// Select-only combobox (WAI-ARIA pattern). The list renders in a portal so
// scrolling tables and modals don't clip it. options: [{ value, label }]
export default function Select({ value, options, onChange, required, label, className }) {
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const [active, setActive] = useState(0)
  const [pos, setPos] = useState(null)
  const buttonRef = useRef(null)
  const listRef = useRef(null)
  const listId = useId()
  const index = options.findIndex((o) => o.value === value)
  const selected = options[index]

  const CLOSE_MS = 140
  const close = () => {
    setClosing(true)
    setTimeout(() => { setOpen(false); setClosing(false) }, CLOSE_MS)
  }

  const show = () => {
    const r = buttonRef.current.getBoundingClientRect()
    const width = Math.max(r.width, 180)
    const below = window.innerHeight - r.bottom - 8
    const above = r.top - 8
    const up = below < Math.min(MAX_HEIGHT, options.length * 38 + 8) && above > below
    setPos({
      left: Math.max(8, Math.min(r.left, window.innerWidth - width - 8)),
      width,
      maxHeight: Math.min(MAX_HEIGHT, (up ? above : below) - 4),
      ...(up ? { bottom: window.innerHeight - r.top + 4 } : { top: r.bottom + 4 }),
    })
    setActive(Math.max(0, index))
    setOpen(true)
    setClosing(false)
  }

  const pick = (i) => {
    onChange(options[i].value)
    close()
    buttonRef.current.focus()
  }

  useEffect(() => {
    if (!open) return
    const inside = (e) => listRef.current?.contains(e.target) || buttonRef.current?.contains(e.target)
    const onPointer = (e) => !inside(e) && close()
    // the list is fixed-positioned, so close it rather than let it drift away from its button
    const onScroll = (e) => !listRef.current?.contains(e.target) && setOpen(false)  // instant on scroll
    const onResize = () => setOpen(false)  // instant on resize
    document.addEventListener('pointerdown', onPointer)
    window.addEventListener('scroll', onScroll, true)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      window.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  useEffect(() => {
    if (open) listRef.current?.children[active]?.scrollIntoView({ block: 'nearest' })
  }, [open, active])

  const onKeyDown = (e) => {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault()
        show()
      }
      return
    }
    const last = options.length - 1
    const moves = { ArrowDown: Math.min(active + 1, last), ArrowUp: Math.max(active - 1, 0), Home: 0, End: last }
    if (e.key in moves) {
      e.preventDefault()
      setActive(moves[e.key])
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      pick(active)
    } else if (e.key === 'Escape') {
      // keep the surrounding modal or drawer open
      e.preventDefault()
      e.stopPropagation()
      close()
    } else if (e.key === 'Tab') {
      close()
    }
  }

  return (
    <div className={className ? `select ${className}` : 'select'}>
      <button
        ref={buttonRef}
        type="button"
        role="combobox"
        className="select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        aria-label={label}
        onClick={() => (open ? close() : show())}
        onKeyDown={onKeyDown}
      >
        <span className={selected ? undefined : 'muted'}>{selected?.label ?? '—'}</span>
        <ChevronDown size={16} aria-hidden="true" />
      </button>

      {/* lets the browser's required-field check cover this control too */}
      {required && (
        <input
          className="select-validate"
          tabIndex={-1}
          aria-hidden="true"
          required
          value={value ?? ''}
          onChange={() => {}}
          onFocus={() => buttonRef.current.focus()}
        />
      )}

      {open && createPortal(
        <ul id={listId} ref={listRef} role="listbox" aria-label={label} className={`select-list${closing ? " closing" : ""}`} style={pos}>
          {options.map((o, i) => (
            <li
              key={String(o.value)}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === index}
              className={i === active ? 'active' : undefined}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => pick(i)}
            >
              <span>{o.label}</span>
              {i === index && <Check size={16} aria-hidden="true" />}
            </li>
          ))}
        </ul>,
        document.body,
      )}
    </div>
  )
}
