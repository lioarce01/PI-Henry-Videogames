
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
    game: {},
    genres: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_GAME_DETAILS:
            return {
                ...state,
                game: action.payload
            }
        case GET_GAME_LIST:
            return {
                ...state,
                games: action.payload
            }
        case CREATE_GAME:
            return {
                ...state,
                games: [...state.games, action.payload]
            }
        case GET_GAME_BY_NAME:
            return {
                ...state,
                games: action.payload
            }
        case SORT_BY_NAME:
            let sortByName = action.payload === 'asc' ? 
            state.games.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            }) : state.games.sort((a, b) => {
                if (a.name < b.name) {
                    return 1;
                }
                if (a.name > b.name) {
                    return -1;
                }
                return 0;
            })
            return {
                ...state,
                games: sortByName
            }
        
        case SORT_BY_RATING:
            let sortByRating = action.payload === 'asc' ?
            state.games.sort((a, b) => {
                if (a.rating > b.rating) {
                    return 1;
                }
                if (a.rating < b.rating) {
                    return -1;
                }
                return 0;
            }) : state.games.sort((a, b) => {
                if (a.rating < b.rating) {
                    return 1;
                }
                if (a.rating > b.rating) {
                    return -1;
                }
                return 0;
            })
            return {
                ...state,
                games: sortByRating
            }
        case SORT_DB_GAMES:
            let sortDbGames = action.payload === 'db' ?
            state.games.filter(game => typeof game.id === 'string') :
            state.games.filter(game => typeof game.id === 'number')
            return {
                ...state,
                games: action.payload === 'all' ? state.games : sortDbGames
            }
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        case SORT_BY_GENRE:
            const allGames = state.games;
            const sortByGenre = action.payload === 'All' ? 
            state.games 
            : allGames.filter(game => {
                // return only the games that have the genre selected in the filter
                return game.genres.includes(action.payload) // returns true or false 
            });
            return {
                ...state,
                games: sortByGenre
            }
        default:
            return {
                ...state
            }
    }
}

export default rootReducer;