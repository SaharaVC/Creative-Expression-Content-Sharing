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
  const [soundCloudTracks, setSoundCloudTracks] = useState({})
  const [gifSearch, setGifSearch] = useState({})
  const [gifResults, setGifResults] = useState({})
  const [commentGifs, setCommentGifs] = useState({})

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
            fetchSoundCloudTrack(post.id, post.content)
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

  async function fetchSoundCloudTrack(postId, url) {
    try {
      const response = await client.get(`/soundcloud/oembed?url=${encodeURIComponent(url)}`)
      setSoundCloudTracks(prev => ({
        ...prev,
        [postId]: {
          embedHtml: response.data?.html,
          title: response.data?.title,
          authorName: response.data?.author_name,
          thumbnailUrl: response.data?.thumbnail_url
        }
      }))
    } catch (err) {}
  }

  async function fetchComments(postId) {
    try {
      const response = await client.get(`/comments/post/${postId}`)
      const commentList = response.data
      setComments(prev => ({ ...prev, [postId]: commentList }))
      commentList.forEach(comment => fetchGifsForComment(comment.id))
    } catch (err) {}
  }

  async function fetchGifsForComment(commentId) {
    try {
      const response = await client.get(`/gifs/comment/${commentId}`)
      setCommentGifs(prev => ({ ...prev, [commentId]: response.data }))
    } catch (err) {}
  }

  async function handleCommentSubmit(postId) {
    const content = commentInputs[postId]
    if (!content?.trim()) return
    try {
      const response = await client.post(`/comments/post/${postId}`, { content })
      const newComment = response.data
      setCommentInputs(prev => ({ ...prev, [postId]: '' }))

      if (gifResults[postId]?.selectedGif) {
        const gif = gifResults[postId].selectedGif
        await client.post('/gifs', {
          giphyId: gif.giphyId,
          url: gif.url,
          previewUrl: gif.previewUrl,
          comment: { id: newComment.id }
        })
        setGifResults(prev => ({ ...prev, [postId]: { ...prev[postId], selectedGif: null } }))
      }

      fetchComments(postId)
    } catch (err) {
      console.error('Failed to post comment', err)
    }
  }

  async function handleGifSearch(postId) {
    const query = gifSearch[postId]
    if (!query?.trim()) return
    try {
      const response = await client.get(`/gifs/search?query=${encodeURIComponent(query)}`)
      setGifResults(prev => ({ ...prev, [postId]: { results: response.data, selectedGif: null } }))
    } catch (err) {}
  }

  function handleGifSelect(postId, gif) {
    setGifResults(prev => ({ ...prev, [postId]: { ...prev[postId], selectedGif: gif } }))
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
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  {post.mediaType}
                </span>
                      {post.user && (
                          <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>
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
                          {soundCloudTracks[post.id] ? (
                              <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                  {soundCloudTracks[post.id].thumbnailUrl && (
                                      <img
                                          src={soundCloudTracks[post.id].thumbnailUrl}
                                          alt={soundCloudTracks[post.id].title}
                                          style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }}
                                      />
                                  )}
                                  <div>
                                    <p style={{ fontWeight: '600', margin: 0 }}>{soundCloudTracks[post.id].title}</p>
                                    <p style={{ margin: 0, fontSize: '0.85rem' }}>by {soundCloudTracks[post.id].authorName}</p>
                                  </div>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: soundCloudTracks[post.id].embedHtml }} />
                              </div>
                          ) : (
                              <p style={{ wordBreak: 'break-all' }}>{post.content}</p>
                          )}
                        </div>
                    ) : (
                        <p>{post.content}</p>
                    )}

                    {post.date && (
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                          {new Date(post.date).toLocaleDateString()}
                        </p>
                    )}

                    {/* Comments Section */}
                    <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                      <h4 style={{ marginBottom: '0.75rem' }}>Comments</h4>

                      {comments[post.id]?.length > 0 ? (
                          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1rem' }}>
                            {comments[post.id].map(comment => (
                                <li key={comment.id} style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--border)' }}>
                                  {comment.user && (
                                      <span style={{ fontWeight: '600', marginRight: '0.5rem' }}>
                            👤 {comment.user.name}:
                          </span>
                                  )}
                                  {comment.content}
                                  {commentGifs[comment.id]?.length > 0 && (
                                      <div style={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {commentGifs[comment.id].map(gif => (
                                            <img
                                                key={gif.id}
                                                src={gif.previewUrl}
                                                alt="gif"
                                                style={{ height: '80px', borderRadius: '6px' }}
                                            />
                                        ))}
                                      </div>
                                  )}
                                </li>
                            ))}
                          </ul>
                      ) : (
                          <p style={{ marginBottom: '1rem' }}>No comments yet.</p>
                      )}

                      {/* Comment Input */}
                      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={commentInputs[post.id] || ''}
                            onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                            style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text-primary)' }}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleCommentSubmit(post.id) }}
                        />
                        <button onClick={() => handleCommentSubmit(post.id)} className="primary-button" style={{ padding: '0.5rem 1rem' }}>
                          Post
                        </button>
                      </div>

                      {/* GIF Search */}
                      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <input
                            type="text"
                            placeholder="Search GIFs to attach to your comment..."
                            value={gifSearch[post.id] || ''}
                            onChange={(e) => setGifSearch(prev => ({ ...prev, [post.id]: e.target.value }))}
                            style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text-primary)' }}
                        />
                        <button onClick={() => handleGifSearch(post.id)} className="secondary-button" style={{ padding: '0.5rem 1rem' }}>
                          🔍 GIF
                        </button>
                      </div>

                      {/* Selected GIF Preview */}
                      {gifResults[post.id]?.selectedGif && (
                          <div style={{ marginBottom: '0.5rem' }}>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                              GIF selected — post your comment to attach it:
                            </p>
                            <img
                                src={gifResults[post.id].selectedGif.previewUrl}
                                alt="selected gif"
                                style={{ height: '80px', borderRadius: '6px' }}
                            />
                          </div>
                      )}

                      {/* GIF Results */}
                      {gifResults[post.id]?.results?.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                            {gifResults[post.id].results.map(gif => (
                                <img
                                    key={gif.giphyId}
                                    src={gif.previewUrl}
                                    alt="gif result"
                                    style={{
                                      height: '80px',
                                      borderRadius: '6px',
                                      cursor: 'pointer',
                                      border: gifResults[post.id]?.selectedGif?.giphyId === gif.giphyId
                                          ? '2px solid var(--accent-purple)'
                                          : '2px solid transparent'
                                    }}
                                    onClick={() => handleGifSelect(post.id, gif)}
                                    title="Click to select this GIF"
                                />
                            ))}
                          </div>
                      )}
                    </div>
                  </div>
              ))}
            </div>
        )}
      </section>
  )
}

export default DataDisplay