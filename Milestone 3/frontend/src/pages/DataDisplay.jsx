import { useEffect, useState } from 'react'
import client from '../api/client'
import GifSearch from '../components/GifSearch'

function DataDisplay() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedGifs, setSelectedGifs] = useState({})
  const [activeGifSearch, setActiveGifSearch] = useState(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await client.get('/posts')
        const normalizedPosts = Array.isArray(response.data)
            ? response.data
            : Object.values(response.data || {})
        setPosts(normalizedPosts)
      } catch (err) {
        setError('Unable to load posts from the backend.')
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const handleSelectGif = (postId, gif) => {
    setSelectedGifs((prev) => ({ ...prev, [postId]: gif }))
    setActiveGifSearch(null)
  }

  return (
      <section className="page">
        <div className="page-header">
          <p className="eyebrow">Protected page</p>
          <h1>Data Display</h1>
          <p className="page-intro">This page loads content with useEffect and renders API results.</p>
        </div>

        <div className="card">
          {loading ? <p>Loading posts...</p> : null}
          {error ? <p className="message error">{error}</p> : null}

          {!loading && !error ? (
              posts.length > 0 ? (
                  posts.map((post) => (
                      <div key={post.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                        <h3>{post.title || 'Untitled'}</h3>
                        <p>{post.content || 'No content'}</p>
                        <p><strong>Type:</strong> {post.mediaType || 'N/A'}</p>
                        <p><strong>Date:</strong> {post.date ? new Date(post.date).toLocaleString() : 'N/A'}</p>

                        <button onClick={() => setActiveGifSearch(activeGifSearch === post.id ? null : post.id)}>
                          {activeGifSearch === post.id ? 'Close GIF Search' : 'Attach a GIF'}
                        </button>

                        {activeGifSearch === post.id && (
                            <GifSearch onSelectGif={(gif) => handleSelectGif(post.id, gif)} />
                        )}

                        {selectedGifs[post.id] && (
                            <div>
                              <p>Selected GIF:</p>
                              <img
                                  src={selectedGifs[post.id].images.fixed_height.url}
                                  alt="selected gif"
                                  width="200"
                              />
                            </div>
                        )}
                      </div>
                  ))
              ) : (
                  <p>No posts yet. Add one from the form page.</p>
              )
          ) : null}
        </div>
      </section>
  )
}

export default DataDisplay