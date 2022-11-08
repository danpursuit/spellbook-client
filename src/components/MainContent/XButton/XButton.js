import { IconButton, Box } from '@mui/material'
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import React from 'react'

import styles from './styles';

const XButton = ({ handleClick, size = '10px' }) => {
    return (
        <Box sx={styles.xContainer}>
            <IconButton className='x-butt'
                sx={{ '&:hover': { color: 'rgba(255,255,255,1)' } }}
                size='small'
                onClick={() => {
                    handleClick()
                }}
            ><DisabledByDefaultIcon sx={{ width: size, height: size }} /></IconButton>
        </Box>
    )
}

export default XButton