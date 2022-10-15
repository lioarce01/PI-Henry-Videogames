import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { getGenres, createGame } from '../../redux/actions/index'
import validate from './validate'
import './CreateGame.css'

const CreateGame = () => {
  const [errors, setErrors] = useState({})
  const [input, setInput] = useState({
    name: '',
    description: '',
    release_date: '',
    rating: '',
    image: '',
    platforms: [],
    genres: [],
  })

  const dispatch = useDispatch()
  const genres = useSelector((state) => state.genres)

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    )
    
    if(Object.keys(errors).length === 0){
      dispatch(createGame(input))
      alert('Game created successfully')
      setInput({
        name: '',
        description: '',
        release_date: '',
        rating: '',
        image: '',
        platforms: [],
        genres: [],
      })
    } else {
      alert('Fill the required fields')
      return;
    }
  }

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value,
    }))
  }
  
  const handleSelectGenres = (e) => {
    setInput({ 
      ...input,
      genres: [...input.genres, e.target.value] 
    })
  }

  const handleSelectPlatforms = (e) => {
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value]
    })
  }

  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])

  return (
    <div>
      <div className="create_container">
        <h1 className='create_title'>Create Game</h1>
        <div className="create_game">
          <form className="create_form" onSubmit={handleSubmit}>
            <div className="create_form_info">
              <div className="create_form_info_text">
                <div>
                  <label>Game Name</label>
                  <input type="text" placeholder='Enter Game Name' name="name" value={input.name} onChange={handleChange} />
                  {errors.name && <p className="errors">{errors.name}</p>}
                </div>
                <div>
                  <label>Game Description</label>
                  <input type="text" placeholder='Enter Game Description' name="description" value={input.description} onChange={handleChange} />
                  {errors.description && <p className="errors">{errors.description}</p>}
                </div>
                <div>
                  <label>Release Date</label>
                  <input type="text" placeholder='Enter Release Date' name="release_date" value={input.release_date} onChange={handleChange} />
                </div>
                <div>
                  <label>Rating</label>
                  <input type="number" placeholder='Enter Valid Rating' name="rating" value={input.rating} onChange={handleChange} min={0} max={5} />
                </div>
                <div>
                  <label>Genres</label>
                  <select name="genres" onChange={handleSelectGenres}>
                    <option value="">Select Genre</option>
                    {genres.map((genre) => (
                      <option key={genre.id} value={genre.id}>
                        {genre.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Platforms</label>
                  <select name="platforms" onChange={handleSelectPlatforms}>
                    <option value="">Select Platform</option>
                    <option value="PC">PC</option>
                    <option value="PlayStation">PlayStation</option>
                    <option value="Xbox">Xbox</option>
                    <option value="Nintendo">Nintendo</option>
                    <option value="iOS">iOS</option>
                    <option value="Android">Android</option>
                    <option value="Mac">Mac</option>
                    <option value="Linux">Linux</option>
                  </select>
                  {errors.platforms && <p className="errors">{errors.platforms}</p>}
                </div>
                <div>
                  <label>Image</label>
                  <input type="text" placeholder='Enter Image URL' />
                </div>
                <div className="create_form_btn">
                  <button className="create_form_btn" type="submit">Create Game</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateGame