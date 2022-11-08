import React, { useEffect, useState } from 'react'
import styles from './styles'
import { Box, Grid, Input } from '@mui/material'

import PlayerContainer from './BattleElements/PlayerContainer'
import CommandInput from './BattleElements/CommandInput'
import Narration from './BattleElements/Narration'
import Clock from './BattleElements/Clock'


// Battle renders the current state of the battle, which consists of
// - two PlayerContainers to display players/stats/animations
// - a Narration component which maintains a log of the battle
// - a CommandInput to allow the player to enter commands (if they are not a spectator)
const Battle = ({ data, profile, gameId, ts, local }) => {
    const [players, setPlayers] = useState({
        p1: null,
        p2: null,
        spectator: true,
        local1: null,
        local2: null,
    })
    const [avatarsLoaded, setAvatarsLoaded] = useState({})
    const refs = {
        p1: React.createRef(),
        p2: React.createRef(),
    }
    useEffect(() => {
        if (profile && data.p1 && data.p2) {
            if (profile.result.username === data.p1.username) {
                setPlayers({ p1: data.p1, p2: data.p2, local1: 'p1', local2: 'p2', spectator: false });
                return;
            } else if (profile.result.username === data.p2.username) {
                setPlayers({ p1: data.p2, p2: data.p1, local1: 'p2', local2: 'p1', spectator: false });
                return;
            }
        }
        setPlayers({ p1: data.p1, p2: data.p2, local1: 'p1', local2: 'p2', spectator: true });
    }, [data, profile, data?.p1, data?.p2, ts])
    // in a pinch to get rerenders, use:
    // ...Object.values(data?.p1), ...Object.values(data?.p2)]);
    return (
        <Box sx={{ ...styles.left, ...styles.battle }}>
            {data.startTs && <Clock ms={ts - data.startTs} />}
            <PlayerContainer ts={ts} isEnemy={true} data={players.p2} avatarsLoaded={avatarsLoaded} setAvatarsLoaded={setAvatarsLoaded} playerLocal={local[players.local2]} opponentLocal={local[players.local1]} playerRef={refs.p2} opponentRef={refs.p1} matchType={data.matchType} gameIsOver={data.gameIsOver} />
            <PlayerContainer ts={ts} isEnemy={false} data={players.p1} avatarsLoaded={avatarsLoaded} setAvatarsLoaded={setAvatarsLoaded} playerLocal={local[players.local1]} opponentLocal={local[players.local2]} playerRef={refs.p1} opponentRef={refs.p2} matchType={data.matchType} gameIsOver={data.gameIsOver} />
            <Narration gameId={gameId} ts={ts} data={data} />
            {!players.spectator && data && !data.gameIsOver && <CommandInput player={players.p1} opponent={players.p2} gameId={gameId} ts={ts} />}
        </Box>
    )
}

export default Battle