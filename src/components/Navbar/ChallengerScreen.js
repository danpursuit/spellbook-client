import { Box, Button, Input, InputLabel, Typography, Select, MenuItem } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import React, { useContext, useState } from 'react'
import styles from './styles'
import { WebSocketContext } from '../../WebSocket';
import { CLEAR_CHALLENGER } from '../../constants/actionTypes';
import charData from '../../characters/charData';

// ChallengerScreen is a popup overlay that appears if user receives a challenge from another player
const ChallengerScreen = ({ challengerName }) => {
    const dispatch = useDispatch();
    const ws = useContext(WebSocketContext);
    const charState = useSelector(state => state.char);
    const [charIdx, setCharIdx] = useState(charState.currentIdx);
    const idxToFullname = (idx) => {
        return charData.data[charState.all[idx]].fullName;
    }
    const idxToShortname = (idx) => {
        return charData.data[charState.all[idx]].name;
    }
    return (
        <Box sx={styles.float} onClick={(e) => e.stopPropagation()}>
            <Box sx={{ ...styles.prompt, ...styles.challengerScreen }} onClick={(e) => e.stopPropagation()}>
                <Typography>{challengerName.toUpperCase()} is challenging you to a friendly battle!</Typography>
                <Select value={idxToShortname(charIdx)} onChange={(e) => setCharIdx(charState.all.indexOf(e.target.value))} fullWidth>
                    {charState.all.map((char, idx) => {
                        return <MenuItem key={idx} value={char}>{idxToFullname(idx)}</MenuItem>
                    })}
                </Select>
                <Button
                    fullWidth
                    variant='contained' color='primary'
                    onClick={() => {
                        const playerData = {
                            char: idxToShortname(charIdx),
                        }
                        ws.acceptChallenge({ challengerName, playerData });
                        dispatch({ type: CLEAR_CHALLENGER });
                    }}
                >Accept</Button>
                <Button fullWidth
                    variant='outlined' color='primary' onClick={() => {
                        ws.declineChallenge(challengerName);
                        dispatch({ type: CLEAR_CHALLENGER });
                    }}>Decline</Button>
            </Box>
        </Box>
    )
}

export default ChallengerScreen;