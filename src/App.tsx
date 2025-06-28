import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{padding: '20px', background: '#f0f0f0'}}>
        <Link to="/" style={{marginRight: '10px'}}>Home</Link>
        <Link to="/admin" style={{marginRight: '10px'}}>Admin</Link>
        <Link to="/login">Login</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<div><h1>Home Page</h1></div>} />
        <Route path="/admin" element={<div><h1>Admin Page</h1></div>} />
        <Route path="/login" element={<div><h1>Login Page</h1></div>} />
      </Routes>
    </BrowserRouter>
  )
}