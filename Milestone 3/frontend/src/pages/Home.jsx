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
          <p className="eyebrow">Creative Expression Content Sharing</p>
          <h1>Welcome to the Xpression dashboard{user?.name ? `, ${user.name}` : ''}</h1>
          <p>Explore social posts, submit new content, and connect with other creators.</p>
        </div>

        <div className="card-grid">
          <Link to="/data-display" className="card">
            <h2>View Posts </h2>
            <p>Open the data display page to fetch and render existing posts from the backend.</p>
          </Link>
          <Link to="/form" className="card">
            <h2>Create a new post</h2>
            <p>Use the form page to submit a new text, image, or music post.</p>
          </Link>
        </div>

        <div className="card" style={{ marginTop: '2rem' }}>
          <h2>Recent Posts</h2>
          {loading ? (
              <p>Loading...</p>
          ) : posts.length === 0 ? (
              <p>No posts yet. Be the first to create one!</p>
          ) : (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {posts.map(post => (
                    <li key={post.id} style={{ borderBottom: '1px solid #eee', padding: '1rem 0' }}>
                      <strong>{post.title}</strong>
                      <span style={{ marginLeft: '1rem', color: '#888', fontSize: '0.85rem' }}>
                  {post.mediaType}
                </span>
                      <p style={{ margin: '0.25rem 0 0' }}>{post.content?.substring(0, 100)}...</p>
                    </li>
                ))}
              </ul>
          )}
        </div>
      </section>
  )
}

export default Home
