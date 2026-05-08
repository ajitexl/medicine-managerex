import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllMedicines } from '../api/medicines'
import MedicineTable from '../components/MedicineTable'

export default function MedicineList() {
  const [medicines, setMedicines] = useState([])
  const navigate = useNavigate()

  const load = async () => {
    const data = await getAllMedicines()
    setMedicines(data)
  }

  useEffect(() => { load() }, [])

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ margin: 0 }}>All Medicines</h2>
        <button onClick={() => navigate('/add')} style={{
          background: '#0d6efd', color: '#fff', border: 'none',
          padding: '8px 18px', borderRadius: 8, cursor: 'pointer', fontWeight: 600
        }}>+ Add Medicine</button>
      </div>
      <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #dee2e6', overflow: 'hidden' }}>
        <MedicineTable medicines={medicines} onRefresh={load} />
      </div>
    </div>
  )
}
