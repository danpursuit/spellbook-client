import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import styles from './styles'

// ForfeitScreen is a popup overlay that appears if user tries to exit a game in progress
const ForfeitScreen = ({ clearShowForfeit, showForfeit }) => {
    return (
        <Box sx={styles.float} onClick={() => clearShowForfeit()}>
            <Box sx={styles.prompt} onClick={(e) => e.stopPropagation()}>
                <Typography>Forfeit Game in Progress?</Typography>
                <Button
                    fullWidth
                    variant='outlined' color='primary'
                    sx={{ marginTop: 2 }}
                    onClick={() => showForfeit.leaveFunction()}
                >Forfeit</Button>
                <Button fullWidth
                    sx={{ marginTop: 2 }}
                    variant='contained' color='primary' onClick={() => clearShowForfeit()}>Cancel</Button>
            </Box>
        </Box>
    )
}

export default ForfeitScreen