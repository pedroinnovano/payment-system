import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

export const getToken = async () => {
  const response = await api.post('/token')
  return response.data.token
}

export const createPayment = async (data: any, token: string) => {
  const response = await api.post('/payments', data, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export const getPaymentStatus = async (id: string, token: string) => {
  const response = await api.get(`/payments/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}
