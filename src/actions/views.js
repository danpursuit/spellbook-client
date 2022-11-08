import { GET_VIEWS } from '../constants/actionTypes';
import * as api from '../api';

export const addView = () => async (dispatch) => {
    try {
        const { data } = await api.addView();
        dispatch({ type: GET_VIEWS, payload: data })
    } catch (error) {
        console.log('addView', error);
    }
}
export const getViews = () => async (dispatch) => {
    try {
        const { data } = await api.getViews();
        dispatch({ type: GET_VIEWS, payload: data })
    } catch (error) {
        console.log('getViews', error);
    }
}