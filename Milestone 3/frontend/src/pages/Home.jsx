import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import client from '../api/client'

function Home() {
  const [summary, setSummary] = useState({ posts: 0, comments: 0, recentPosts: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadSummary() {
      try {
        const [postsResponse, commentsResponse] = await Promise.all([
          client.get('/posts'),
          client.get('/comments'),
        ])

        const posts = Array.isArray(postsResponse.data)
          ? postsResponse.data
          : Object.values(postsResponse.data || {})
        const comments = Array.isArray(commentsResponse.data)
          ? commentsResponse.data
          : Object.values(commentsResponse.data || {})

        setSummary({
          posts: posts.length,
          comments: comments.length,
          recentPosts: posts.slice(0, 3),
        })
      } catch (err) {
        setError('Backend summary could not be loaded yet. Start Spring Boot or update the API routes.')
      } finally {
        setLoading(false)
      }
    }

    loadSummary()
  }, [])

  return (
    <section className="page">
      <div className="hero-card">
        <div>
          <p className="eyebrow">Creative Expression Content Sharing</p>
          <h1>Welcome to the Xpression dashboard</h1>
          <p className="page-intro">
            Explore social posts, submit new content, and connect your frontend to the team backend.
          </p>
        </div>

        <div className="grid two-col">
          <Link to="/data" className="card-link">
            <h3>View content data</h3>
            <p>Open the data display page to fetch and render existing posts from the backend.</p>
          </Link>

          <Link to="/form" className="card-link">
            <h3>Create a new post</h3>
            <p>Use the controlled form page to submit a post with validation and API integration.</p>
          </Link>
        </div>
      </div>

      <div className="card">
        <h2>Backend summary</h2>
        {loading ? <p>Loading summary...</p> : null}
        {error ? <p className="message error">{error}</p> : null}

        {!loading && !error ? (
          <>
            <div className="stats-row">
              <div className="stat-box">
                <span className="stat-label">Posts</span>
                <strong>{summary.posts}</strong>
              </div>
              <div className="stat-box">
                <span className="stat-label">Comments</span>
                <strong>{summary.comments}</strong>
              </div>
            </div>

            <h3>Recent posts</h3>
            <div className="stack-list">
              {summary.recentPosts.length > 0 ? (
                summary.recentPosts.map((post) => (
                  <div key={post.id} className="list-item">
                    <strong>{post.mediaType || 'Post'}</strong>
                    <p>{post.caption || 'No caption provided.'}</p>
                  </div>
                ))
              ) : (
                <p>No recent posts found yet.</p>
              )}
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}

export default Home
