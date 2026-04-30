import { useState, useEffect } from 'react'
import client from '../api/client'

const MEDIA_TYPES = ['ALL', 'TEXT', 'IMAGE', 'MUSIC']

function DataDisplay() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('ALL')

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
        const url = filter === 'ALL' ? '/posts' : `/posts/media/${filter}`
        const response = await client.get(url)
        const data = Array.isArray(response.data) ? response.data : []
        setPosts(data)
      } catch (err) {
        setError('Unable to load posts from the backend.')
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [filter])

  return (
      <section className="page">
        <div className="page-header">
          <p className="eyebrow">Community Feed</p>
          <h1>Data Display</h1>
          <p>Browse all creative posts from the Xpression community.</p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          {MEDIA_TYPES.map(type => (
              <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={filter === type ? 'primary-button' : ''}
                  style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
              >
                {type}
              </button>
          ))}
        </div>

        {loading ? (
            <p>Loading posts...</p>
        ) : error ? (
            <p className="message error">{error}</p>
        ) : posts.length === 0 ? (
            <p>No posts found.</p>
        ) : (
            <div className="card-grid">
              {posts.map(post => (
                  <div key={post.id} className="card">
              <span style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase' }}>
                {post.mediaType}
              </span>
                    <h3 style={{ margin: '0.5rem 0' }}>{post.title}</h3>
                    <p>{post.content}</p>
                    {post.date && (
                        <p style={{ fontSize: '0.75rem', color: '#aaa', marginTop: '0.5rem' }}>
                          {new Date(post.date).toLocaleDateString()}
                        </p>
                    )}
                  </div>
              ))}
            </div>
        )}
      </section>
  )
}

export default DataDisplay