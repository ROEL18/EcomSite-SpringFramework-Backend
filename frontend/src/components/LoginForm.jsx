import { useState } from 'react'

export default function LoginForm({ onLogin, loading }) {
  const [email, setEmail] = useState('roel@gmail.com')
  const [password, setPassword] = useState('123456')

  function handleSubmit(event) {
    event.preventDefault()
    onLogin(email, password)
  }

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <p className="muted">Use the backend demo credentials or your own database user.</p>

      <label>Email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="roel@gmail.com" />

      <label>Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="123456" />

      <button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
    </form>
  )
}
