import { useEffect, useState } from 'react'
import { getDashboard } from '../api/medicines'
import MedicineTable from '../components/MedicineTable'

const Section = ({ title, color, medicines, onRefresh }) => (
  <div style={{ marginBottom: 28 }}>
    <div style={{
      background: color, color: color === '#ffc107' ? '#000' : '#fff',
      padding: '10px 16px', borderRadius: '8px 8px 0 0', fontWeight: 600
    }}>
      {title} ({medicines.length})
    </div>
    <div style={{ border: `1px solid ${color}`, borderTop: 'none', borderRadius: '0 0 8px 8px', padding: 16 }}>
      <MedicineTable medicines={medicines} onRefresh={onRefresh} />
    </div>
  </div>
)

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const d = await getDashboard()
    setData(d)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  if (loading) return <p style={{ padding: 32, color: '#888' }}>Loading...</p>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ margin: 0 }}>Dashboard</h2>
        <span style={{ color: '#888', fontSize: 14 }}>{data.total} medicine{data.total !== 1 ? 's' : ''} total</span>
      </div>

      {data.expired.length > 0 &&
        <Section title="🚫 Expired" color="#dc3545" medicines={data.expired} onRefresh={load} />}
      {data.expiring_soon.length > 0 &&
        <Section title="⚠️ Expiring Soon (within 30 days)" color="#fd7e14" medicines={data.expiring_soon} onRefresh={load} />}
      {data.low_stock.length > 0 &&
        <Section title="📦 Low Stock (≤5 units)" color="#0dcaf0" medicines={data.low_stock} onRefresh={load} />}

      <Section title="✅ All Good" color="#198754" medicines={data.all_ok} onRefresh={load} />
    </div>
  )
}
