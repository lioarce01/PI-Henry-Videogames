import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { getGameDetails } from '../../redux/actions'
import Loader from '../Loader/Loader'
import './GameDetail.css'

const GameDetail = () => {
    const [loading, setLoading] = useState(true)
    const stars = ['⭐', '⭐', '⭐', '⭐', '⭐']
    const game = useSelector(state => state.game)
    const {id} = useParams()
    const dispatch = useDispatch()

    const gameRating = game.rating ? stars.slice(0, game.rating).join('') : 'No rating'
    const gameReleased = game.release_date ? game.release_date.split('-').reverse().join('/') : 'No release date'
    const gameGenres = game.genres ? game.genres.map(genre => genre).join(' / ') : 'No genres'
    const gamePlatforms = game.platforms ? game.platforms?.map(platform => platform).join(' / ') : 'No platforms'
    const gameDescription = game.description ? game.description.substring(0, 600) : 'No description'

    useEffect(() => {
        dispatch(getGameDetails(id))
            .then(() => setLoading(false))
    }, [dispatch, id])


  return (
    <div className='container'>
        <div className="game_detail_container">
            {
                loading ? <Loader/>
                : (
                    <div className="details_wrapper">
                        <div className="details_upper">
                            <div className="details_image">
                                <img className='image_game' src={game.image} alt="game_image" />
                            </div>
                        <div className="details_info">
                            <div className="name_update">
                                <h1>{game.name}</h1>
                                {
                                    game.createdInDb &&
                                    <Link to={`/videogame/${id}/update`}>
                                        <button className='update_button'>Update</button>
                                    </Link>

                                }
                            </div>
                            <p>Genres: <span>{gameGenres}</span></p>
                            <p>Platforms: <span>{gamePlatforms}</span></p>
                            <p>Rating: <span>{gameRating}</span></p>
                            <p>Released: <span>{gameReleased}</span></p>    
                        </div>
                    </div>
                    <div className="details_lower">
                        <h2>Description</h2>
                        <p>{gameDescription}...</p>
                    </div>
                </div>
                )
            }
        </div>
    </div>
  )
}

export default GameDetail;