import React from 'react'

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

export default Notification