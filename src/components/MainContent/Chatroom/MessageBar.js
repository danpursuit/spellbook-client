import React, { useEffect } from 'react'
import { Box, Input, InputLabel, Button, Typography } from '@mui/material'
import styles from './styles'
import { WebSocketContext } from '../../../WebSocket';
import { useSelector } from 'react-redux';

// Display messages and allow for sending messages, if the user is logged in
const MessageBar = ({ messages, roomName, userData }) => {
    const profile = useSelector(state => state.auth.profile);
    const [message, setMessage] = React.useState('');
    const ws = React.useContext(WebSocketContext);
    const messagesEndRef = React.createRef()
    const containerRef = React.createRef()
    const scrollToBottom = () => {
        if (containerRef.current.scrollHeight - containerRef.current.clientHeight - containerRef.current.scrollTop < 100) {
            messagesEndRef.current?.scrollIntoViewIfNeeded({ behavior: 'smooth' })
        }
    }
    useEffect(scrollToBottom, [messages.length])
    const handleSubmit = (e) => {
        e.preventDefault();
        if (message) {
            ws.sendRoomMessage({ roomName, message });
            setMessage('');
        }
    }
    const nameStyle = (username) => {
        return { color: userData[username]?.color || '#444', fontWeight: 'bold' }
    }
    return (
        <Box sx={styles.messageBar}>
            <Box sx={styles.messageContainer} ref={containerRef}>
                {messages.map((msg) => (<Box sx={styles.msg} key={msg.id}>
                    <Typography><span style={nameStyle(msg.username)}>{msg.username}:</span> <span
                        style={{ color: msg.username === '(server)' ? '#555' : 'black' }}
                    >{msg.msg}</span></Typography>
                    {msg.actionTime && <Typography sx={styles.actionTime}>{msg.actionTime}/{msg.castTime}</Typography>}
                </Box>))}
                <div ref={messagesEndRef} />
            </Box>
            <Box sx={styles.writeMessage}>
                {profile ?
                    <form onSubmit={handleSubmit}>
                        <Box sx={styles.writeInner}>
                            <InputLabel sx={{ ...nameStyle(profile.result.username), flex: '0 0 auto' }}>{profile.result.username}:</InputLabel>
                            <Input sx={styles.input} placeholder='' autoFocus={!roomName.includes('-')} value={message} onChange={(e) => setMessage(e.target.value)} name='message'
                                disableUnderline
                                autoComplete='off' />
                            <Button type='submit' variant="contained" color="primary" >Send</Button>
                        </Box>
                    </form>
                    : <Typography variant="h6" sx={{ backgroundColor: 'yellow' }}>To send a message, please choose a name!</Typography>}
            </Box>
        </Box>
    )
}

export default MessageBar