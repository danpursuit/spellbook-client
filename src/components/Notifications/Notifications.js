import React, { useEffect } from 'react'
import { Box } from '@mui/material'

import styles from './styles'
import { useSelector } from 'react-redux'
import Notification from './Notification'


const Notifications = () => {
    const [curTs, setCurTs] = React.useState(Date.now());
    const [renderTimer, setRenderTimer] = React.useState(null);
    const notes = useSelector(state => state.notes.list)

    useEffect(() => {
        setRenderTimer(renderTimer => {
            if (renderTimer) clearInterval(renderTimer);
            return setInterval(() => {
                setCurTs(Date.now());
            }, 1000);
        })
    }, [])
    useEffect(() => {
        setCurTs(Date.now());
    }, [notes])
    return (
        <Box sx={styles.container}>
            {notes.filter(({ ts, lifespan }) => (curTs < ts + lifespan + 1000)).map((note, index) => <Notification sx={{
                ...styles.note, ...((curTs > note.ts + note.lifespan) && styles.noteActive
                )
            }} key={`${index}`} note={note} />)
            }
        </Box >
    )
}

export default Notifications