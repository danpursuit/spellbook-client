import React, { useEffect, useState } from 'react'
import styles from './styles'
import { Box } from '@mui/material'
import CharacterSelect from './CharacterSelect/CharacterSelect'
import StatsPanel from './StatsPanel/StatsPanel'
import { useSelector } from 'react-redux';

import charData from '../../characters/charData';

const Home = ({ locations, char, setChar, charState }) => {
    const games = useSelector(state => state.games);
    const ranking = useSelector(state => state.auth.ranking);
    useEffect(() => {
        setChar(charData.data[charState.all[charState.currentIdx]]);
    }, [charState.currentIdx]);

    return (
        <Box sx={styles.left}>
            <CharacterSelect char={char} findingGame={games.findingGame} locations={locations} />
            <StatsPanel char={char} ranking={ranking} />
        </Box>
    )
}

export default Home