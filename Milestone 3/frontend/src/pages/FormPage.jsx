import { useState } from 'react'
import client from '../api/client'

function FormPage() {
  const [formData, setFormData] = useState({ title: '', content: '', mediaType: 'TEXT' })
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [soundCloudEmbed, setSoundCloudEmbed] = useState('')
  const [loadingEmbed, setLoadingEmbed] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData(current => ({ ...current, [name]: value }))
    if (name === 'content' && formData.mediaType === 'MUSIC') {
      setSoundCloudEmbed('')
    }
  }

  const handlePreviewSoundCloud = async () => {
    if (!formData.content) return
    try {
      setLoadingEmbed(true)
      const response = await client.get(`/soundcloud/oembed?url=${encodeURIComponent(formData.content)}`)
      setSoundCloudEmbed(response.data?.html || '')
    } catch (err) {
      setError('Could not load SoundCloud preview. Make sure the URL is valid.')
    } finally {
      setLoadingEmbed(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    try {
      setSubmitting(true)
      await client.post('/posts', formData)
      setSuccess('Post created successfully!')
      setFormData({ title: '', content: '', mediaType: 'TEXT' })
      setSoundCloudEmbed('')
    } catch (err) {
      setError('Failed to create post. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
      <section className="page">
        <div className="page-header">
          <p className="eyebrow">Create Content</p>
          <h1>New Post</h1>
          <p>Share your creative work with the Xpression community.</p>
        </div>

        <div className="card form-card" style={{ maxWidth: '600px' }}>
          <form onSubmit={handleSubmit}>
            <label>
              Title
              <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Give your post a title"
              />
            </label>

            <label>
              Media Type
              <select name="mediaType" value={formData.mediaType} onChange={handleChange}>
                <option value="TEXT">Text / Writing</option>
                <option value="IMAGE">Image / Art</option>
                <option value="MUSIC">Music (SoundCloud)</option>
              </select>
            </label>

            <label>
              Content
              <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder={
                    formData.mediaType === 'MUSIC'
                        ? 'Paste your SoundCloud URL here'
                        : formData.mediaType === 'IMAGE'
                            ? 'Paste your image URL here'
                            : 'Write your content here...'
                  }
              />
            </label>

            {formData.mediaType === 'MUSIC' && formData.content && (
                <button
                    type="button"
                    onClick={handlePreviewSoundCloud}
                    style={{ marginBottom: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
                    disabled={loadingEmbed}
                >
                  {loadingEmbed ? 'Loading preview...' : 'Preview SoundCloud Track'}
                </button>
            )}

            {soundCloudEmbed && (
                <div
                    style={{ marginBottom: '1rem' }}
                    dangerouslySetInnerHTML={{ __html: soundCloudEmbed }}
                />
            )}

            <button type="submit" className="primary-button" disabled={submitting}>
              {submitting ? 'Publishing...' : 'Publish Post'}
            </button>

            {success && <p className="message success">{success}</p>}
            {error && <p className="message error">{error}</p>}
          </form>
        </div>
      </section>
  )
}

export default FormPage
