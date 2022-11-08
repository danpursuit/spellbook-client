import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_BATTLE_ROOM } from '../../constants/actionTypes';
import XButton from '../MainContent/XButton/XButton';
import styles from './styles';

const Tabs = ({ changeRoom, handleLeaveRoom, rooms, currentRoom }) => {
    const dispatch = useDispatch();
    const games = useSelector(state => state.games.games);
    return (
        <Box sx={styles.tabs}>
            {rooms.map((roomName, index) => (
                <Box key={roomName} sx={styles.tabContainer}>
                    {index > 0
                        && (changeRoom === CHANGE_BATTLE_ROOM || !roomName.includes('-')) // dont let user close roomChat of a game, only the game itself
                        && <XButton handleClick={() => handleLeaveRoom(roomName)} />}
                    <Button sx={{ ...styles.tab, ...(roomName === currentRoom && styles.selectedTab) }}
                        key={`${roomName}-${index}`}
                        selected={roomName === currentRoom}
                        variant={roomName === currentRoom ? 'contained' : 'contained'}
                        color={roomName === currentRoom ? 'menu' : 'menuDark'}
                        onClick={() => dispatch({ type: changeRoom, roomName })}
                        disableElevation
                    >
                        {(changeRoom === CHANGE_BATTLE_ROOM && index > 0) ?
                            <Box>
                                <Typography>{games[roomName].matchType.toUpperCase()}</Typography>
                                <Typography>{games[roomName].name}</Typography>
                            </Box>
                            :
                            (roomName.includes('-') ?
                                <Box>
                                    <Typography>{games[roomName].matchType.toUpperCase()}</Typography>
                                    <Typography>{games[roomName].name}</Typography>
                                </Box> : roomName)
                        }
                    </Button>
                </Box>
            ))
            }
        </Box >
    )
}

export default Tabs