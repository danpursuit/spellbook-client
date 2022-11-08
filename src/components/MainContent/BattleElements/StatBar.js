import { Box, CircularProgress } from '@mui/material'
import React, { useEffect } from 'react'
import utils from '../../../utils'
import styles from './styles'

export const barTypes = {
    health: 'health',
    mana: 'mana',
    divinity: 'divinity',
    shield: 'shield',
}
const bgColors = {
    health: '#ffaaaa',
    mana: '#aaaaff',
    divinity: '#c0a0c0',
}
const barColors = {
    health: '#ff2000',
    mana: '#4000ff',
    divinity: '#ffff99',
}

// Display a stat bar, with a number and a bar
// Provide a brief transition when the stat changes
const StatBar = ({ isEnemy, val, maxVal, barType, transition, ts }) => {
    const justifyContent = isEnemy ? 'flex-end' : 'flex-start'
    const flexDirection = isEnemy ? 'row' : 'row-reverse'
    const bgColor = bgColors[barType]
    const barColor = barColors[barType]
    const getOpacity = (startTs, duration) => {
        if (ts < startTs) return 0
        if (ts > startTs + duration) return 0
        return 1 - (ts - startTs) / (duration)
    }
    return (
        <Box sx={{ ...styles.statBar, ...styles.statBarOuter, justifyContent, backgroundColor: bgColor }} >
            <Box sx={{ ...styles.statBar, width: `${Math.ceil(val / maxVal * 100)}%`, backgroundColor: barColor, justifyContent }}>
            </Box>
            <Box sx={{ ...styles.statBarText, flexDirection }}>
                {transition?.ts && ts < transition.ts + transition.duration ?
                    <Box sx={{ opacity: getOpacity(transition.ts, transition.duration) }}>{`(${utils.plusSign(transition.target - transition.original)})`}</Box> :
                    <Box></Box>}
                <Box sx={{}}>{Math.round(val)} / {Math.round(maxVal)}</Box>
            </Box>
        </Box >
    )
}

export default StatBar