import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'
import styles from './styles'
import { useDispatch } from 'react-redux';
import { REMOVE_NOTE } from '../../constants/actionTypes';
import XButton from '../MainContent/XButton/XButton';

const Notification = ({ sx, note }) => {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch({ type: REMOVE_NOTE, data: note })
    }
    return (
        <Box sx={sx}>
            <XButton handleClick={handleClick} size='24px' />
            <Typography variant='overline'>Notification:</Typography>
            <Typography sx={styles.text} variant='body1'>{note.msg}</Typography>
        </Box>
    )
}

export default Notification