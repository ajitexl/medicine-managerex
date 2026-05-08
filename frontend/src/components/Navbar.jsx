import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()
  const link = (to, label) => (
    <Link to={to} style={{
      color: pathname === to ? '#fff' : 'rgba(255,255,255,0.75)',
      textDecoration: 'none', fontWeight: pathname === to ? 600 : 400,
      padding: '6px 14px', borderRadius: 6,
      background: pathname === to ? 'rgba(255,255,255,0.15)' : 'transparent'
    }}>{label}</Link>
  )
  return (
    <nav style={{
      background: '#0d6efd', padding: '12px 32px',
      display: 'flex', alignItems: 'center', gap: 24,
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
    }}>
      <span style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginRight: 16 }}>
        💊 Medicine Manager
      </span>
      {link('/', 'Dashboard')}
      {link('/medicines', 'All Medicines')}
      {link('/add', '+ Add Medicine')}
    </nav>
  )
}
