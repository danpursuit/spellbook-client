import { CHANGE_CHAR_UP, CHANGE_CHAR_DOWN } from '../constants/actionTypes';

// manages character selection
const charReducer = (state = { all: ['chaze', 'threle'], currentIdx: 0 }, action) => {
    try {
        switch (action.type) {
            case CHANGE_CHAR_UP:
                if (state.currentIdx >= state.all.length - 1)
                    return { ...state, currentIdx: 0 };
                else
                    return { ...state, currentIdx: state.currentIdx + 1 };
            case CHANGE_CHAR_DOWN:
                if (state.currentIdx <= 0)
                    return { ...state, currentIdx: state.all.length - 1 };
                else
                    return { ...state, currentIdx: state.currentIdx - 1 };
            default:
                return state;
        }
    } catch (e) {
        console.log('charReducer error', e, action);
        return state;
    }
}

export default charReducer;