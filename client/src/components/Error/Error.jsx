import React from 'react'

const Error = () => {
  const error = 'Error 404: Page not found'



  return (
    <div>
      <h1 className='error'>{error}</h1>
    </div>
  )
}

export default Error