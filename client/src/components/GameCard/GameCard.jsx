import React from 'react'
import './GameCard.css'

const GameCard = ({ name, image, genres }) => {
  const genre = genres?.slice(0, 2).join(' / ')

  return (
    <div>
        <div className="card_container">
            <img className='game_image' src={image} alt="game_image" />
            <div className="card_description">
                <h3 className='game_name'>{name}</h3>
                <div className="card_genres">
                    <p>Genres:</p>
                    <p>{genre}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default GameCard