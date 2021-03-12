import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const NewBlogForm = ({ setError, setMessage, setBlogs,
  setMessageTime, blogFormRef }) => {
  // Hooks
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    try {
      const addedBlog = await blogService.createBlog(newBlog)
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
      blogFormRef.current.toggleVisibility()
      console.log(addedBlog)
      setTitle('')
      setAuthor('')
      setUrl('')

      setError(false)
      setMessage(`a new blog ${addedBlog.title} added`)
      setMessageTime(true)

      setTimeout(() => {
        setMessageTime(false)
        setMessage('')
      }, 5000)
    }
    catch (exception) {
      console.log('title or url is missing')
      setError(true)
      setMessage('title or url is missing')
      setMessageTime(true)

      setTimeout(() => {
        setMessageTime(false)
        setMessage('')
        setError(false)
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleCreate}>
      <h2>Create new</h2>
      <div>
             title:
        <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
             author:
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
             url:
        <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )

}

NewBlogForm.propTypes = {
  setError: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setMessageTime: PropTypes.func.isRequired,
  blogFormRef: PropTypes.object.isRequired
}

export default NewBlogForm