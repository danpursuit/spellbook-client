import { Box, Button, CircularProgress, Grow, Typography, Select, MenuItem } from '@mui/material'
import React from 'react'
import styles from './styles'

// Panel for selecting a game type and opponent type
const GameSelect = ({ requestGame, battleSearch, findingGame, playerTypes, cpuTypes, humanTypes, setBattleSearch }) => {
    return (
        <Grow in={battleSearch.showBattleButt}>
            <Box sx={{ ...styles.spriteBox, ...styles.joinBattleBox }}

            >{findingGame ?
                (<><Typography variant='h4' sx={{ marginBottom: 5 }}>Finding Game...</Typography>
                    <CircularProgress size={150} />
                </>) :
                (<><Typography variant='h4'>Battle!</Typography>
                    <hr className='solid' width='100%' color='black' />
                    <Box sx={styles.joinBattleRow}
                    >
                        <Typography>Opponent Type</Typography>
                        <Select value={battleSearch.playerType}
                            onChange={(e) => setBattleSearch({ ...battleSearch, playerType: e.target.value })}>
                            <MenuItem value={playerTypes.cpu}>CPU</MenuItem>
                            <MenuItem value={playerTypes.human}>Random Player</MenuItem>
                        </Select>
                    </Box>
                    <Box sx={styles.joinBattleRow}>
                        <Typography>Match Type</Typography>
                        {battleSearch.playerType === playerTypes.cpu ?
                            (<Select value={battleSearch.cpuType}
                                onChange={(e) => setBattleSearch({ ...battleSearch, cpuType: e.target.value })}>
                                <MenuItem value={cpuTypes.tutorial}>Tutorial</MenuItem>
                                <MenuItem value={cpuTypes.level1}>Level 1</MenuItem>
                                <MenuItem value={cpuTypes.level2}>Level 2</MenuItem>
                            </Select>) :
                            (<Select value={battleSearch.humanType}
                                onChange={(e) => setBattleSearch({ ...battleSearch, humanType: e.target.value })}>
                                <MenuItem value={humanTypes.casual}>Casual</MenuItem>
                                <MenuItem value={humanTypes.ranked}>Ranked</MenuItem>
                            </Select>)}
                    </Box>
                    <Box sx={{ ...styles.joinBattleRow, ...styles.joinBattleButtonRow }}>
                        <Button variant='contained'
                            onClick={requestGame}
                        >Find Match</Button>
                        <Button variant='outlined'
                            onClick={() => setBattleSearch({ ...battleSearch, showBattleButt: false, mouseOut: false })}
                        >Cancel</Button>
                    </Box>
                </>)}
            </Box>
        </Grow>
    )
}

export default GameSelect