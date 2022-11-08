import { NEW_NOTE, REMOVE_NOTE } from '../constants/actionTypes';

// manages notifications, independent of the rest of the app
export default (state = { list: [] }, action) => {
    try {
        switch (action.type) {
            case NEW_NOTE:
                return { ...state, list: [...state.list, { ...action.data, ts: Date.now(), lifespan: 5000, id: state.list.length }] };
            case REMOVE_NOTE:
                return { ...state, list: [...state.list.filter(note => note.id !== action.data.id)] };
            default:
                return state;
        }
    } catch (e) {
        console.log('notifications error', e, action);
        return state;
    }
}