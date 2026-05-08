import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import MedicineList from './pages/MedicineList'
import MedicineForm from './pages/MedicineForm'

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
        <Navbar />
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/medicines" element={<MedicineList />} />
            <Route path="/add" element={<MedicineForm />} />
            <Route path="/edit/:id" element={<MedicineForm />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
