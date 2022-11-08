import { Box } from '@mui/material'
import React, { useState, useContext } from 'react'
import ClickAwayListener from '@mui/material/ClickAwayListener';
import styles from './styles'
import { WebSocketContext } from '../../../WebSocket';
import NameDisplay from './NameDisplay'

// Display the list of users in the lobby
const UsersBar = ({ users, userData, char }) => {
    const ws = useContext(WebSocketContext);
    const [selectedUser, setSelectedUser] = useState(null);

    const nameStyle = (username) => {
        return { color: userData[username]?.color || '#444' }
    }
    const challengeOpponent = (opponent) => {
        const playerData = {
            char: char.name,
        }
        ws.challengePlayerToFriendly({ opponent, playerData });
    }
    return (
        <ClickAwayListener onClickAway={() => setSelectedUser(null)}>
            <Box sx={styles.usersBar} onClick={() => setSelectedUser(null)}>
                <Box sx={styles.userCount}>{users.length} User{users.length !== 1 && 's'} Online</Box>
                <Box sx={{ overflow: 'scroll', flex: '1 1' }}>
                    {users.map((user, idx) => (<NameDisplay key={idx} user={user} nameStyle={nameStyle} selectedUser={selectedUser} setSelectedUser={setSelectedUser} challengeOpponent={challengeOpponent} />))}
                </Box>
            </Box>
        </ClickAwayListener>
    )
}

export default UsersBar