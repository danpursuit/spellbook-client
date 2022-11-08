import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'

import EquipBoxes from './EquipBoxes'
import { PlayerAvatar } from './PlayerAvatar'
import StatBars from './StatBars'
import styles from './styles'

const statsToTransition = ['health', 'mana', 'divinity', 'gold']

// Display the player's avatar, stats, and equipment
const PlayerContainer = ({ gameIsOver, matchType, isEnemy, data, avatarsLoaded, setAvatarsLoaded, ts, playerLocal, opponentLocal, playerRef, opponentRef }) => {
    // create a transition object for each stat
    const [transitions, setTransitions] = React.useState({})
    useEffect(() => {
        if (Object.keys(transitions).length > 0) return;
        const newTransitions = {}
        for (const stat of statsToTransition) {
            newTransitions[stat] = {
                original: null,
                target: null,
                ts: null,
                duration: 1000
            }
        }
        setTransitions(newTransitions)
    }, [])
    useEffect(() => {
        if (!Object.keys(transitions).length) return;
        const newTransitions = {}
        for (const stat of statsToTransition) {
            const transition = transitions[stat]
            if (transition.original === null || transition.original === undefined) {
                newTransitions[stat] = {
                    ...transition,
                    original: data?.stats[stat],
                    target: data?.stats[stat],
                }
            } else if (transition.target !== data?.stats[stat]) {
                if (transition.ts === null) {
                    // if transition does not exist, create it
                    newTransitions[stat] = {
                        ...transition,
                        target: data?.stats[stat],
                        ts,
                    }
                } else if (ts - transition.ts > transition.duration) {
                    // if transition is finished, reset transition
                    newTransitions[stat] = {
                        ...transition,
                        original: transition.target,
                        target: data?.stats[stat],
                        ts,
                    }
                } else {
                    // if transition is in progress, change the target
                    newTransitions[stat] = {
                        ...transition,
                        target: data?.stats[stat],
                    }
                }
            }
        }
        setTransitions({ ...transitions, ...newTransitions })
    }, [data?.stats.health, data?.stats.mana, data?.stats.divinity, data?.stats.gold])

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: isEnemy ? 'end' : 'start',
            mx: 1,
        }}>
            <Grid container spacing={0} sx={{
                ...styles.playerContainer,
                ...(!isEnemy ? styles.slideInRight : styles.slideInLeft),
                flexDirection: isEnemy ? 'row' : 'row-reverse',
            }}>
                <Grid item xs={4}> <PlayerAvatar gameIsOver={gameIsOver} playerRef={playerRef} opponentRef={opponentRef} playerLocal={playerLocal} opponentLocal={opponentLocal} name={data?.name} data={data} avatarsLoaded={avatarsLoaded} setAvatarsLoaded={setAvatarsLoaded} transitions={transitions} ts={ts} /> </Grid>
                {(data || !isEnemy) ? (<><Grid item xs={4}> <EquipBoxes data={data} /> </Grid>
                    <Grid item xs={4}> <StatBars ts={ts} data={data} isEnemy={isEnemy} transitions={transitions} /></Grid></>) : <Grid item xs={8} sx={{ textAlign: 'right', px: 2 }}>
                    <Typography>{matchType === 'friendly' ? 'Waiting for your friend to join...' : 'Searching for opponent...'}

                    </Typography>
                </Grid>}


            </Grid>
        </Box >
    )
}

export default PlayerContainer