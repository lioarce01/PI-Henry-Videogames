import React from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'

const LandingPage = () => {
  return (
    <div>
        <div className="container_landing">
            <div className="info-wrapper">
                <h1 className='landing_title'>Welcome to my Videogames Project</h1>
                <p className='landing_text'>This is a project made with React, Redux, Express, Sequelize and PostgreSQL</p>
                <Link to='/home'>
                    <button className="landing_btn">Enter</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default LandingPage