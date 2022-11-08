import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import styles from './styles'

// Display the name of each user in the lobby, and allow for friendly challenge when clicked
const NameDisplay = ({ user, nameStyle, selectedUser, setSelectedUser, challengeOpponent }) => {
    return (
        <Box
            sx={styles.nameContainer}
            onClick={(e) => { setSelectedUser(user.username); e.stopPropagation(); }}
        >
            <Typography variant='body2' onClick={() => console.log(user)}
                sx={{ ...styles.name, ...nameStyle(user.username) }} key={`${user.username}_${user.ts}`}>{user.username}</Typography>
            {selectedUser === user.username &&
                <Box sx={styles.selectedUserOuter}>
                    <Box sx={styles.selectedUser}>
                        <Typography>{user.username.toUpperCase()}</Typography>
                        <Button variant='contained' size='small' onClick={() => challengeOpponent(user.username)}>Challenge</Button>
                    </Box>
                </Box>}
        </Box>
    )
}

export default NameDisplay