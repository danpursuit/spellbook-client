import { AUTH, LOGOUT, GOT_RANKING, SET_PROFILE, REQUIRE_PASS, WRONG_PASS, RESET_LOGIN_FORM } from '../constants/actionTypes';

// manages the user's profile and signin process
const authReducer = (state = { profile: null, requirePass: false, wrongPass: false, ranking: {} }, action) => {
    try {
        switch (action.type) {
            case AUTH:
                return {
                    ...state,
                    profile: action.data
                }
            case SET_PROFILE:
                return { ...state, profile: action.data };
            case LOGOUT:
                return { ...state, profile: null, requirePass: false };
            case REQUIRE_PASS:
                return { ...state, requirePass: true };
            case WRONG_PASS:
                return { ...state, wrongPass: true };
            case RESET_LOGIN_FORM:
                return { ...state, requirePass: false, wrongPass: false };
            case GOT_RANKING:
                return { ...state, ranking: action.ranking };
            default:
                return state;
        }
    } catch (e) {
        console.log('authReducer error', e, action);
        return state;
    }
}

export default authReducer;