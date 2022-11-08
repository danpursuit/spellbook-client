import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import GoldBar from './GoldBar'
import StatBar, { barTypes } from './StatBar'
import StatBarSmall from './StatBarSmall'
import styles from './styles'
import mechanics from '../../../constants/mechanics.json';
import colors from '../../../constants/colors'


const StatBars = ({ ts, data, isEnemy, transitions }) => {
    return (
        <Box sx={styles.statBars}>
            <Box sx={styles.usernameBar}><Typography>{data?.username.toUpperCase()}</Typography>
                {data?.statuses.map((status, i) => (ts > status.startTime && ts < status.endTime &&
                    <Box sx={{ ...colors.statusColors[status.name], position: 'relative', opacity: ts > status.endTime - 300 ? 1 - Math.max((ts - (status.endTime - 300)) / 300, 0) : 1 }} key={i}>
                        <Box sx={{
                            ...styles.statusLoader,
                            width: `${Math.min((ts - status.startTime) / (status.endTime - status.startTime - 300) * 100, 100)}%`,
                        }} />
                        <Typography sx={styles.statusFx}>{mechanics.statusType[status.name].abbrev}</Typography>
                    </Box>))}
            </Box>
            <Box>
                <StatBar transition={transitions.health} isEnemy={isEnemy} val={data?.stats.health} maxVal={data?.stats.maxHealth} barType={barTypes.health} ts={ts} />
                <StatBarSmall transition={null} isEnemy={isEnemy} val={data?.stats.shieldHealth} maxVal={data?.stats.shieldMaxHealth} barType={barTypes.shield} ts={ts} />
            </Box>
            <StatBar transition={transitions.mana} isEnemy={isEnemy} val={data?.stats.mana} maxVal={data?.stats.maxMana} barType={barTypes.mana} />
            <StatBar transition={transitions.divinity} isEnemy={isEnemy} val={data?.stats.divinity} maxVal={100} barType={barTypes.divinity} />
            <GoldBar isEnemy={isEnemy} val={data?.stats.gold} transition={transitions.gold} ts={ts} />
        </Box>
    )
}

export default StatBars