import axios from 'axios'
// eslint-disable-next-line no-undef
const baseUrl = `${process.env.REACT_APP_API_URL}/api/users`

const register = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { register }