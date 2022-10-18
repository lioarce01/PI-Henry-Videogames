
import { 
    GET_GAME_LIST, 
    GET_GAME_DETAILS, 
    GET_GAME_BY_NAME,
    GET_GENRES,
    CREATE_GAME, 
    SORT_BY_NAME,
    SORT_BY_RATING,
    SORT_BY_GENRE,
    SORT_DB_GAMES,
} from '../actions/index.jsx';

const initialState = {
    games: [],
    allVideogames: [],
    game: {},
    genres: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_GAME_DETAILS:
            return {
                ...state,
                game: action.payload,
            }


        case GET_GAME_LIST:
            return {
                ...state,
                games: action.payload,
                allVideogames: action.payload,
            }


        case CREATE_GAME:
            return {
                ...state,
            }


        case GET_GAME_BY_NAME:
            return {
                ...state,
                games: action.payload
            }


        case SORT_BY_NAME:
            if (action.payload === 'asc') {
                return {
                    ...state,
                    games: state.games.sort((a, b) => {
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (a.name < b.name) {
                            return -1;
                        }
                        return 0;
                    })
                }
            } else if (action.payload === 'desc') {
                return {
                    ...state,
                    games: state.games.sort((a, b) => {
                        if (a.name < b.name) {
                            return 1;
                        }
                        if (a.name > b.name) {
                            return -1;
                        }
                        return 0;
                    })
                }
            } else {
                return {
                    ...state,
                    games: state.allVideogames
                }
            }

        case SORT_BY_RATING:
            if (action.payload === 'asc') {
                return {
                    ...state,
                    games: state.games.sort((a, b) => {
                        if (a.rating > b.rating) {
                            return 1;
                        }
                        if (a.rating < b.rating) {
                            return -1;
                        }
                        return 0;
                    })
                }
            } else if (action.payload === 'desc') {
                return {
                    ...state,
                    games: state.games.sort((a, b) => {
                        if (a.rating < b.rating) {
                            return 1;
                        }
                        if (a.rating > b.rating) {
                            return -1;
                        }
                        return 0;
                    })
                }
            } else {
                return {
                    ...state,
                    games: state.allVideogames
                }
            }

        case SORT_DB_GAMES:
            let filterDbGames = state.allVideogames.filter(game => game.createdInDb)
            if(action.payload === 'db') {
                return {
                    ...state,
                    games: filterDbGames
                }
            } else if(action.payload === 'api') {
                return {
                    ...state,
                    games: state.allVideogames.filter(game => !game.createdInDb)
                }
            } else {
                return {
                    ...state,
                    games: state.allVideogames
                }
            }


        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }


        case SORT_BY_GENRE:
            const allGames = state.games;
            if(action.payload === 'all') {
                return {
                    ...state,
                    games: state.allVideogames
                }
            } else {
                //si el payload es un genero, filtrar por ese genero, si no hay coincidencias, devolver un error y no filtrar nada
                let filterByGenre = allGames.filter(game => game.genres.includes(action.payload))
                if(filterByGenre.length === 0) {
                    return {
                        ...state,
                        games: 'error'
                    }
                } else {
                    return {
                        ...state,
                        games: filterByGenre
                    }
                }
            }


        default:
            return {
                ...state
            }
    }
}

export default rootReducer;