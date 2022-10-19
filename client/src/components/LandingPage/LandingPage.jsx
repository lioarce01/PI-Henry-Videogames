import React from 'react'
import { Link } from 'react-router-dom'
import bgVideo from '../../assets/background.mp4'
import './LandingPage.css'

const LandingPage = () => {
  return (
    <div>
      <video src={bgVideo} autoPlay loop muted type="video/mp4" id='bg-video'/>
        <div className="container_landing">
            <div className="info-wrapper">
                <h1 className='landing_title'>Welcome to my Videogames Page</h1>
                <p className='landing_text'>This is a project made with React, Redux, Express, Sequelize and PostgreSQL</p>
                <Link to='/home'>
                    <button className="landing_btn">Play</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default LandingPage