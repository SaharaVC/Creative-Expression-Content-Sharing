import { useEffect, useState } from 'react'
import client from '../api/client'

function DataDisplay() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await client.get('/posts')
        const normalizedPosts = Array.isArray(response.data)
          ? response.data
          : Object.values(response.data || {})
        setPosts(normalizedPosts)
      } catch (err) {
        setError('Unable to load posts from the backend. Confirm the Spring Boot API is running on the expected URL.')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <section className="page">
      <div className="page-header">
        <p className="eyebrow">Protected page</p>
        <h1>Data Display</h1>
        <p className="page-intro">This page loads content with useEffect and renders API results in a table.</p>
      </div>

      <div className="card">
        {loading ? <p>Loading posts...</p> : null}
        {error ? <p className="message error">{error}</p> : null}

        {!loading && !error ? (
          posts.length > 0 ? (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Media Type</th>
                    <th>Caption</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td>{post.id}</td>
                      <td>{post.mediaType || 'N/A'}</td>
                      <td>{post.caption || 'No caption'}</td>
                      <td>{post.date ? new Date(post.date).toLocaleString() : 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No posts returned yet. Add one from the form page.</p>
          )
        ) : null}
      </div>
    </section>
  )
}

export default DataDisplay
