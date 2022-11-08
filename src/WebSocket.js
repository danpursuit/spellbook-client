import React, { createContext } from 'react'
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_GAME_TO_CHAT_ROOM, REMOVE_GAME_FROM_CHAT_ROOM, GAME_STEP, GAME_OVER, GAME_UPDATE, GAME_NOTIF, CLIENT_CAST_MOVE, FINDING_GAME, JOIN_BATTLE_ROOM, JOIN_CHAT_ROOM, REMOVE_USER_FROM_CHAT_ROOM, ADD_USER_TO_CHAT_ROOM, UPDATE_CHAT_LOG, LEAVE_CHAT_ROOM, LEAVE_BATTLE_ROOM, NEW_NOTE, NEW_CHALLENGER } from './constants/actionTypes';
import baseURL from './constants/url';
const WebSocketContext = createContext(null)

export { WebSocketContext }

// The websocket provider is used by React components to communicate with the server
// The actions provided involve connection, chat room actions, or game actions

// WebSocket.js implementation from https://www.pluralsight.com/guides/using-web-sockets-in-your-reactredux-app

export default ({ children }) => {
    let socket;
    let localUpdate;
    let ws;

    const dispatch = useDispatch();

    const castMove = (gameId, player, move) => {
        // send move to server
        socket.emit("gameAction", gameId, { username: player.username, command: move.command, moveName: move.name });

        // locally update game state before server responds
        dispatch({ type: CLIENT_CAST_MOVE, gameId, player, move });
    }

    // chat room
    const joinRoom = ({ roomName, profile }) => {
        if (profile) {
            verifyUser({ profile });
        }
        socket.emit("joinRoom", roomName);
    }
    const leaveRoom = ({ roomName }) => {
        socket.emit("leaveRoom", roomName);
        dispatch({ type: LEAVE_CHAT_ROOM, roomName });
    }
    const sendRoomMessage = ({ roomName, message }) => {
        socket.emit("sendRoomMessage", roomName, message);
    }

    // battle room
    const findGame = ({ vsCpu, ranked, playerData }) => {
        dispatch({ type: FINDING_GAME });
        socket.emit("findGame", vsCpu, ranked, playerData);
    }
    const leaveGame = ({ roomName }) => {
        socket.emit("leaveRoom", roomName);
        dispatch({ type: LEAVE_BATTLE_ROOM, roomName });
        dispatch({ type: LEAVE_CHAT_ROOM, roomName });
    }
    const challengePlayerToFriendly = ({ playerData, opponent }) => {
        socket.emit("challengePlayerToFriendly", playerData, opponent);
    }
    const acceptChallenge = ({ challengerName, playerData }) => {
        socket.emit("acceptChallenge", playerData, challengerName);
    }
    const declineChallenge = (challengerName) => {
        socket.emit("declineChallenge", challengerName);
    }
    const spectateGame = ({ roomName }) => {
        socket.emit("spectateGame", roomName);
    }
    const rejoinGame = (game) => {
        dispatch({ type: JOIN_BATTLE_ROOM, game });
        joinRoom({ roomName: game.id });
    }

    const verifyUser = ({ profile }) => {
        // pass rest token to server; authenticate socket
        socket.emit("verifyUser", profile.result.username, profile.token);
    }
    const logout = () => {
        socket.emit("logout");
    }

    if (!socket) {
        console.log('connecting');
        socket = io.connect(baseURL);

        socket.on('disconnect', () => {
            console.log('disconnected?');
            // clear localUpdate on disconnect
            if (localUpdate) {
                clearInterval(localUpdate);
            }
        })
        // set a timer to locally update the game state
        localUpdate = setInterval(() => {
            dispatch({ type: GAME_STEP });
        }, 1000 / 30);

        socket.on("init", (msg) => {
            console.log('init:', msg);
        })

        //chat
        socket.on('roomData', (data) => {
            // console.log('roomData', data);
            dispatch({ ...data, type: JOIN_CHAT_ROOM })
        })
        socket.on('userJoined', (data) => {
            dispatch({ ...data, type: ADD_USER_TO_CHAT_ROOM })
        })
        socket.on('userLeft', (data) => {
            dispatch({ ...data, type: REMOVE_USER_FROM_CHAT_ROOM })
        })
        socket.on('newRoomMessage', ({ id, username, msg, roomName, ...messageData }) => {
            dispatch({ type: UPDATE_CHAT_LOG, id, username, msg, roomName, ...messageData })
        })
        socket.on('newRoomGame', ({ roomName, game }) => {
            dispatch({ type: ADD_GAME_TO_CHAT_ROOM, roomName, game })
        })
        socket.on('removeRoomGame', ({ roomName, gameId }) => {
            dispatch({ type: REMOVE_GAME_FROM_CHAT_ROOM, roomName, gameId })
        })

        //game
        socket.on('gameFound', (game) => {
            dispatch({ type: JOIN_BATTLE_ROOM, game });
            dispatch({ type: NEW_NOTE, data: { msg: 'Game found!' } });
            joinRoom({ roomName: game.id });
        })
        socket.on('openGames', (gameIds) => {
            gameIds.forEach(game => {
                rejoinGame(game);
            })
        })
        socket.on('gameUpdate', ({ roomName, update }) => {
            // console.log('game update', roomName, update);
            dispatch({ type: GAME_UPDATE, update, gameId: roomName });
        })
        socket.on('gameNotif', ({ roomName, notif }) => {
            dispatch({ type: GAME_NOTIF, notif, gameId: roomName });
            if (notif.type === 'gameOver') {
                dispatch({ type: GAME_OVER, roomName });
            }
        })
        socket.on('friendlyChallengeFail', (msg) => {
            dispatch({ type: NEW_NOTE, data: { msg } });
        })
        socket.on('friendlyChallengeRcv', (challengerName) => {
            // console.log('challenge received', challengerName);
            dispatch({ type: NEW_CHALLENGER, challengerName });
        })


        //generic
        socket.on('fail', (msg) => {
            console.log('fail from server', msg);
        })
        socket.on('success', (msg) => {
            console.log('success from server', msg);
        })

        ws = {
            socket,
            sendRoomMessage,
            joinRoom,
            leaveRoom,
            verifyUser,
            logout,
            findGame,
            castMove,
            leaveGame,
            challengePlayerToFriendly,
            acceptChallenge,
            declineChallenge,
            spectateGame,
        }
    }

    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    )
}