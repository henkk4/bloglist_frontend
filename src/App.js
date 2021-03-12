import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )
      console.log(window.localStorage.getItem('loggedAppUser'))
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
      console.log('wrong credentials')

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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )


  const showBlogs = () => (
    // eslint-disable-next-line no-sequences
    blogs.sort((a, b) => b.likes - a.likes),
    blogs.map(blog =>
      <Blog key={blog.id} blog={blog} setBlogs={setBlogs} usersName={user.name} />)
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification isError={isError} message={message} messageTime={messageTime}/>
      {user === null ?
        <div>
          <h2>Login to application</h2>
          {loginForm()}
        </div>
        :
        <div>
          <p>{user.name} logged in
            <button onClick={() => logout()}>logout</button>
          </p>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <NewBlogForm setError={setError} blogFormRef={blogFormRef} blogs={blogs}
              setMessage={setMessage} setMessageTime={setMessageTime} setBlogs={setBlogs}
            />
          </Togglable>

          {showBlogs()}
        </div>
      }
    </div>
  )
}

const Notification = ({ isError, message, messageTime }) => {
  const infoStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }
  const errorStyle = {
    color: 'red',
    background: 'grey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }
  if (!messageTime) {
    return null
  }
  else if(isError) {
    return (
      <div style={errorStyle}>
        {message}
      </div>
    )
  }
  else {
    return (
      <div style={infoStyle}>
        {message}
      </div>
    )
  }
}

export default App