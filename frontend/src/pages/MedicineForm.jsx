import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createMedicine, updateMedicine, getMedicine } from '../api/medicines'

const CATEGORIES = ['Painkiller', 'Antibiotic', 'Vitamin', 'Antacid', 'Allergy', 'Cold & Flu', 'Other']

const field = (label, children) => (
  <div style={{ marginBottom: 18 }}>
    <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>{label}</label>
    {children}
  </div>
)

const inputStyle = {
  width: '100%', padding: '8px 12px', borderRadius: 8,
  border: '1px solid #dee2e6', fontSize: 14, boxSizing: 'border-box'
}

export default function MedicineForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [form, setForm] = useState({
    name: '', category: '', quantity: 1, expiry_date: '', notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isEdit) {
      getMedicine(id).then(m => setForm({
        name: m.name, category: m.category || '',
        quantity: m.quantity, expiry_date: m.expiry_date, notes: m.notes || ''
      }))
    }
  }, [id])

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.expiry_date) {
      setError('Name and expiry date are required.')
      return
    }
    setLoading(true)
    try {
      const payload = { ...form, quantity: parseInt(form.quantity) }
      if (isEdit) await updateMedicine(id, payload)
      else await createMedicine(payload)
      navigate('/')
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: 540, margin: '0 auto' }}>
      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #dee2e6', padding: 32 }}>
        <h2 style={{ marginTop: 0 }}>{isEdit ? 'Edit' : 'Add'} Medicine</h2>

        {error && (
          <div style={{ background: '#fff3cd', border: '1px solid #ffc107', borderRadius: 8, padding: 12, marginBottom: 18, color: '#856404' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {field('Medicine Name *',
            <input style={inputStyle} value={form.name} onChange={set('name')} placeholder="e.g. Paracetamol 500mg" />
          )}
          {field('Category',
            <select style={inputStyle} value={form.category} onChange={set('category')}>
              <option value="">Select category...</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          )}
          {field('Quantity',
            <input style={inputStyle} type="number" min={0} value={form.quantity} onChange={set('quantity')} />
          )}
          {field('Expiry Date *',
            <input style={inputStyle} type="date" value={form.expiry_date} onChange={set('expiry_date')} />
          )}
          {field('Notes',
            <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }}
              value={form.notes} onChange={set('notes')} placeholder="Optional notes..." />
          )}

          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button type="submit" disabled={loading} style={{
              background: '#0d6efd', color: '#fff', border: 'none',
              padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontWeight: 600
            }}>
              {loading ? 'Saving...' : 'Save Medicine'}
            </button>
            <button type="button" onClick={() => navigate(-1)} style={{
              background: 'transparent', color: '#666', border: '1px solid #dee2e6',
              padding: '10px 24px', borderRadius: 8, cursor: 'pointer'
            }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
