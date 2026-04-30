import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import client from '../api/client'
import { useAuth } from '../context/AuthContext'

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    try {
      setSubmitting(true)
      const response = await client.post('/auth/register', formData)
      const token = response.data?.token
      const user = response.data?.user || {
        name: formData.name,
        email: formData.email,
      }

      if (!token) {
        throw new Error('No token returned')
      }

      login({ token, user })
      navigate('/', { replace: true })
    } catch (err) {
      setError('Registration failed. Make sure your backend exposes POST /api/auth/register and returns a JWT token.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="auth-page">
      <form className="card form-card auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Authentication</p>
        <h1>Register</h1>

        <label>
          Name
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>
          Email
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            minLength="6"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="primary-button" disabled={submitting}>
          {submitting ? 'Creating account...' : 'Register'}
        </button>

        {error ? <p className="message error">{error}</p> : null}
        <p>
          Already have an account? <Link to="/login">Login here</Link>.
        </p>
      </form>
    </section>
  )
}

export default Register
