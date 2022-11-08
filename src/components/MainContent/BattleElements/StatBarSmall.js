import { Box, CircularProgress } from '@mui/material'
import React, { useEffect } from 'react'
import utils from '../../../utils'
import styles from './styles'

const bgColors = {
    health: '#ffaaaa',
    mana: '#aaaaff',
    divinity: '#c0a0c0',
    shield: '#222222',
}
const barColors = {
    health: '#ff0000',
    mana: '#0000ff',
    divinity: '#800080',
    shield: '#88feff',
}

const StatBarSmall = ({ isEnemy, val, maxVal, barType, transition, ts }) => {
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
        <Box sx={{ ...styles.statBar, ...styles.statBarSmall, ...styles.statBarOuter, justifyContent, backgroundColor: bgColor }} >
            <Box sx={{ ...styles.statBar, ...styles.statBarSmall, width: `${Math.ceil(val / maxVal * 100)}%`, backgroundColor: barColor, justifyContent }}>
            </Box>
        </Box >
    )
}

export default StatBarSmall