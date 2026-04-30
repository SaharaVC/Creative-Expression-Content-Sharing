import { useEffect, useState } from 'react'
import client from '../api/client'

import GifSearch from '../components/GifSearch'
import CommentGifs from '../components/CommentGifs'

function DataDisplay() {
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [refreshMap, setRefreshMap] = useState({})

  useEffect(() => {
    async function fetchData() {
      try {
        const [postRes, commentRes] = await Promise.all([
          client.get('/posts'),
          client.get('/comments')
        ])

        const normalizedPosts = Array.isArray(postRes.data)
            ? postRes.data
            : Object.values(postRes.data || {})

        const normalizedComments = Array.isArray(commentRes.data)
            ? commentRes.data
            : Object.values(commentRes.data || {})

        setPosts(normalizedPosts)
        setComments(normalizedComments)

      } catch (err) {
        setError('Failed to load data from backend')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const triggerRefresh = (commentId) => {
    setRefreshMap((prev) => ({
      ...prev,
      [commentId]: !prev[commentId]
    }))
  }

  return (
      <section className="page">
        <div className="page-header">
          <h1>Data Display</h1>
        </div>

        <div className="card">
          {loading && <p>Loading...</p>}
          {error && <p className="message error">{error}</p>}

          {!loading && !error && (
              posts.length > 0 ? (
                  posts.map((post) => (
                      <div key={post.id} style={{ marginBottom: "30px", borderBottom: "1px solid #ccc" }}>

                        {/* POST */}
                        <h3>Post #{post.id}</h3>
                        <p><strong>Caption:</strong> {post.caption}</p>

                        {/* COMMENTS */}
                        <div style={{ marginLeft: "20px" }}>
                          <h4>Comments</h4>

                          {comments
                              .filter((c) => c.post?.id === post.id)
                              .map((comment) => (
                                  <div key={comment.id} style={{ border: "1px solid #aaa", padding: "10px", marginBottom: "10px" }}>

                                    <p>{comment.text}</p>

                                    <GifSearch
                                        commentId={comment.id}
                                        onGifSaved={() => triggerRefresh(comment.id)}
                                    />

                                    <CommentGifs
                                        key={refreshMap[comment.id]}
                                        commentId={comment.id}
                                    />

                                  </div>
                              ))}

                        </div>

                      </div>
                  ))
              ) : (
                  <p>No posts found.</p>
              )
          )}
        </div>
      </section>
  )
}

export default DataDisplay
