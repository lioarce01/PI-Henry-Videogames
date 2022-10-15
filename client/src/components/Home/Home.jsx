import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { sortByName, sortByRating, sortDbGames, getGenres, getGameList, getGameByName, sortByGenre } from '../../redux/actions/'
import Loader from '../Loader/Loader'
import Error from '../Error/Error'
import GameCard from '../GameCard/GameCard'
import './Home.css'

const Home = () => {
  const [input, setInput] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [gamesPerPage] = useState(15)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [order, setOrder] = useState('')

  const dispatch = useDispatch()
  const location = useLocation()
  const allVideogames = useSelector(state => state.games) // all videogames
  const allGenres = useSelector(state => state.genres) // all genres
  const query = new URLSearchParams(location.search)
  const name = query.get('name')

  const indexOfLastGame = currentPage * gamesPerPage
  const indexOfFirstGame = indexOfLastGame - gamesPerPage
  const currentGames = allVideogames.slice(indexOfFirstGame, indexOfLastGame)
  const lastPage = Math.ceil(allVideogames.length / gamesPerPage)
  const firstPage = 1

  useEffect(() => {
    dispatch(getGenres())
    dispatch(getGameList())
  }, [dispatch])

  useEffect(() => {
    if (name) {
      setLoading(true)
      try {
        dispatch(getGameByName(name))
      } catch (error) {
        setError(true)
      }
      setLoading(false)
    }
  }, [dispatch, name])

  useEffect(() => {
    if (!allVideogames.length) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [dispatch, allVideogames])

  const nextPage = () => {
    if(currentPage === lastPage) return;
    if(currentPage < lastPage) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if(currentPage === firstPage ) return;
    if(currentPage > firstPage) setCurrentPage(currentPage - 1)

  }
  
  const handleInputChange = (e) => {
    e.preventDefault()
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!input.length) {
      alert('Please enter a game name')
    } else {
      dispatch(getGameByName(input))
      setInput('')
    }
  }

  const handleSortName = (e) => {
    e.preventDefault()
    dispatch(sortByName(e.target.value))
    setCurrentPage(1)
    setOrder(e.target.value)
  }

  const handleSortRating = (e) => {
    e.preventDefault()
    dispatch(sortByRating(e.target.value))
    setCurrentPage(1)
    setOrder(e.target.value)
  }

  const handleSortDbGames = (e) => {
    e.preventDefault()
    dispatch(sortDbGames(e.target.value))
    setCurrentPage(1)
    setOrder(e.target.value)
  }

  const handleSortByGenre = (e) => {
    e.preventDefault()
    dispatch(sortByGenre(e.target.value))
    setCurrentPage(1)
    setOrder(e.target.value)
  }

  return (
    <div>
      <div className="container_home">
        <div className="search_container">

          <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <input className="search_input" type="text" placeholder="Search..." value={input} onChange={(e) => handleInputChange(e)} />
            <button className='search_btn' type='submit'>Search</button>
          </form>

        </div>
          <div className="games_filters">
            <div className="order_filter">
              <p>Order: </p>
              <select className="order_select" onChange={handleSortName}>
                <option value="order">Order</option>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
              </select>

            </div><div className="order_filter">
              <p>Rating: </p>
              <select className="order_select" onChange={handleSortRating}>
                <option value="order">Order</option>
                <option value="asc">Rating Asc</option>
                <option value="desc">Rating Desc</option>
              </select>
            </div>
            <div className="order_filter">
              <p>Games: </p>
              <select className="order_select" onChange={handleSortDbGames}>
                <option value="all">All</option>
                <option value="api">API</option>
                <option value="db">DB</option>
              </select>
            </div>

            <div className="order_filter">
              <p>Genres: </p>
              <select className="order_select" onChange={handleSortByGenre}>
                <option value="order">Order</option>
                <option value="all">All</option>
                {
                  allGenres?.map(genre => (
                    <option key={genre.id} value={genre.name}>{genre.name}</option>
                  ))
                }
              </select>
            </div>
          </div>

          <div className="pagination">
            <div className="pagination_container">
              <div className="pagination_btns">
                <button className="pagination_btn_prev" onClick={() => prevPage()}>Prev</button>
                <p className='info_pages'> Page {currentPage} of {Math.ceil(allVideogames.length / gamesPerPage)}</p>
                <button className="pagination_btn_next" onClick={() => nextPage()}>Next</button>
              </div>
            </div>
          </div>
          
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