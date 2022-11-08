import React, { useContext, useState } from 'react'
import styles from './styles'
import frameStyles from './BattleElements/styles';
import equipStyles from './BattleElements/equipStyles';
import spellStyles from './BattleElements/spellStyles';
import { Box, Button, Link, Tooltip, Typography } from '@mui/material'
import { WebSocketContext } from '../../WebSocket';
import { useSelector } from 'react-redux';
import GalleryDescription from './GalleryDescription';
import ViewCounter from './ViewCounter';


// JoinChat is a welcome screen with descriptions, images, and link to join Lobby
const JoinChat = () => {
    const ws = useContext(WebSocketContext);
    const profile = useSelector((state) => state.auth.profile);
    const [selected, setSelected] = useState({
        target: '',
        method: 0,
    });
    const changeSelection = (newSelect, method) => {
        // if there is no selection, set the target and method
        // if there is a selection, and the target + method is same, clear the selection
        // if there is a selection, and the method >= current method, set the target and method
        if (!selected.target) {
            setSelected({
                target: newSelect,
                method: method
            })
        } else {
            if (selected.target === newSelect && selected.method === method) {
                setSelected({
                    target: '',
                    method: 0
                })
            } else if (method >= selected.method) {
                setSelected({
                    target: newSelect,
                    method: method
                })
            }
        }
    }
    const treasure = (title, equipment, frameType = 'commonFrame') => {
        return (
            <Tooltip title={title}>
                <Box sx={{ ...frameStyles.equipFrame, ...frameStyles[frameType], ...(equipment === selected.target && { border: '1px solid purple', boxSizing: 'border-box' }) }}
                    onMouseEnter={() => changeSelection(equipment, 0)}
                    onMouseLeave={() => changeSelection('', 0)}
                    onClick={() => changeSelection(equipment, 1)}
                > <Box sx={{ ...equipStyles.default, ...equipStyles[equipment] }} /> </Box></Tooltip>
        )
    }
    const spell = (title, spellIcon, shift = null, secondName = '') => {
        return (
            <Tooltip title={title}>
                <Box sx={{ ...frameStyles.equipFrame, ...frameStyles['commonFrame'], ...((spellIcon === selected.target || (secondName && secondName === selected.target)) && { border: '1px solid purple', boxSizing: 'border-box' }) }}
                    onMouseEnter={() => changeSelection(spellIcon, 0)}
                    onMouseLeave={() => changeSelection('', 0)}
                    onClick={() => changeSelection(spellIcon, 1)}
                > <Box sx={{ ...equipStyles.default, ...spellStyles[spellIcon], ...shift }} /> </Box></Tooltip>
        )
    }
    const joinRoom = (roomName) => {
        ws.joinRoom({ roomName, profile });
    }
    return (
        <Box sx={{ ...styles.right, ...styles.joinChat }}>
            <Typography variant="h4" fontWeight='200'>Welcome!</Typography>
            <Typography variant="body2" fontWeight='200'>Welcome to Spellbook - Demo. In the land of Immersion, valiants and priests (and more to come) clash to earn gold and glory for their deities. In Spellbook, you can pilot two of Immersion's signature characters—Chaze XS, a rushdown fire warrior, and Threle, a control-based shadow priest—in a typing focused real-time strategy game. Cast spells and equip gear to beat the enemy! On the left, you can search for a match against a tutorial, CPU or random live player. You can also join the Lobby below to chat with and send friendly challenges to other players in the chat room. Make sure to choose a name first, don't be a stranger!</Typography>
            <ViewCounter />
            <Button variant='contained' onClick={() => joinRoom('Lobby')}>Join Lobby</Button>
            <Typography variant="h4" fontWeight='200'>About</Typography>
            <Typography variant="body2" fontWeight='300'>This website was built by me (Dan, <Link href='https://danpursuit.github.io/' target={'_blank'}>https://danpursuit.github.io/</Link>) using two of my passions: Javascript and Stable Diffusion. The former is a programming language that I'm still honing and fast falling in love with. It's incredible to be able to build apps like this, and I'm always learning more tools and tricks to create robust, scalable systems. The latter is an AI art tool (text2image and image2image transformer model) that's jumpstarted my career as a prompt engineer! Between Stable Diffusion, GIMP (free photoshop), and tens of hours of crafting, I've hand crafted all the assets that you'll see in Spellbook. AI art is truly a future powerhouse for indie developers and more, and I hope that this demo can inspire others to see the potential that it gives us. Here's some previews of spells and equipment that you'll have access to:</Typography>

            <Box sx={styles.hoard}>
                {treasure('Questing Dagger', 'dagger')}
                {treasure('Questing Sword', 'sword')}
                {treasure('Mystical Gauntlets', 'mystical')}
                {treasure('Blacksmiths Gloves', 'blacksmiths')}
                {treasure('Steel Chestplate', 'steelChestplate')}
                {treasure('Ceremonial Garb', 'ceremonialGarb')}
                {treasure('Gold Pendant', 'goldPendant')}
                {treasure('Hellslicer', 'hellslicer', 'rareFrame')}
                {treasure('Magmatic Barbs', 'magmaticBarbs', 'rareFrame')}
                {treasure('Eternal Flame', 'eternalFlame', 'rareFrame')}
            </Box>
            <Box sx={styles.hoard}>
                {spell('Slash', 'gashGray', { transform: 'translate(5px, 3px)' })}
                {spell('Flame Slash', 'gashRed', { transform: 'translate(5px, 3px)' })}
                {spell('Pillage', 'pillage')}
                {spell('Crimson Splinters', 'crimson')}
                {spell('Mana Burn', 'boom')}
                {spell('Hot Handed', 'fireHand')}
                {spell('Prayer - Shield', 'star', null, 'starGray')}
                {spell('Dissipate', 'starGray', null, 'star')}
                {spell('Prayer - Blast, Projectile (Shadow Alignment)', 'shadowBlastProjectile', null, 'shadowBlastExplosion')}
                {spell('Prayer - Blast, Explosion (Shadow Alignment)', 'shadowBlastExplosion', null, 'shadowBlastProjectile')}
                {spell('Drain Soul', 'drainSkull')}
                {spell('Corrupted Possessions', 'shadowEye')}
                {spell('Bleeding Heart', 'shadowHeart')}
                {spell('Prayer - Ultimatum', 'shadowDagger')}
            </Box>
            <GalleryDescription selected={selected} />
            <Box sx={{ marginBottom: 1 }}>&nbsp;</Box>
        </Box>
    )
}

export default JoinChat