import axios from 'axios'
// eslint-disable-next-line no-undef
const baseUrl = `${process.env.REACT_APP_API_URL}/api/blogs`


let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)

  return response.data
}

const editBlog = async (editedBlog) => {
  const response = await axios.put(`/api/blogs/${editedBlog.id}`, editedBlog)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`/api/blogs/${id}`, config)
  return response.data
}

export default { setToken, getAll, createBlog, editBlog, deleteBlog }