import { GET_VIEWS } from '../constants/actionTypes';

// manages view count
export default (state = { viewCount: 0 }, action) => {
    switch (action.type) {
        case GET_VIEWS:
            return { ...state, viewCount: action.payload }
        default:
            return state
    }
}