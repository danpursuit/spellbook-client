import { AUTH, REQUIRE_PASS, GOT_RANKING, WRONG_PASS, NEW_NOTE } from '../constants/actionTypes';
import * as api from '../api';
import { PROFILE_KEY } from '../constants/local';

// manage rest requests for user authentication
export const signin = (formData) => async (dispatch) => {
    try {
        const { data } = await api.signin(formData);
        localStorage.setItem(PROFILE_KEY, JSON.stringify({ ...data }));
        dispatch({ type: AUTH, data });
        dispatch({ type: NEW_NOTE, data: { msg: 'Logged in successfully' } });
    } catch (error) {
        try {
            const { message } = error.response.data;
            if (message === 'Username exists with password.') {
                dispatch({ type: REQUIRE_PASS });
            } else if (message === 'Invalid credentials.') {
                dispatch({ type: WRONG_PASS });
            } else {
                console.log('signin errored with unknown:', message);
            }
        } catch (error) {
            console.log('signin', error);
        }
    }
}

export const changePassword = (formData) => async (dispatch) => {
    try {
        const { data } = await api.changePassword(formData);
        dispatch({ type: AUTH, data });
        dispatch({ type: NEW_NOTE, data: { msg: 'Changed Password!' } });
        localStorage.setItem(PROFILE_KEY, JSON.stringify({ ...data }));
    } catch (error) {
        dispatch({ type: NEW_NOTE, data: { msg: 'Issue with changing password' } });
        console.log('changePassword', error);
    }
}

export const getRanking = (username) => async (dispatch) => {
    try {
        const { data } = await api.getRanking(username);
        dispatch({ type: GOT_RANKING, ranking: data.ranking });
    } catch (error) {
        console.log('getRanking', error);
    }
}