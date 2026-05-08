import axios from 'axios'

// const api = axios.create({ baseURL: 'http://localhost:8000' })

const api = axios.create({ baseURL: 'https://medicine-manager-api.onrender.com' })

export const getDashboard = () => api.get('/medicines/dashboard').then(r => r.data)
export const getAllMedicines = () => api.get('/medicines').then(r => r.data)
export const getMedicine = (id) => api.get(`/medicines/${id}`).then(r => r.data)
export const createMedicine = (data) => api.post('/medicines', data).then(r => r.data)
export const updateMedicine = (id, data) => api.put(`/medicines/${id}`, data).then(r => r.data)
export const deleteMedicine = (id) => api.delete(`/medicines/${id}`)
