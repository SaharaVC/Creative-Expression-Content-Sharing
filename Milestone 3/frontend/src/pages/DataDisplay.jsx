import { useState, useEffect } from 'react'
import client from '../api/client'

const MEDIA_TYPES = ['ALL', 'TEXT', 'IMAGE', 'MUSIC']

function DataDisplay() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('ALL')
  const [comments, setComments] = useState({})
  const [commentInputs, setCommentInputs] = useState({})
  const [soundCloudEmbeds, setSoundCloudEmbeds] = useState({})

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
        const url = filter === 'ALL' ? '/posts' : `/posts/media/${filter}`
        const response = await client.get(url)
        const data = Array.isArray(response.data) ? response.data : []
        setPosts(data)
        data.forEach(post => {
          fetchComments(post.id)
          if (post.mediaType === 'MUSIC' && post.content?.includes('soundcloud.com')) {
            fetchSoundCloudEmbed(post.id, post.content)
          }
        })
      } catch (err) {
        setError('Unable to load posts from the backend.')
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [filter])

  async function fetchSoundCloudEmbed(postId, url) {
    try {
      const response = await client.get(`/soundcloud/oembed?url=${encodeURIComponent(url)}`)
      setSoundCloudEmbeds(prev => ({ ...prev, [postId]: response.data?.html || '' }))
    } catch (err) {
      console.error('Failed to load SoundCloud embed', err)
    }
  }

  async function fetchComments(postId) {
    try {
      const response = await client.get(`/comments/post/${postId}`)
      setComments(prev => ({ ...prev, [postId]: response.data }))
    } catch (err) {
      console.error('Failed to load comments', err)
    }
  }

  async function handleCommentSubmit(postId) {
    const content = commentInputs[postId]
    if (!content?.trim()) return
    try {
      await client.post(`/comments/post/${postId}`, { content })
      setCommentInputs(prev => ({ ...prev, [postId]: '' }))
      fetchComments(postId)
    } catch (err) {
      console.error('Failed to post comment', err)
    }
  }

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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {posts.map(post => (
                  <div key={post.id} className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase' }}>
                  {post.mediaType}
                </span>
                      {post.user && (
                          <span style={{ fontSize: '0.85rem', color: '#555', fontWeight: '600' }}>
                    👤 {post.user.name}
                  </span>
                      )}
                    </div>

                    <h3 style={{ margin: '0.5rem 0' }}>{post.title}</h3>

                    {post.mediaType === 'IMAGE' && post.content?.startsWith('http') ? (
                        <img
                            src={post.content}
                            alt={post.title}
                            style={{ width: '100%', borderRadius: '8px', marginBottom: '0.5rem' }}
                            onError={(e) => { e.target.style.display = 'none' }}
                        />
                    ) : post.mediaType === 'MUSIC' ? (
                        <div>
                          {soundCloudEmbeds[post.id] ? (
                              <div dangerouslySetInnerHTML={{ __html: soundCloudEmbeds[post.id] }} />
                          ) : (
                              <p style={{ wordBreak: 'break-all', color: '#888' }}>{post.content}</p>
                          )}
                        </div>
                    ) : (
                        <p>{post.content}</p>
                    )}

                    {post.date && (
                        <p style={{ fontSize: '0.75rem', color: '#aaa', marginTop: '0.5rem' }}>
                          {new Date(post.date).toLocaleDateString()}
                        </p>
                    )}

                    <div style={{ marginTop: '1.5rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                      <h4 style={{ marginBottom: '0.75rem' }}>Comments</h4>
                      {comments[post.id]?.length > 0 ? (
                          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1rem' }}>
                            {comments[post.id].map(comment => (
                                <li key={comment.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid #f0f0f0' }}>
                                  {comment.user && (
                                      <span style={{ fontWeight: '600', marginRight: '0.5rem', color: '#333' }}>
                            👤 {comment.user.name}:
                          </span>
                                  )}
                                  {comment.content}
                                </li>
                            ))}
                          </ul>
                      ) : (
                          <p style={{ color: '#aaa', marginBottom: '1rem' }}>No comments yet.</p>
                      )}

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={commentInputs[post.id] || ''}
                            onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                            style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: '1px solid #ddd' }}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleCommentSubmit(post.id) }}
                        />
                        <button
                            onClick={() => handleCommentSubmit(post.id)}
                            className="primary-button"
                            style={{ padding: '0.5rem 1rem' }}
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
        )}
      </section>
  )
}

export default DataDisplay