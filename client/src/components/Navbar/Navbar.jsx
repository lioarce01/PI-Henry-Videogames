import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <div>
        <div className="navbar_container">
            <div className="navbar_logo">
                <Link to='/home' className='link_logo'>
                    <h1>SPA Videogames</h1>
                </Link>
            </div>
            <div className="navbar_links">
                <ul>
                    <li><Link className='navbar_link' to="/home">Home</Link></li>
                    <li><Link className='navbar_link' to="/create">Create Game</Link></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Navbar