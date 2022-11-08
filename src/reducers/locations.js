import { ADD_GAME_TO_CHAT_ROOM, REMOVE_GAME_FROM_CHAT_ROOM, JOIN_CHAT_ROOM, CHANGE_BATTLE_ROOM, CHANGE_CHAT_ROOM, LEAVE_CHAT_ROOM, LEAVE_BATTLE_ROOM, ADD_USER_TO_CHAT_ROOM, REMOVE_USER_FROM_CHAT_ROOM, UPDATE_CHAT_LOG, JOIN_BATTLE_ROOM } from '../constants/actionTypes';

// manages the tabs for both the [battle/char select] and [chat rooms]
const locationReducer = (state = {
    battleRooms: ['Home'],
    currentBattle: 'Home',
    chatRooms: ['+'],
    chatRoomContent: {},
    currentChat: '+'
}, action) => {
    let chatRooms;
    let chatRoomContent;
    try {
        switch (action.type) {
            case CHANGE_BATTLE_ROOM:
                return { ...state, currentBattle: action.roomName };
            case CHANGE_CHAT_ROOM:
                return { ...state, currentChat: action.roomName };
            case JOIN_BATTLE_ROOM:
                if (!state.battleRooms.includes(action.game.id)) {
                    return { ...state, battleRooms: [...state.battleRooms, action.game.id], currentBattle: action.game.id };
                }
                return state;
            case LEAVE_BATTLE_ROOM:
                return { ...state, battleRooms: state.battleRooms.filter(room => room !== action.roomName), currentBattle: 'Home' };
            case JOIN_CHAT_ROOM: // the client received server info about a chat room
                chatRooms = state.chatRooms;
                if (!chatRooms.includes(action.roomName))
                    chatRooms.push(action.roomName);
                chatRoomContent = state.chatRoomContent;
                chatRoomContent[action.roomName] = {
                    messages: action.messages,
                    users: action.users,
                    games: action.games
                }
                return {
                    ...state,
                    currentChat: action.roomName,
                    chatRooms,
                    chatRoomContent
                }
            case LEAVE_CHAT_ROOM: // the client leaves a chat room
                // remove the room from the list of chat rooms
                chatRooms = state.chatRooms;
                const index = chatRooms.indexOf(action.roomName);
                chatRooms = chatRooms.filter(roomName => roomName !== action.roomName);
                // remove the room data from the chatRoomContent
                chatRoomContent = state.chatRoomContent;
                delete chatRoomContent[action.roomName];
                // switch to the next room
                let currentChat;
                if (index > 0)
                    currentChat = chatRooms[index - 1];
                else
                    currentChat = chatRooms[0];
                return {
                    ...state,
                    currentChat,
                    chatRooms,
                    chatRoomContent
                }
            case ADD_GAME_TO_CHAT_ROOM: // a game is added to a chat room
                chatRoomContent = state.chatRoomContent;
                if (chatRoomContent[action.roomName]) {
                    const gameIdx = chatRoomContent[action.roomName].games.findIndex(game => game.id === action.game.id);
                    if (gameIdx > -1) {
                        chatRoomContent[action.roomName].games[gameIdx] = action.game;
                    } else {
                        chatRoomContent[action.roomName].games.push(action.game);
                    }
                }
                return { ...state, chatRoomContent };
            case REMOVE_GAME_FROM_CHAT_ROOM: // a game is removed from a chat room
                chatRoomContent = state.chatRoomContent;
                if (chatRoomContent[action.roomName])
                    chatRoomContent[action.roomName].games = chatRoomContent[action.roomName].games.filter(game => game.id !== action.gameId);
                return { ...state, chatRoomContent };
            case ADD_USER_TO_CHAT_ROOM: // the client is notified someone joined a chat room
                chatRoomContent = state.chatRoomContent;
                if (chatRoomContent[action.roomName] && !chatRoomContent[action.roomName].users.find(user => user.ts === action.userData.ts && user.username === action.userData.username))
                    chatRoomContent[action.roomName].users.push(action.userData);
                return {
                    ...state,
                    chatRoomContent
                }
            case REMOVE_USER_FROM_CHAT_ROOM: // the client is notified someone left a chat room
                chatRoomContent = state.chatRoomContent;
                if (chatRoomContent[action.roomName])
                    chatRoomContent[action.roomName].users = chatRoomContent[action.roomName].users.filter(user => user.username !== action.username);

                return {
                    ...state,
                    chatRoomContent
                }
            case UPDATE_CHAT_LOG:
                chatRoomContent = state.chatRoomContent;
                chatRoomContent[action.roomName]?.messages.push({ id: action.id, username: action.username, msg: action.msg, actionTime: action.actionTime, castTime: action.castTime });
                return {
                    ...state,
                    chatRoomContent
                }
            default:
                return state;
        }
    } catch (e) {
        console.log('location error', e, action);
        return state;
    }
}

export default locationReducer;