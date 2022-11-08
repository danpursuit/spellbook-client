import { Box, CircularProgress } from '@mui/material'

import React from 'react'
import styles from './styles'
import utils from '../../../utils'

// Unlike stat bars, displaying gold uses a number + an icon, and no statBar
const GoldBar = ({ isEnemy, val, transition, ts }) => {
    const justifyContent = 'space-between'
    const flexDirection = isEnemy ? 'row' : 'row-reverse'
    const getOpacity = (startTs, duration) => {
        if (ts < startTs) return 0
        if (ts > startTs + duration) return 0
        return 1 - (ts - startTs) / (duration)
    }
    return (
        <Box sx={{ ...styles.statBar, flexDirection, justifyContent }}>
            {transition?.ts && ts < transition.ts + transition.duration ?
                <Box sx={{ opacity: getOpacity(transition.ts, transition.duration) }}>{`(${utils.plusSign(transition.target - transition.original)})`}</Box> :
                <Box></Box>}
            <Box sx={{ display: 'flex', flexDirection }}>
                {val}
                <Box sx={{ ...styles.gold }} />
            </Box>
        </Box>
    )
}

export default GoldBar