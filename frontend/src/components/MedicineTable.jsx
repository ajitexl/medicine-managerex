import { useNavigate } from 'react-router-dom'
import StatusBadge from './StatusBadge'
import { deleteMedicine } from '../api/medicines'

export default function MedicineTable({ medicines, onRefresh }) {
  const navigate = useNavigate()

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete "${name}"?`)) {
      await deleteMedicine(id)
      onRefresh()
    }
  }

  if (!medicines.length) return (
    <p style={{ color: '#888', padding: '12px 0' }}>No medicines here.</p>
  )

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
      <thead>
        <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
          {['Name','Category','Qty','Expiry Date','Status','Actions'].map(h => (
            <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600 }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {medicines.map(m => (
          <tr key={m.id} style={{ borderBottom: '1px solid #dee2e6' }}>
            <td style={{ padding: '10px 12px', fontWeight: 500 }}>{m.name}</td>
            <td style={{ padding: '10px 12px', color: '#666' }}>{m.category || '—'}</td>
            <td style={{ padding: '10px 12px' }}>{m.quantity}</td>
            <td style={{ padding: '10px 12px' }}>{m.expiry_date}</td>
            <td style={{ padding: '10px 12px' }}><StatusBadge status={m.status} /></td>
            <td style={{ padding: '10px 12px', display: 'flex', gap: 8 }}>
              <button onClick={() => navigate(`/edit/${m.id}`)} style={btnStyle('#6c757d')}>Edit</button>
              <button onClick={() => handleDelete(m.id, m.name)} style={btnStyle('#dc3545')}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const btnStyle = (color) => ({
  padding: '4px 12px', borderRadius: 6, border: `1px solid ${color}`,
  background: 'transparent', color, cursor: 'pointer', fontSize: 13
})
