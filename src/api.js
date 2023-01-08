import axios from 'axios'

const alexandriaApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})

export default alexandriaApi;