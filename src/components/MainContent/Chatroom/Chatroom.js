import React, { useState, useEffect } from 'react'
import styles from '../styles'
import { Box } from '@mui/material'
import UsersBar from './UsersBar'
import MessageBar from './MessageBar'
import { useSelector } from 'react-redux'
import GamesBar from './GamesBar'

// Chatroom is the right side of the app, which displays a chatroom
// Chatroom can be for a Lobby or a Game, similar to Pokemon Showdown
const Chatroom = ({ roomName, char }) => {
    const locations = useSelector(state => state.locations);
    const [users, setUsers] = useState([]);
    const [games, setGames] = useState([]);
    const [userData, setUserData] = useState({});
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        setUsers(Object.values(locations.chatRoomContent[roomName].users).sort(
            (a, b) => a.username.localeCompare(b.username)
        ));
        setGames(Object.values(locations.chatRoomContent[roomName].games).sort(
            (a, b) => a.name.localeCompare(b.name)
        ));
        setUserData(
            Object.assign({}, ...locations.chatRoomContent[roomName].users.map((x) => ({ [x.username]: x })))
        )
        setMessages(locations.chatRoomContent[roomName].messages);
    }, [locations]);
    return (
        <Box sx={{ ...styles.right, ...styles.chatroom }}>
            <Box sx={styles.userAndGames}>
                <UsersBar users={users} userData={userData} char={char} />
                {!roomName.includes('-') && <GamesBar games={games} />}
            </Box>
            <MessageBar messages={messages} roomName={roomName} userData={userData} />
        </Box>
    )
}

export default Chatroom