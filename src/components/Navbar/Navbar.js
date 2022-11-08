import React, { useState, useEffect, useContext } from 'react'
import { AppBar, Avatar, Toolbar, Typography, Button, Box, Link } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import styles from './styles';
import Tabs from './Tabs';
import { LOGOUT, CHANGE_CHAT_ROOM, CHANGE_BATTLE_ROOM, SET_PROFILE, RESET_LOGIN_FORM, NEW_NOTE } from '../../constants/actionTypes';
import ChooseName from './ChooseName';
import { PROFILE_KEY } from '../../constants/local';
import { WebSocketContext } from '../../WebSocket';
import SettingsPanel from './SettingsPanel';
import { HOME } from '../../constants/roomNames';
import { getRanking } from '../../actions/auth';
import ForfeitScreen from './ForfeitScreen';
import ChallengerScreen from './ChallengerScreen';

// The NavBar allows user to switch tabs. It also handles global settings such as user profile and logout
const Navbar = () => {
    const [showPrompt, setShowPrompt] = useState(false); // for choosing name
    const [showForfeit, setShowForfeit] = useState({
        show: false,
        leaveFunction: () => { },
    }); // for closing battle tab while in progress
    const [showSettings, setShowSettings] = useState(false);
    const dispatch = useDispatch();
    const ws = useContext(WebSocketContext);
    const profile = useSelector((state) => state.auth.profile);
    const ranking = useSelector(state => state.auth.ranking);
    const locations = useSelector(state => state.locations);
    const battleRooms = useSelector(state => state.locations.battleRooms);
    const games = useSelector(state => state.games.games);
    const challenger = useSelector(state => state.games.challenger);
    const gamesPlayed = useSelector(state => state.games.gamesPlayed);
    useEffect(() => {
        if (!showPrompt) {
            dispatch({ type: RESET_LOGIN_FORM })
        }
    }, [showPrompt])

    // sign in from local storage
    useEffect(() => {
        dispatch({ type: NEW_NOTE, data: { msg: 'Welcome to Spellbook!' } });
        const data = JSON.parse(localStorage.getItem(PROFILE_KEY));
        if (data)
            dispatch({ type: SET_PROFILE, data });
    }, []);

    useEffect(() => {
        if (profile) {
            ws.verifyUser({ profile });
            dispatch(getRanking(profile.result.username));
        }
    }, [profile]);

    // get ranking when gamesPlayed changes
    useEffect(() => {
        if (profile) {
            // get ranking in 5 seconds so server can update
            setTimeout(() => {
                dispatch(getRanking(profile.result.username));
            }, 5000);
        }
    }, [gamesPlayed]);

    const logout = () => {
        setShowPrompt(false);
        setShowSettings(false);
        localStorage.removeItem(PROFILE_KEY);
        dispatch({ type: LOGOUT });
        ws.logout();
    }

    const clearShowForfeit = () => {
        setShowForfeit({ show: false, leaveFunction: () => { } });
    }
    const handleLeaveBattle = (roomName) => {
        if (games[roomName] && games[roomName].gameInProgress) {
            setShowForfeit({
                show: true,
                leaveFunction: () => {
                    ws.leaveGame({ roomName });
                    clearShowForfeit();
                }
            });
        } else {
            ws.leaveGame({ roomName });
        }
    }
    const handleLeaveChat = (roomName) => {
        ws.leaveRoom({ roomName });
    }

    return (
        <Box sx={styles.appBarContainer}>
            <Box sx={styles.appBar}>

                {/* Tabs on Left */}
                <Box sx={{ ...styles.battleSide, ...(locations.currentBattle !== HOME && styles.inBattle) }}>
                    <Box sx={styles.logoContainer}><Box sx={styles.textLogo}></Box></Box>
                    <Tabs rooms={locations.battleRooms} currentRoom={locations.currentBattle} changeRoom={CHANGE_BATTLE_ROOM} handleLeaveRoom={handleLeaveBattle}></Tabs>
                </Box>
                <Box sx={styles.rightSide}>
                    {/* Tabs on Right */}
                    <Tabs rooms={locations.chatRooms} currentRoom={locations.currentChat} changeRoom={CHANGE_CHAT_ROOM} handleLeaveRoom={handleLeaveChat}></Tabs>

                    {/* Sign In/Out */}
                    <Box sx={styles.settingsSide}>
                        {profile ? (
                            <Box sx={styles.user}>
                                <svg width="0" height="0">
                                    <linearGradient id="blue-gradient" x1="50%" y1="100%" x2="50%" y2="0%">
                                        <stop stopColor="rgba(35,66,213,1)" offset="0%" />
                                        <stop stopColor="rgba(35,66,213,1)" offset="70%" />
                                        <stop stopColor="rgba(31,53,167,1)" offset="100%" />
                                    </linearGradient>
                                </svg>
                                <AccountCircleIcon
                                    sx={styles.userIcon}
                                />
                                <Typography
                                    sx={styles.username} fontWeight='800'>{profile.result.username}</Typography>
                            </Box>
                        ) : (
                            <>
                                <Button sx={styles.button} variant='contained' color='primary' disabled={showPrompt}
                                    onClick={() => setShowPrompt(true)} size='small'>Choose Name</Button>
                                {showPrompt && <ChooseName setShowPrompt={setShowPrompt} />}
                            </>
                        )}
                        <Button sx={styles.icon} size='small' variant='contained' color='primary' disabled={showSettings} onClick={() => setShowSettings(true)}><SettingsIcon sx={{ height: '15px' }} /></Button>
                        {showSettings && <SettingsPanel setShowSettings={setShowSettings} logout={logout} ranking={ranking} />}
                    </Box>
                </Box>
            </Box>
            {showForfeit.show && <ForfeitScreen clearShowForfeit={clearShowForfeit} showForfeit={showForfeit} />}
            {/* tabDesk is a 4px grey bar*/}
            <Box sx={styles.tabDesk}></Box>
            {challenger && <ChallengerScreen challengerName={challenger} />}
        </Box>
    )
}

export default Navbar