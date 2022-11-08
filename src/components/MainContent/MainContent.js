import { Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { CHAT_HOME, HOME } from '../../constants/roomNames';
import Battle from './Battle';
import Chatroom from './Chatroom/Chatroom';
import Home from './Home';
import JoinChat from './JoinChat';
import charData from '../../characters/charData';
import styles from './styles';

// MainContent is the main content of the app, which changes depending on the location state
// The left side is either a CharacterSelect(Home), or a Battle
// The right side is either a Wecome Screen(JoinChat), or a Chatroom
const MainContent = () => {
    const locations = useSelector(state => state.locations);
    const games = useSelector(state => state.games);
    const profile = useSelector(state => state.auth.profile);
    const charState = useSelector(state => state.char);
    const [char, setChar] = useState(charData.data[charState.all[charState.currentIdx]]);
    return (
        <Box sx={styles.main}>
            {locations.currentBattle === HOME ?
                <Home locations={locations} charState={charState} char={char} setChar={setChar} /> :
                <Battle ts={games.ts} gameId={locations.currentBattle} data={games.games[locations.currentBattle]} local={games.local[locations.currentBattle]} profile={profile} />
            }
            {locations.currentChat === CHAT_HOME ?
                <JoinChat /> :
                <Chatroom roomName={locations.currentChat} char={char} />
            }
        </Box>
    )
}

export default MainContent