import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import client from '../api/client'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    try {
      setSubmitting(true)
      const response = await client.post('/users/login', formData)
      const token = response.data?.token
      const user = response.data?.user || { email: formData.email }

      if (!token) {
        throw new Error('No token returned')
      }

      login({ token, user })
      navigate(location.state?.from?.pathname || '/', { replace: true })
    } catch (err) {
      setError('Login failed. Make sure your backend exposes POST /api/auth/login and returns a JWT token.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="auth-page">
      <form className="card form-card auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Authentication</p>
        <h1>Login</h1>

        <label>
          Email
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>

        <label>
          Password
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>

        <button type="submit" className="primary-button" disabled={submitting}>
          {submitting ? 'Signing in...' : 'Login'}
        </button>

        {error ? <p className="message error">{error}</p> : null}
        <p>
          Need an account? <Link to="/register">Register here</Link>.
        </p>
      </form>
    </section>
  )
}

export default Login
