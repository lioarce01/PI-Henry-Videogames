import React, { useEffect, useState } from 'react'
import './Loader.css'

const Loader = () => {
    const loading = ['Loading', 'Loading.', 'Loading..', 'Loading...']
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((index) => (index + 1) % loading.length)
        }, 300)
        return () => clearInterval(interval)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='loader'>
      <h1>{loading[index]}</h1>
    </div>
  )
}

export default Loader