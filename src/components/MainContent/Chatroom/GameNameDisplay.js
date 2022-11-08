import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import styles from './styles'

// Display the name of each game in the lobby, and allow for spectating when clicked
const GameNameDisplay = ({ game, selectedGame, setSelectedGame, spectateGame }) => {
    return (
        <Box
            sx={styles.nameContainer}
            onClick={(e) => { setSelectedGame(game.id); e.stopPropagation(); }}
        >
            <Typography variant='body2'
                sx={{ ...styles.name }}>{game.name}</Typography>
            {selectedGame === game.id &&
                <Box sx={styles.selectedUserOuter}>
                    <Box sx={styles.selectedUser}>
                        <Typography>{game.name.toUpperCase()}</Typography>
                        <Button variant='contained' size='small' onClick={() => spectateGame(game.id)}>Spectate</Button>
                    </Box>
                </Box>}
        </Box>
    )
}

export default GameNameDisplay