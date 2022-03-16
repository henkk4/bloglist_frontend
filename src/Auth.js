import React, { useState } from 'react'
import LoginForm from './components/Login'
import RegisterForm from './components/Register'

const Auth = ({ username, password, handleLogin, handleRegister, name, setName, setUsername, setPassword }) => {
  const [login, setLogin] = useState(true)

  if(login) {
    return (
      <div>
        <h2>Login to application</h2>
        <label>New user?</label>
        <button style={{ margin: '10px' }} onClick={() => setLogin(false)}>Go to register</button>
        <LoginForm username={username} password={password} handleLogin={handleLogin}
          setPassword={setPassword} setUsername={setUsername}></LoginForm>
      </div>
    )
  }
  return (
    <div>
      <h2>Register to application</h2>
      <label>Already a user?</label>
      <button style={{ margin: '10px' }} onClick={() => setLogin(true)}>Go to login</button>
      <RegisterForm username={username} password={password} name={name} handleRegister={handleRegister}
        setPassword={setPassword} setUsername={setUsername} setName={setName}></RegisterForm>
    </div>
  )}

export default Auth