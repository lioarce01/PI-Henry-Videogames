import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getGenres, getGameList } from '../../redux/actions/'
import { sortByName, sortByRating, sortDbGames, sortByGenre } from '../../redux/actions/index'
import GameCard from '../GameCard/GameCard'
import Loader from '../Loader/Loader'
import './Home.css'
import SearchBar from '../Searchbar/SearchBar'
import Pagination from '../Pagination/Pagination'

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [gamesPerPage, setGamesPerPage] = useState(15)
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState('')
  const [error, setError] = useState(false)

  const dispatch = useDispatch()
  const allVideogames = useSelector(state => state.games)

  const indexOfLastGame = currentPage * gamesPerPage
  const indexOfFirstGame = indexOfLastGame - gamesPerPage
  const currentGames = allVideogames.slice(indexOfFirstGame, indexOfLastGame)

  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])

  useEffect(() => {
    setLoading(true)
    setError(false)
    dispatch(getGameList())
      .then(() => setLoading(false))
      .catch(() => setError(true))
  } , [dispatch])

  const handleSortName = (e) => {
    e.preventDefault()
    dispatch(sortByName(e.target.value))
    setOrder(e.target.value)
  }

  const handleSortRating = (e) => {
    e.preventDefault()
    dispatch(sortByRating(e.target.value))
    setOrder(e.target.value)
  }

  const handleSortDbGames = (e) => {
    e.preventDefault()
    dispatch(sortDbGames(e.target.value))
    setOrder(e.target.value)
  }

  const handleSortByGenre = (e) => {
    e.preventDefault()
    dispatch(sortByGenre(e.target.value))
    setOrder(e.target.value)
  }

const nextPage = (pageNumber) => {
  setCurrentPage(pageNumber)
}

const prevPage = (pageNumber) => {
  setCurrentPage(pageNumber)
}

  return (
    <div>
      <SearchBar
        handleSortName={handleSortName}
        handleSortRating={handleSortRating}
        handleSortDbGames={handleSortDbGames}
        handleSortByGenre={handleSortByGenre}
      />
      <Pagination
        allVideogames={allVideogames.length}
        gamesPerPage={gamesPerPage}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
      />
      <div className="container_home">
          <div className="games_container">
            <div className="games_list">
              {
                loading ? <Loader /> : 
                 currentGames?.map((game, i) => {
                  return (
                    <div key={i}>
                      <Link to={`/videogame/${game.id}`} className='link_GC'>
                        <GameCard
                          key={game.id}
                          id={game.id}
                          name={game.name}
                          image={game.image}
                          genres={game.genres ? game.genres : 'No genres'}
                          />
                      </Link>
                    </div>
                  )
                })
              }
          </div>
        </div>
      </div>
    </div>
  )
}


export default Home