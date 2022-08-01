import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (value) => token = `bearer ${value}`

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createBlog = async newBlog => {
  const config = {
    headers: {Authorization: token}
  }
  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

const updateBlog = async blogToUpdate => {
  const patchUrl = `${baseUrl}/${blogToUpdate.id}`
  const updatedBlog = await axios.patch(patchUrl, blogToUpdate)
  return updatedBlog.data
}

const deleteBlog = async blogToDelete => {
  const config = {
    headers: {Authorization: token}
  }
  const deleteUrl = `${baseUrl}/${blogToDelete.id}`
  await axios.delete(deleteUrl, config)
}

const blogService = { setToken, getAll, createBlog, updateBlog, deleteBlog }

export default blogService