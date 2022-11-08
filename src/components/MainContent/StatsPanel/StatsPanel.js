import { Box, Typography } from '@mui/material'
import React from 'react'
import styles from './styles'

// StatsPanel is a component that displays character stats and lore in the CharacterSelect
const StatsPanel = ({ char, ranking }) => {
    return (
        <Box sx={styles.container}>
            <Box sx={styles.containerInner}>
                <Box>
                    <Typography fontWeight={500}>{char.fullName}</Typography>
                    <Typography fontWeight={300}>Alignment: {char.alignment}</Typography>
                    {ranking?.characters && ranking.characters[char.name] ? <Typography fontWeight={300}>Matches Won: {ranking.characters[char.name].rankWins + ranking.characters[char.name].casualWins}</Typography> : <Typography fontWeight={300}>Matches Won: 0</Typography>}
                </Box>
                <Box>
                    <Typography fontWeight={300}>Class: {char.classType}</Typography>
                </Box>
                <Typography fontWeight={300}>{char.lore}</Typography>
            </Box>
            <Box sx={styles.containerInner}>
                <Box sx={{ ...styles.statHexagon, ...styles[char.name + 'Hex'] }} />
                <Typography fontWeight={300}>{char.strategy()}</Typography>
            </Box>
        </Box>
    )
}

export default StatsPanel