import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_API_URL}/api/login`


const login = async credentials => {
  console.log(baseUrl)
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }