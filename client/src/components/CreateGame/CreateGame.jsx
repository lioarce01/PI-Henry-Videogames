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

  const platforms = ['PC', 'PlayStation', 'Xbox', 'Nintendo', 'iOS', 'Android', 'Mac', 'Linux', 'Web', 'Other']
  const dispatch = useDispatch()
  const genres = useSelector((state) => state.genres)

  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    )
    
    if (Object.keys(errors).length === 0) {
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
      alert('Please fill all the fields')
      return;
    }
  }

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    )
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

  const handleImage = (e) => {
    setInput({
      ...input,
      image: e.target.value
    })
  }

  const handleCancel = () => {
    if(window.confirm('Are you sure you want to cancel?')){
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
      return;
    }
  }

  return (
    <div>
      <div className="create_container">
        <h1 className='create_title'>Create Game</h1>
        <div className="create_game">
          <form className="create_form" onSubmit={(e) => handleSubmit(e)}>
            <div className="create_form_info">
              <div className="create_form_info_text">
                <div className='create_info_game'>
                  <label>Game Name</label>
                  <input type="text" placeholder='Enter Game Name' name="name" value={input.name} onChange={(e) => handleChange(e)} />
                  {errors.name && <p className="errors">{errors.name}</p>}
                </div>
                <div className='create_info_game'>
                  <label>Game Description</label>
                  <input type="text" placeholder='Enter Game Description' name="description" value={input.description} onChange={(e) => handleChange(e)} />
                  {errors.description && <p className="errors">{errors.description}</p>}
                </div>
                <div className='create_info_game'>
                  <label>Release Date</label>
                  <input type="text" placeholder='Enter Release Date' name="release_date" value={input.release_date} onChange={(e) => handleChange(e)} />
                </div>
                <div className='create_info_game'>
                  <label>Rating</label>
                  <input type="number" placeholder='Enter Valid Rating' name="rating" value={input.rating} onChange={(e) => handleChange(e)} min='0' max='5' />
                </div>
                <div className='create_info_game'>
                  <label>Genres</label>
                  <select name="genres" className='create_game_select' onChange={(e) => handleSelectGenres(e)}>
                    {
                      genres.map((genre) => (
                        <option key={genre.name} value={genre.name}>{genre.name}</option>
                      ))
                    }
                  </select>
                  <div className='selected_genres'>
                    {
                      [...new Set(input.genres)].map((genre) => (
                        <div key={genre}>
                          <span className='cross' onClick={() => setInput({...input, genres: input.genres.filter((g) => g !== genre)})}>x</span>
                          {genre}
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className='create_info_game'>
                  <label>Platforms</label>
                    {errors.platforms && <p className="errors">{errors.platforms}</p>}
                  <select className='create_game_select' name="platforms" onChange={(e) => handleSelectPlatforms(e)}>
                    {
                      platforms.map((platform) => (
                        <option key={platform} value={platform}>{platform}</option>
                      ))
                    }
                  </select>
                  <div className='selected_platforms'>
                    {
                      [...new Set(input.platforms)].map((platform) => (
                        <div key={platform}>
                          <span className='cross' onClick={() => setInput({...input, platforms: input.platforms.filter((p) => p !== platform)})}>x</span>
                          {platform}
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className='create_info_game'>
                  <label>Image <span className='parentesis_text'>(JPG FORMAT)</span></label>
                  <input type="text" placeholder='Enter JPG format file URL' name="image" value={input.image} onChange={handleImage} />
                </div>
                <div className="create_form_btn">
                  <div>
                    <button type="submit" disabled={input.name.length === 0 || input.description.length === 0 || input.platforms.length === 0}>Create</button>
                  </div>
                  <div>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                  </div>
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