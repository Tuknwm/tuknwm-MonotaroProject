import { useRef, useState } from 'react'

function pad(n) { return String(n).padStart(2, '0') }

function parse(str) {
  if (!str) return { d: '', m: '', y: '' }
  const [y, m, d] = str.split('-')
  return { d: d ?? '', m: m ?? '', y: y ?? '' }
}

function toIso(d, m, y) {
  if (!d || !m || !y || y.length < 4) return ''
  return `${y}-${pad(m)}-${pad(d)}`
}

export default function DatePicker({ value, required, onChange }) {
  const { d: initD, m: initM, y: initY } = parse(value)
  const [d, setD] = useState(initD)
  const [m, setM] = useState(initM)
  const [y, setY] = useState(initY)
  const mRef = useRef(null)
  const yRef = useRef(null)

  const emit = (nd, nm, ny) => {
    const iso = toIso(nd, nm, ny)
    onChange(iso)
  }

  const handleD = (v) => {
    const n = v.replace(/\D/g, '').slice(0, 2)
    setD(n)
    emit(n, m, y)
    if (n.length === 2) mRef.current?.focus()
  }

  const handleM = (v) => {
    const n = v.replace(/\D/g, '').slice(0, 2)
    setM(n)
    emit(d, n, y)
    if (n.length === 2) yRef.current?.focus()
  }

  const handleY = (v) => {
    const n = v.replace(/\D/g, '').slice(0, 4)
    setY(n)
    emit(d, m, n)
  }

  const wheel = (setter, min, max, cur, next) => (e) => {
    e.preventDefault()
    const val = Number(cur) || min
    const nv = e.deltaY < 0 ? Math.min(val + 1, max) : Math.max(val - 1, min)
    setter(pad(nv))
    next(pad(nv))
  }

  return (
    <span className="dateseg" aria-label="Date input">
      <input
        className="dateseg-part"
        inputMode="numeric"
        placeholder="DD"
        value={d}
        required={required}
        maxLength={2}
        onChange={(e) => handleD(e.target.value)}
        onWheel={wheel(setD, 1, 31, d, (v) => { setD(v); emit(v, m, y) })}
        aria-label="Day"
      />
      <span className="dateseg-sep">/</span>
      <input
        ref={mRef}
        className="dateseg-part"
        inputMode="numeric"
        placeholder="MM"
        value={m}
        maxLength={2}
        onChange={(e) => handleM(e.target.value)}
        onWheel={wheel(setM, 1, 12, m, (v) => { setM(v); emit(d, v, y) })}
        aria-label="Month"
      />
      <span className="dateseg-sep">/</span>
      <input
        ref={yRef}
        className="dateseg-part dateseg-year"
        inputMode="numeric"
        placeholder="YYYY"
        value={y}
        maxLength={4}
        onChange={(e) => handleY(e.target.value)}
        aria-label="Year"
      />
    </span>
  )
}
