import { Box, Button } from '@mui/material'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useContext } from 'react';
import { CHANGE_CHAR_UP, CHANGE_CHAR_DOWN, NEW_NOTE, CHANGE_BATTLE_ROOM } from '../../../constants/actionTypes';
import { WebSocketContext } from '../../../WebSocket';
import GameSelect from './GameSelect';
import styles from './styles'
import SpriteDisplay from './SpriteDisplay';

const playerTypes = {
    cpu: 'cpu',
    human: 'human'
}

const cpuTypes = {
    tutorial: 0,
    level1: 1,
    level2: 2,
}
const humanTypes = {
    casual: 0,
    ranked: 1,
}

const CharacterSelect = ({ char, findingGame, locations }) => {
    const dispatch = useDispatch();
    const ws = useContext(WebSocketContext);
    const [theatreMode, setTheatreMode] = useState(false);
    const charStyles = char.characterSelectStyles;
    const [bgLoaded, setBgLoaded] = useState({});
    const profile = useSelector(state => state.auth.profile);
    const [battleSearch, setBattleSearch] = useState({
        showBattleButt: false,
        mouseOut: true,
        playerType: playerTypes.cpu,
        cpuType: cpuTypes.tutorial,
        humanType: humanTypes.casual,
    })
    const requestGame = () => {
        if (findingGame) return;
        if (locations.battleRooms.length > 1) {
            // send notification saying you cannot have more than one active game
            dispatch({ type: NEW_NOTE, data: { msg: 'Already in game!' } })
            dispatch({ type: CHANGE_BATTLE_ROOM, roomName: locations.battleRooms[1] })
            return;
        }
        // if player has not chosen name, send notification
        if (!profile) {
            dispatch({ type: NEW_NOTE, data: { msg: 'Please choose a name!' } })
            return;
        }
        const vsCpu = battleSearch.playerType === playerTypes.cpu;
        const ranked = battleSearch.playerType === playerTypes.human ? battleSearch.humanType : battleSearch.cpuType;
        const playerData = {
            char: char.name,
        }
        ws.findGame({ vsCpu, ranked, playerData });
    }
    // manage background image loading
    useEffect(() => {
        if (char.bg && !bgLoaded[char.bg]) {
            const img = new Image();
            img.src = char.bg;
            img.onload = () => {
                setBgLoaded(bgLoaded => {
                    return { ...bgLoaded, [char.bg]: true }
                })
            }
        }
    }, [charStyles])
    return (
        <Box sx={{
            ...styles.container,
            ...((char && char.bg && bgLoaded[char.bg]) ? charStyles.container : {}),
            ...(theatreMode && {
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            })
        }}
        >
            <Box sx={styles.containerInner}>
                {/* character select title
                 currently does not do anything, but may add theatre mode in the future */}
                <Button sx={styles.button} color='primary' variant='contained' aria-label='theatre mode'
                // onMouseEnter={() => setTheatreMode(true)}
                // onMouseLeave={() => setTheatreMode(false)}
                >Character Select</Button>

                {/* display the matchmaking page if showBattleButt, otherwise
                display the character sprite */}
                {battleSearch.showBattleButt ?
                    <GameSelect battleSearch={battleSearch} findingGame={findingGame} playerTypes={playerTypes} cpuTypes={cpuTypes} humanTypes={humanTypes} setBattleSearch={setBattleSearch} requestGame={requestGame} /> :
                    <SpriteDisplay char={char} bgLoaded={bgLoaded} setBattleSearch={setBattleSearch} charStyles={charStyles} />}

                {/* character select bar */}
                <Box sx={styles.bar}> <Button sx={styles.button} color='primary' variant='contained' aria-label='previous character' onClick={() => dispatch({ type: CHANGE_CHAR_DOWN })} ><ArrowLeftIcon /></Button> <Button color='primary' variant='contained' aria-label='change character' sx={{ ...styles.button, ...styles.name }}>{char.fullName}</Button> <Button sx={styles.button} color='primary' variant='contained' aria-label='next character' onClick={() => dispatch({ type: CHANGE_CHAR_UP })} ><ArrowRightIcon /></Button> </Box>
            </Box>
        </Box >
    )
}

export default CharacterSelect