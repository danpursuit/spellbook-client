import { Box, Button, Input, Typography } from '@mui/material'
import React from 'react'
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { changePassword } from '../../actions/auth';
import styles from './styles';
import { useSelector, useDispatch } from 'react-redux';

const emptyPassInfo = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
}

// SettingsPanel is a popup that appears when the user clicks on the settings icon in the navbar
const SettingsPanel = ({ setShowSettings, logout, ranking }) => {
    const [showChangePassword, setShowChangePassword] = React.useState(false);
    const dispatch = useDispatch();
    const [passInfo, setPassInfo] = React.useState({ ...emptyPassInfo });
    const profile = useSelector((state) => state.auth.profile);

    const handleChangePassword = (e) => {
        e.preventDefault();
        dispatch(changePassword({ ...passInfo, username: profile.result.username }));
        setShowChangePassword(false);
        setPassInfo({ ...emptyPassInfo });
    }

    return (
        <ClickAwayListener onClickAway={() => setShowSettings(false)}>
            <Box sx={styles.settings}>
                {profile ? (<>
                    <Typography variant='h6' fontWeight='300'>{profile.result.username}</Typography>
                    {ranking?.rank && <Typography variant='h6' fontWeight='300'>MMR: {ranking.rank}</Typography>}
                    {/* Set/change password button*/}
                    {showChangePassword ?
                        <form onSubmit={handleChangePassword}>
                            {!profile.guest && <Input type="password" placeholder="Old password" value={passInfo.oldPassword} onChange={(e) => setPassInfo({ ...passInfo, oldPassword: e.target.value })} />}
                            <Input type="password" placeholder="New password" value={passInfo.newPassword} onChange={(e) => setPassInfo({ ...passInfo, newPassword: e.target.value })} />
                            <Input type="password" placeholder="Confirm new password" value={passInfo.confirmPassword} onChange={(e) => setPassInfo({ ...passInfo, confirmPassword: e.target.value })} />
                            <Button sx={styles.button} variant='contained' color='primary' type='submit'>Confirm</Button>
                        </form> :
                        <Button sx={styles.button} variant='contained' color='primary' onClick={() => setShowChangePassword(true)}>
                            {profile.guest ? 'Set Password' : 'Change Password'}</Button>}


                    {/*Logout button */}
                    <Button sx={styles.button} variant='contained' color='primary'
                        onClick={logout}>Logout</Button></>)
                    : <Typography variant='h6' fontWeight='300'>Please choose name</Typography>}



            </Box>
        </ClickAwayListener >
    )
}

export default SettingsPanel