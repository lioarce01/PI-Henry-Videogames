import axios from 'axios';
export const GET_GAME_LIST = 'GET_GAME_LIST';
export const GET_GAME_DETAILS = 'GET_GAME_DETAILS';
export const GET_GENRES = 'GET_GENRES';
export const GET_GAME_BY_NAME = 'GET_GAME_BY_NAME';
export const CREATE_GAME = 'CREATE_GAME';
export const SORT_BY_NAME = 'SORT_BY_NAME';
export const SORT_BY_RATING = 'SORT_BY_RATING';
export const SORT_BY_GENRE = 'SORT_BY_GENRE';
export const SORT_DB_GAMES = 'SORT_DB_GAMES';


export const getGameList = () => async (dispatch) => {
    const res = await axios.get('http://localhost:3001/videogames');
    return dispatch({
        type: GET_GAME_LIST,
        payload: res.data
    })
};

export const getGameDetails = (id) => async dispatch => {
    const res = await axios.get(`http://localhost:3001/videogames/${id}`);
    dispatch({
        type: GET_GAME_DETAILS,
        payload: res.data
    });
}

export const createGame = (game) => async dispatch => {
    const res = await axios.post('http://localhost:3001/videogames', game);
    dispatch({
        type: CREATE_GAME,
        payload: res.data
    });
}

export const getGameByName = (name) => async dispatch => {
    const res = await axios.get(`http://localhost:3001/videogames?name=${name}`);
    dispatch({
        type: GET_GAME_LIST,
        payload: res.data
    });
}

// GET GENRES
export const getGenres = () => async dispatch => {
    const res = await axios.get('http://localhost:3001/genres');
    dispatch({
        type: GET_GENRES,
        payload: res.data
    });
}

// ORDER ASCENDENT AND DESCENDENT BY NAME
export const sortByName = (payload) => {
    return {
        type: SORT_BY_NAME,
        payload
    }
}

// ORDER BY RATING
export const sortByRating = (payload) => {
    return {
        type: SORT_BY_RATING,
        payload
    }
}

// FILTER BY DB GAMES OR API GAMES
export const sortDbGames = (payload) => {
    return {
        type: SORT_DB_GAMES,
        payload
    }
}

//FITLER BY GENRE

export const sortByGenre = (payload) => {
    return {
        type: SORT_BY_GENRE,
        payload
    }
}