import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import registerService from './services/register'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Auth from './Auth'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [sortBy, setSortBy] = useState('likes')

  const [isError, setError] = useState(false)
  const [messageTime, setMessageTime] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const blogFormRef = useRef()

  const handleRegister = async (event) => {
    event.preventDefault()

    try {
      await registerService.register({
        name, username, password,
      })
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      setError(false)
      setMessage(`${user.name} Registered succesfully`)
      setMessageTime(true)

      setTimeout(() => {
        setMessageTime(false)
        setMessage('')
      }, 5000)
    }
    catch (exception) {
      setError(true)
      setMessage('invalid username or password')
      setMessageTime(true)

      setTimeout(() => {
        setMessageTime(false)
        setMessage('')
        setError(false)
      }, 5000)
    }
  }
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      setError(false)
      setMessage(`${user.name} logged in succesfully`)
      setMessageTime(true)

      setTimeout(() => {
        setMessageTime(false)
        setMessage('')
      }, 5000)
    }
    catch (exception) {
      setError(true)
      setMessage('wrong username or password')
      setMessageTime(true)

      setTimeout(() => {
        setMessageTime(false)
        setMessage('')
        setError(false)
      }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const showBlogs = () => (
    sortBy === 'likes' ?
      blogs.sort((a, b) => b.likes - a.likes)
      : sortBy === 'name' ?
        blogs.sort((a, b) => b.title.toLowerCase() < a.title.toLowerCase() ? 1 : -1)
        : blogs.sort((a, b) => b.author < a.author ? 1 : -1),
    blogs.map(blog =>
      <Blog key={blog.id} blog={blog} setBlogs={setBlogs} usersName={user.name} />)
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification isError={isError} message={message} messageTime={messageTime}/>
      {user === null ?
        <Auth username={username} password={password} name={name} handleRegister={handleRegister}
          setPassword={setPassword} setUsername={setUsername} setName={setName} handleLogin={handleLogin}></Auth>
        :
        <div>
          <p>Welcome {user.name}!
            <button style={{ margin: '10px' }} onClick={() => logout()}>Log out</button>
          </p>
          <Togglable buttonLabel='Add new blog' ref={blogFormRef}>
            <NewBlogForm setError={setError} blogFormRef={blogFormRef} blogs={blogs}
              setMessage={setMessage} setMessageTime={setMessageTime} setBlogs={setBlogs}
            />
          </Togglable>
          <div style={{ margin: '10px' }}>
            <label>Sort by:</label>
            <select data-testid='sort-select' value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value='likes'>Likes</option>
              <option value='name'>Name</option>
              <option value='author'>Author</option>
            </select>
          </div>
          {showBlogs()}
        </div>
      }
    </div>
  )
}

export default App