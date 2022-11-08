import { Box } from '@mui/material';
import React from 'react'

import styles from './styles';

const Clock = ({ ms }) => {
    // turn ms into 00:00 format
    const formatTime = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.min(((ms % 60000) / 1000).toFixed(0), 59);
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    return (
        <Box sx={styles.clock}
        >{formatTime(ms)}</Box>
    )
}

export default Clock