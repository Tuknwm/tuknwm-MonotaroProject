import { useRef, useState } from 'react'

const CLOSE_MS = 180

// Small "are you sure?" dialog. Cancel, Esc and clicking outside play a closing animation first;
// the action button runs straight away.
export default function ConfirmDialog({ title, children, actionLabel, onAction, onCancel }) {
  const [closing, setClosing] = useState(false)
  const closingRef = useRef(false)
  const close = () => {
    if (closingRef.current) return
    closingRef.current = true
    setClosing(true)
    setTimeout(onCancel, CLOSE_MS)
  }

  return (
    <div className={`overlay${closing ? ' closing' : ''}`} onClick={close}>
      <div className={`modal modal-sm${closing ? ' closing' : ''}`} role="dialog" aria-modal="true" aria-label={title}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.key === 'Escape' && close()}
        tabIndex={-1}
      >
        <h2>{title}</h2>
        <p>{children}</p>
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={close} autoFocus>Cancel</button>
          <button className="btn btn-danger" onClick={onAction}>{actionLabel}</button>
        </div>
      </div>
    </div>
  )
}
