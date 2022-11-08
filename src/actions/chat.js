import { JOIN_CHAT_ROOM } from '../constants/actionTypes';
import * as api from '../api';

// most of chat is done through WebSocket, but this is used to request a room
export const requestRoom = ({ roomName, username }) => async (dispatch) => {
    try {
        const { data } = await api.requestRoom({ roomName, username });
        dispatch({ type: JOIN_CHAT_ROOM, data });
    } catch (error) {
        console.log('requestRoom', error);
    }
}