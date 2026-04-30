import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="brand">
        <NavLink to="/">Xpression</NavLink>
      </div>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/data">Posts</NavLink>
        <NavLink to="/form">Create New Post</NavLink>
      </div>

      <div className="nav-actions">
        {isAuthenticated ? (
          <>
            <span className="user-chip">{user?.name || user?.email || 'Signed in'}</span>
            <button className="secondary-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
