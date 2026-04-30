import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import DataDisplay from './pages/DataDisplay'
import FormPage from './pages/FormPage'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/data" element={<DataDisplay />} />
            <Route path="/form" element={<FormPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
