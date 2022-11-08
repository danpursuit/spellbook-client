import { Box, CircularProgress } from '@mui/material'
import React from 'react'
import styles from './styles'

// Display the sprite of the selected character, or a loading spinner if the sprite is not yet loaded
const SpriteDisplay = ({ char, bgLoaded, setBattleSearch, charStyles }) => {
    return ((char && char.bg && bgLoaded[char.bg]) ?
        (<Box sx={styles.spriteBox}
            onMouseEnter={() => setBattleSearch(battleSearch => {
                return { ...battleSearch, showBattleButt: battleSearch.mouseOut ? true : battleSearch.showBattleButt }
            })}
            onMouseLeave={() => setBattleSearch(battleSearch => {
                return { ...battleSearch, mouseOut: true }
            })}
        >
            <Box sx={{ ...styles.glow, ...charStyles.glow }}></Box>
            <Box sx={{ ...styles.sprite, ...charStyles.sprite }}></Box>
        </Box>) :
        (<Box sx={{ ...styles.spriteBox, ...styles.loaderBox }}>
            <CircularProgress size={180} />
        </Box>))
}

export default SpriteDisplay