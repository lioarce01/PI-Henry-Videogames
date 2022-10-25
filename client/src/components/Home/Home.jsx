import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGenres, getGameList, deleteGame } from '../../redux/actions/'
import { sortByName, sortByRating, sortDbGames, sortByGenre } from '../../redux/actions/index'
import GameCard from '../GameCard/GameCard'
import Loader from '../Loader/Loader'
import Error from '../Error/Error' //eslint-disable-line
import SearchBar from '../Searchbar/SearchBar'
import Pagination from '../Pagination/Pagination'
import './Home.css'

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [gamesPerPage] = useState(15)
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState('') //eslint-disable-line
  const [error, setError] = useState(false) 

  const dispatch = useDispatch()
  const allVideogames = useSelector(state => state.games)

  const indexOfLastGame = currentPage * gamesPerPage // 1 * 15 = 15
  const indexOfFirstGame = indexOfLastGame - gamesPerPage // 15 - 15 = 0
  const currentGames = allVideogames.slice(indexOfFirstGame, indexOfLastGame) // [0, 15] son la cantidad de juegos por pagina

  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])

  useEffect(() => {
    setLoading(true)
    dispatch(getGameList())
    .then(() => setLoading(false))
    .catch(() => setError(true))
  }, [dispatch])

  const handleSortName = (e) => {
    e.preventDefault()
      dispatch(sortByName(e.target.value))
      setOrder(e.target.value)
      setCurrentPage(1)
  }

  const handleSortRating = (e) => {
    e.preventDefault()
    dispatch(sortByRating(e.target.value))
    setOrder(e.target.value)
  }

  const handleSortDbGames = (e) => {
    e.preventDefault()
    if(allVideogames.length === 0) {
      alert('No hay juegos en la base de datos')
    } else {
      dispatch(sortDbGames(e.target.value))
      setOrder(e.target.value)
    }
  }

  const handleSortByGenre = (e) => {
    e.preventDefault()
    dispatch(sortByGenre(e.target.value))
    setCurrentPage(1)
    setOrder(e.target.value)
  }

  const handleDeleteGame = (id) => {
    dispatch(deleteGame(id))
    alert('Game deleted successfully')
    window.location.reload()
  }

  const handleReset = (e) => {
    e.preventDefault()
    dispatch(getGameList())
    setCurrentPage(1)
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
        setCurrentPage={setCurrentPage}
        handleReset={handleReset}
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
                 loading 
                 ? <Loader/>
                 : error 
                 ? <Error
                    message="Error, no games found"
                  />
                 : currentGames?.map((game, i) => {
                    return (
                      <div key={i}>
                          <GameCard
                            key={game.id}
                            id={game.id}
                            name={game.name}
                            image={game.image}
                            genres={game.genres ? game.genres : 'No genres'}
                            rating={game.rating}
                            createdInDb={game.createdInDb}
                            handleDeleteGame={handleDeleteGame}
                            />
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