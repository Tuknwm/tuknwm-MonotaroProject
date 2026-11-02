import { useEffect, useState } from 'react'
import { AlertCircle, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import Dashboard from './Dashboard.jsx'
import { seed } from './data.js'

// bump the version when the seed shape changes, so old saved data is ignored
const STORE = 'monotaro-demo-v4'
const ADMIN_STORE = `${STORE}-admin`

// storage can be blocked (private mode, cleared site data); the demo then just runs in memory
const load = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    return fallback
  }
}
const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore, see load()
  }
}

export default function App() {
  const [db, setDb] = useState(() => load(STORE, seed))
  const [error, setError] = useState('')
  const [adminId, setAdminId] = useState(() => load(ADMIN_STORE, null))
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => save(STORE, db), [db])
  useEffect(() => save(ADMIN_STORE, adminId), [adminId])

  const resetDemo = () => {
    setDb(seed)
  }
  // look the admin up each render so edits in Admin Accounts show in the sidebar
  const admin = db.admins.find((a) => a.id === adminId)

  // shortcut: demo login against in-memory admins, passwords are in the client bundle; use a real backend before going live
  const handleSubmit = (e) => {
    e.preventDefault()
    const { email, password } = Object.fromEntries(new FormData(e.currentTarget))
    const match = db.admins.find((a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password)
    if (match) {
      setError('')
      setAdminId(match.id)
    } else {
      setError('Incorrect email or password.')
    }
  }

  if (admin) {
    return <Dashboard admin={admin} db={db} setDb={setDb} onSignOut={() => setAdminId(null)} onReset={resetDemo} />
  }

  return (
    <main className="login">
      <div className="login-wrap">
      <form className="form" onSubmit={handleSubmit}>
        <img src="/Logo.png" alt="Monotaro.id" />

        <h1>Welcome back</h1>
        <p>Sign in to the Monotaro Dashboard.</p>

        <label htmlFor="email">Email</label>
        <div className="login-field">
          <Mail size={18} strokeWidth={1.75} aria-hidden="true" />
          {/* shortcut: pre-filled with the seeded demo admin for quick demos; remove the defaultValues before going live */}
          <input id="email" name="email" type="email" autoComplete="email" placeholder="name@company.com" defaultValue="monotaro@admin.id" required />
        </div>

        <label htmlFor="password">Password</label>
        <div className="login-field">
          <Lock size={18} strokeWidth={1.75} aria-hidden="true" />
          <input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Your password" defaultValue="Admin123" required />
          <button type="button" className="login-reveal" onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword}>
            {showPassword ? <EyeOff size={18} strokeWidth={1.75} /> : <Eye size={18} strokeWidth={1.75} />}
          </button>
        </div>

        {error && (
          <div className="error" role="alert">
            <AlertCircle size={16} strokeWidth={2} aria-hidden="true" />
            {error}
          </div>
        )}

        <button type="submit" className="btn login-submit">Login</button>
      </form>
      <p className="login-foot">Monotaro.id · Admin access only</p>
      </div>
    </main>
  )
}
