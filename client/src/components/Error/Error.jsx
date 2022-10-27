import React from 'react'

const Error = ({ message }) => {

  return (
    <div>
      <div className='error'>
        <h1 className='error_text'>{message}</h1>
      </div>
    </div>
  )
}

export default Error