import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import client from '../api/client'
import { useAuth } from '../context/AuthContext'

function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await client.get('/posts')
        const data = Array.isArray(response.data) ? response.data : []
        setPosts(data.slice(0, 5))
      } catch (err) {
        console.error('Failed to load posts', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return (
      <section className="page">
        <div className="page-header">
          <p className="eyebrow">Your Creative Space</p>
          <h1>Welcome back{user?.name ? `, ${user.name}` : ''} ✦</h1>
          <p>Xpression is where writers, artists, and musicians share their work and get real feedback. Post your art, discover new creators, and grow together.</p>
        </div>

        <div className="card-grid">
          <Link to="/data" className="card" style={{ cursor: 'pointer' }}>
            <h2>🎨 Explore the Feed</h2>
            <p>Browse writing, art, and music from the Xpression community. Filter by media type and leave feedback.</p>
          </Link>
          <Link to="/form" className="card" style={{ cursor: 'pointer' }}>
            <h2>✍️ Share Your Work</h2>
            <p>Post a piece of writing, an image of your art, or link a SoundCloud track. Your portfolio starts here.</p>
          </Link>
        </div>

        <div className="card">
          <h2>🔥 Recent Posts</h2>
          {loading ? (
              <p>Loading...</p>
          ) : posts.length === 0 ? (
              <p>No posts yet — be the first to share something!</p>
          ) : (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {posts.map(post => (
                    <li key={post.id} style={{ borderBottom: '1px solid var(--border)', padding: '1rem 0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>{post.title}</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {post.mediaType}
                  </span>
                      </div>
                      {post.user && (
                          <p style={{ fontSize: '0.8rem', margin: '0.25rem 0 0', color: 'var(--text-secondary)' }}>
                            by {post.user.name}
                          </p>
                      )}
                    </li>
                ))}
              </ul>
          )}
        </div>
      </section>
  )
}

export default Home
