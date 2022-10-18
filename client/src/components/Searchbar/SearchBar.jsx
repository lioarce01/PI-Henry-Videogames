import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGameByName } from '../../redux/actions'
import './SearchBar.css'

const SearchBar = ({ handleSortByGenre, handleSortName, handleSortRating, handleSortDbGames }) => {
    const [input, setInput] = useState('')
    const dispatch = useDispatch()
    const allGenres = useSelector(state => state.genres)

    const handleInputChange = (e) => {
        e.preventDefault()
        setInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!input.length) {
          alert('Please enter a game name')
          return;
        } else {
          dispatch(getGameByName(input))
          setInput('')
        }
      }

  return (
    <div>
        <div className="search_container">

            <div className="games_filters">
                <div className="order_filter">
                    <select className="order_select" onChange={handleSortName}>
                        <option value="">Name</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>

                </div>

            <div className="order_filter">
                <select className="order_select" onChange={handleSortRating}>
                    <option value="">Rating</option>
                    <option value="asc">Min - Max</option>
                    <option value="desc">Max -Min</option>
                </select>
            </div>

            <form className="form" onSubmit={(e) => handleSubmit(e)}>
                <input className="search_input" type="text" placeholder="Search..." value={input} onChange={(e) => handleInputChange(e)} />
                <button className='search_btn' type='submit'>Search</button>
            </form>

            <div className="order_filter">
                <select className="order_select" onChange={handleSortDbGames}>
                    <option value="all">All</option>
                    <option value="api">API</option>
                    <option value="db">DB</option>
                </select>
            </div>

            <div className="order_filter">
              <select className="order_select" onChange={handleSortByGenre}>
                <option value="all">All</option>
                {
                  allGenres.map(genre => (
                    <option key={genre.name} value={genre.name}>{genre.name}</option>
                  ))
                }
              </select>
            </div>

          </div>
        </div>
    </div>
  )
}

export default SearchBar