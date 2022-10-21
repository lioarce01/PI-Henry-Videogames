import React from 'react'
import { Link } from 'react-router-dom'
import './GameCard.css'

const GameCard = ({ name, image, genres, handleDeleteGame, id, createdInDb, handleUpdateGame }) => {

  return (
    <Link to={`/videogame/${id}`} className='link_GC'>
      <div>
          <div className="card_container">
              <img className='game_image' src={image} alt="game_image" />
                <div className="card_description">
                  <div className='card_description_upper'>
                    <div className='card_title'>
                      <h3 className='game_name'>{name}</h3>
                    </div>
                    <div className='card_button'>
                      {
                        createdInDb && <button className='delete_button' onClick={() => handleDeleteGame(id)}>X</button>
                      }
                    </div>
                  </div>
                  
                  <div className="card_genres">
                      <p>Genres:</p>
                      <p>{genres?.slice(0, 2).join(' / ')}</p>
                  </div>
                </div>
          </div>
      </div>
    </Link>
  )
}

export default GameCard