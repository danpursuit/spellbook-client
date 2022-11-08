import { Box, Button, Input, InputLabel, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../actions/auth';
import styles from './styles'

// ForfeitScreen is a popup overlay that lets user pick a name, and enter password if name is attached to a password
const ChooseName = ({ setShowPrompt }) => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const attemptLogin = (e) => {
        e.preventDefault();
        dispatch(signin({ username, password }));
    }
    return (
        <Box sx={styles.float} onClick={() => setShowPrompt(false)}>
            <Box sx={styles.prompt} onClick={(e) => e.stopPropagation()}>
                <form onSubmit={attemptLogin}>
                    <Box sx={styles.promptInner}>
                        {auth.requirePass && (auth.wrongPass ?
                            <Typography variant="h6">Incorrect password</Typography> :
                            <Typography variant="h6">That username is already associated with a password</Typography>)}
                        <Typography>Username:</Typography>
                        <Input
                            sx={styles.input}
                            placeholder='Enter Name'
                            value={username}
                            disabled={auth.requirePass}
                            onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9$-_]+/gi, '').slice(0, 16))}
                            autoFocus
                            disableUnderline
                        />
                        {auth.requirePass && <><Typography>Password:</Typography><Input
                            sx={styles.input}
                            placeholder='Password'
                            value={password}
                            type='password'
                            autoFocus
                            onChange={(e) => setPassword(e.target.value.slice(0, 16))}
                            disableUnderline
                        /></>}
                        <Button
                            fullWidth
                            variant='contained' color='primary'
                            disabled={auth.requirePass && !password}
                            // disabled={!username || username.length < 3 || (auth.requirePass && !password)}
                            type='submit'
                            sx={{ marginTop: 2 }}
                        >Enter</Button>
                        <Button fullWidth
                            variant='outlined' color='primary' onClick={() => setShowPrompt(false)}>Cancel</Button>
                    </Box>
                </form>
            </Box>
        </Box>
    )
}

export default ChooseName