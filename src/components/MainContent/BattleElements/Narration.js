import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import BattleNotif from './BattleNotif'

import styles from './styles'

// Container for battle log
// Scroll to bottom when new message is added, but not if user has scrolled up
const Narration = ({ gameId, ts, data }) => {
    const notifs = useSelector(state => state.games.local[gameId].notifs)
    const messagesEndRef = React.createRef()
    const containerRef = React.createRef()
    const scrollToBottom = () => {
        if (containerRef.current.scrollHeight - containerRef.current.clientHeight - containerRef.current.scrollTop < 30) {
            messagesEndRef.current?.scrollIntoViewIfNeeded({ behavior: 'smooth' })
        }
    }
    useEffect(scrollToBottom, [notifs])
    return (
        <Box sx={styles.narration}>
            <Box sx={styles.narrationHead}>Battle Log</Box>
            <Box sx={styles.narrationEvents} ref={containerRef}>
                {notifs?.map((notif, index) => (
                    <BattleNotif key={index} notif={notif} ts={ts} data={data} />
                ))}
                <div ref={messagesEndRef} />
            </Box>
        </Box>
    )
}

export default Narration