import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGenres, updateGame } from '../../redux/actions'
import { useHistory, useParams } from 'react-router-dom'
import validate from '../CreateGame/validate'
import './UpdateGame.css'

const UpdateGame = () => {
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
  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])

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
    if(e.target.value === 'Select Genres') {
      return
    } else {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      })
    }

    setErrors(
      validate({
        ...input,
        genres: [...input.genres, e.target.value],
      })
    )
  }

  const handleSelectPlatforms = (e) => {
    if(e.target.value === 'Select Platforms') {
      return;
    } else {
      if (input.platforms.includes(e.target.value)) {
        setInput({
          ...input,
          platforms: input.platforms.filter((p) => p !== e.target.value),
        })
      } else {
        setInput({
          ...input,
          platforms: [...input.platforms, e.target.value],
        })
      }
    }

    setErrors(
      validate({
        ...input,
        platforms: [...input.platforms, e.target.value],
      })
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (Object.keys(errors).length === 0) {
      dispatch(updateGame(id, input))
      alert('Game updated successfully')
      history.push(`/videogame/${id}`)
      window.location.reload()
    } else {
      alert('Please complete all required fields')
    }

    setInput({
      name: '',
      description: '',
      release_date: '',
      rating: '',
      image: '',
      platforms: [],
      genres: [],
    })

    setErrors({})
  }

  return (
    <div>
      <div className="update_game_container">
        <div className="update_game_title">Update Game</div>
        <form className="update_game_form" onSubmit={handleSubmit}>
          <div className="update_form_inputs">
            <div className="update_form_input">
              <label className="update_form_label">Game Name</label>
              <input type="text" placeholder='Game Name' name='name' value={input.name} onChange={handleChange} />
              {errors.name && <p className="errors">{errors.name}</p>}
            </div>
            <div className="update_form_input">
              <label className="update_form_label">Game Description</label>
              <input type="text" placeholder='Game Description' name='description' value={input.description} onChange={handleChange} />
              {errors.description && <p className="errors">{errors.description}</p>}
            </div>
            <div className="update_form_input">
              <label className="update_form_label">Release Date</label>
              <input type="text" placeholder='Release Date' name='release_date' value={input.release_date} onChange={handleChange} />
            </div>
            <div className="update_form_input">
              <label className="update_form_label">Rating</label>
              <input type="number" min={0} max={5} placeholder='Rating' name='rating' value={input.rating} onChange={handleChange} />
            </div>
            <div className="update_form_input">
              <label>Genres</label>
                {errors.genres && <p className="errors">{errors.genres}</p>}
                <select name="genres" className='create_game_select' onChange={(e) => handleSelectGenres(e)}>
                  <option value="">Select genres</option>
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
            <div className="update_form_input">
              <label>Platforms</label>
              {errors.platforms && <p className="errors">{errors.platforms}</p>}
                <select name="platforms" className='create_game_select' onChange={(e) => handleSelectPlatforms(e)}>
                  <option value="">Select platforms</option>
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
            <div className="update_form_input">
              <label>Image <span className='jpg_format'>(JPG Format)</span></label>
              <input type="text" placeholder='Image URL' name='image' value={input.image} onChange={handleChange} />
            </div>
          </div>
          <div className="update_form_buttons">
            <button className="update_form_button" disabled={Object.keys(errors).length > 0 || input.name === '' || input.description === '' || input.platforms.length === 0}>Update</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateGame