
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
    DELETE_GAME,
    UPDATE_GAME,
    GET_PLATFORMS
} from '../actions/index.jsx';

const initialState = {
    games: [],
    allVideogames: [], 
    game: {},
    genres: [],
    notFound: false,
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
                notFound: false,
            }


        case CREATE_GAME:
            return {
                ...state,
                games: [...state.games, action.payload],
                allVideogames: [...state.allVideogames, action.payload],
            }


        case GET_GAME_BY_NAME:
            let gameByName = state.allVideogames.filter(game => game.name.toLowerCase().includes(action.payload.toLowerCase()))
            if(gameByName.length === 0) {
                return {
                    ...state,
                    games: [],
                    notFound: true,
                }
            } else {
                return {
                    ...state,
                    games: gameByName,
                    notFound: false,
                }
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
            if (action.payload === 'low') {
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
            } else if (action.payload === 'high') {
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
            let filterDbGames = action.payload === 'db'
                ? state.allVideogames?.filter(game => game.createdInDb)
                : state.allVideogames?.filter(game => !game.createdInDb) 
            return {
                ...state,
                games: action.payload === 'all' ? state.allVideogames : filterDbGames
            }


        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }


        case SORT_BY_GENRE:
            let filterGames = state.allVideogames?.filter(game => game.genres.includes(action.payload))
            if(filterGames.length === 0) {
                return {
                    ...state,
                    games: [],
                    notFound: true,
                }
            } else {
                return {
                    ...state,
                    games: filterGames,
                    notFound: false,
                }
            }


        case DELETE_GAME:
            return {
                ...state,
                games: state.games?.filter(game => game.id !== action.payload),
                allVideogames: state.allVideogames.filter(game => game.id !== action.payload)
            }

        case UPDATE_GAME:
            return {
                ...state,
                games: state.games?.map(game => game.id === action.payload.id ? action.payload : game),
                allVideogames: state.allVideogames.map(game => game.id === action.payload.id ? action.payload : game)
            }


        case GET_PLATFORMS:
            return {
                ...state,
                platforms: action.payload
            }


        default:
            return {
                ...state
            }
    }
}

export default rootReducer;