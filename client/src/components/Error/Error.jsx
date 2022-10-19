import React from 'react'

const Error = ({ message }) => {

  return (
    <div>
      <h1 className='error'>{message}</h1>
    </div>
  )
}

export default Error