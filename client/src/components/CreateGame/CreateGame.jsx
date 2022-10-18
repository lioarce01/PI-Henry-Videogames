import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { getGenres, createGame } from '../../redux/actions/index'
import validate from './validate'
import bgVideo from '../../assets/create_bg.mp4'
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

  const handleImage = (e) => {
    setInput({
      ...input,
      image: e.target.value
    })
  }

  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])

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
      <video src={bgVideo} autoPlay loop muted type="video/mp4" id='bg-video' />
      <div className="create_container">
        <h1 className='create_title'>Create Game</h1>
        <div className="create_game">
          <form className="create_form" onSubmit={handleSubmit}>
            <div className="create_form_info">
              <div className="create_form_info_text">
                <div className='create_info_game'>
                  <label>Game Name</label>
                  <input type="text" placeholder='Enter Game Name' name="name" value={input.name} onChange={handleChange} />
                  {errors.name && <p className="errors">{errors.name}</p>}
                </div>
                <div className='create_info_game'>
                  <label>Game Description</label>
                  <input type="text" placeholder='Enter Game Description' name="description" value={input.description} onChange={handleChange} />
                  {errors.description && <p className="errors">{errors.description}</p>}
                </div>
                <div className='create_info_game'>
                  <label>Release Date</label>
                  <input type="text" placeholder='Enter Release Date' name="release_date" value={input.release_date} onChange={handleChange} />
                </div>
                <div className='create_info_game'>
                  <label>Rating</label>
                  <input type="number" placeholder='Enter Valid Rating' name="rating" value={input.rating} onChange={handleChange} min={0} max={5} />
                </div>
                <div className='create_info_game'>
                  <label>Genres</label>
                  <select name="genres" className='create_game_select' onChange={handleSelectGenres}>
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
                  <select className='create_game_select' name="platforms" onChange={handleSelectPlatforms}>
                    <option value="PC">PC</option>
                    <option value="PlayStation">PlayStation</option>
                    <option value="Xbox">Xbox</option>
                    <option value="Nintendo">Nintendo</option>
                    <option value="iOS">iOS</option>
                    <option value="Android">Android</option>
                    <option value="Mac">Mac</option>
                    <option value="Linux">Linux</option>
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
                  {errors.platforms && <p className="errors">{errors.platforms}</p>}
                </div>
                <div className='create_info_game'>
                  <label>Image <span className='parentesis_text'>(JPG FORMAT)</span></label>
                  <input type="text" placeholder='Enter JPG format file URL' name="image" value={input.image} onChange={handleImage} />
                </div>
                <div className="create_form_btn">
                  <div>
                    <button type="submit">Create Game</button>
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