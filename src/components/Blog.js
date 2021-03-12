import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, usersName }) => {
  const [showMore, setShowMore] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async() => {
    setLikes(likes + 1)
    blog.likes = blog.likes + 1
    await blogService.editBlog(blog)
    const allBlogs = await blogService.getAll()
    setBlogs(allBlogs)
  }


  if (!showMore) {
    return(
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={() => setShowMore(true)}>view</button>
      </div>
    )
  }
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setShowMore(false)}>hide</button>
      </div>
      <div>{blog.url}</div>
      <div>
          likes {likes}
        <button onClick={handleLike}>like</button>
      </div>
      <div>{blog.user.name}</div>
      <RemoveButton blog={blog} setBlogs={setBlogs} usersName={usersName} />
    </div>
  )

}

const RemoveButton = ({ blog, setBlogs, usersName }) => {
  const handleremove = async() => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog.id)
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
    }

  }
  if(blog.user.name === usersName) {
    return (
      <button onClick={handleremove}>remove</button>
    )
  }
  else {
    return null
  }
}


export default Blog
