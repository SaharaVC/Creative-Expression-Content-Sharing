import { useState } from 'react'
import client from '../api/client'

const initialForm = {
  mediaType: 'text',
  caption: '',
}

function FormPage() {
  const [formData, setFormData] = useState(initialForm)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')
    setError('')

    if (!formData.caption.trim()) {
      setError('Caption is required before submitting.')
      return
    }

    try {
      setSubmitting(true)
      await client.post('/posts', formData)
      setMessage('Post submitted successfully.')
      setFormData(initialForm)
    } catch (err) {
      setError('Submission failed. Check that the backend POST /api/posts endpoint is available.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="page">
      <div className="page-header">
        <p className="eyebrow">Protected page</p>
        <h1>Form Page</h1>
        <p className="page-intro">Create and submit a post with controlled inputs and client-side validation.</p>
      </div>

      <form className="card form-card" onSubmit={handleSubmit}>
        <label>
          Media Type
          <select name="mediaType" value={formData.mediaType} onChange={handleChange}>
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="music">Music</option>
          </select>
        </label>

        <label>
          Caption
          <textarea
            name="caption"
            rows="5"
            placeholder="Write a caption for the post"
            value={formData.caption}
            onChange={handleChange}
          />
        </label>

        <button type="submit" className="primary-button" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Post'}
        </button>

        {message ? <p className="message success">{message}</p> : null}
        {error ? <p className="message error">{error}</p> : null}
      </form>
    </section>
  )
}

export default FormPage
