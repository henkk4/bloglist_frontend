import React from 'react'

const RegisterForm = ({ username, password, handleRegister, name, setName, setUsername, setPassword }) => {

  return (
    <form onSubmit={handleRegister}>
      <div>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          name="name"
          onChange={({ target }) => setName(target.value)}
        />
      </div>
      <div>
        <label>Username: </label>
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label>Password: </label>
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  )}

export default RegisterForm