import { Box, Typography } from '@mui/material'
import React, { useEffect, useState, useContext } from 'react'
import ClickAwayListener from '@mui/material/ClickAwayListener';
import styles from './styles'
import { WebSocketContext } from '../../../WebSocket';
import GameNameDisplay from './GameNameDisplay'

// Display the list of games in the lobby
const GamesBar = ({ games }) => {
    const ws = useContext(WebSocketContext);
    const [selectedGame, setSelectedGame] = useState(null);

    const spectateGame = (gameId) => {
        ws.spectateGame({ roomName: gameId });
    }
    return (
        <ClickAwayListener onClickAway={() => setSelectedGame(null)}>
            <Box sx={styles.gamesBar} onClick={() => setSelectedGame(null)}>
                <Box sx={styles.userCount}>{games.length} Open Game{games.length !== 1 && 's'}</Box>
                <Box sx={{ overflow: 'scroll', flex: '1 1' }}>
                    {games.map((game, idx) => (<GameNameDisplay
                        key={idx} game={game} selectedGame={selectedGame} setSelectedGame={setSelectedGame} spectateGame={spectateGame}>
                        {game.name}
                    </GameNameDisplay>))}
                </Box>
            </Box>
        </ClickAwayListener>
    )
}

export default GamesBar