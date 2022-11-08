import { Box, CircularProgress } from '@mui/material'
import React, { useEffect } from 'react'

import charData from '../../../characters/charData'
import styles from './styles'
import getPlayerAnimation from './playerAnimations'
import getHitAnimation from './hitAnimations'


// PlayerAvatar is the component that displays the player's character, and handles animations

const shieldOpacity = (data) => {
    return data?.stats.shieldHealth ? data.stats.shieldHealth / data.stats.shieldMaxHealth * 0.8 + 0.2 : 0
}

export const PlayerAvatar = ({ gameIsOver, name, avatarsLoaded, setAvatarsLoaded, ts, transitions, data, playerLocal, opponentLocal, playerRef, opponentRef }) => {
    const [animStyle, setAnimStyle] = React.useState({});
    const [projectileStyles, setProjectileStyles] = React.useState([]);

    const clearProjectileStyles = () => {
        setProjectileStyles([]);
    }
    useEffect(() => {
        if (playerLocal?.animation?.moveName && playerRef.current && opponentRef.current) {
            const { animation, animationLength, animationStartup, projectiles } = getPlayerAnimation(playerLocal.animation, playerRef.current?.getBoundingClientRect(), opponentRef.current?.getBoundingClientRect())
            if (animation) {
                setAnimStyle({ animationName: '' })
                setTimeout(() => {
                    setAnimStyle(animation)
                }, animationStartup);
            }
            if (projectiles) {
                setProjectileStyles(projectileStyles => [...projectileStyles, ...projectiles.map(projectile => ({ style: projectile.style, startTime: Date.now() + projectile.animationStartup, endTime: Date.now() + projectile.animationStartup + projectile.animationLength }))])
            }
        }
    }, [playerLocal?.animation, playerLocal])
    useEffect(() => {
        if (opponentLocal?.animation?.moveName && playerRef.current && opponentRef.current) {
            const { animation, animationLength, animationStartup, projectiles } = getHitAnimation(opponentLocal.animation, playerRef.current?.getBoundingClientRect(), opponentRef.current?.getBoundingClientRect())
            if (animation) {
                setAnimStyle({ animationName: '' })
                setTimeout(() => {
                    setAnimStyle(animation)
                }, animationStartup);
            }
            if (projectiles) {
                setProjectileStyles(projectileStyles => [...projectileStyles, ...projectiles.map(projectile => ({ style: projectile.style, startTime: Date.now() + projectile.animationStartup, endTime: Date.now() + projectile.animationStartup + projectile.animationLength }))])
            }
        }
    }, [opponentLocal?.animation, opponentLocal])
    const getOpacity = () => {
        if (ts - transitions.health.ts > 600) return 1;
        if (Math.floor((ts - transitions.health.ts) / 100) % 2 === 0) return 1;
        return 0;
    }
    useEffect(() => {
        //manage avatar loading
        if (name && !avatarsLoaded[name]) {
            const img = new Image();
            img.src = charData.data[name].sprite;
            img.onload = () => { setAvatarsLoaded(avatarsLoaded => { return { ...avatarsLoaded, [name]: true } }) }
        }
    }, [name])
    return (
        <Box sx={{ ...styles.avatarContainer }}>
            {(name && avatarsLoaded[name]) ?
                <Box
                    ref={playerRef}
                    sx={{ ...styles.avatar, ...animStyle, ...charData.data[name].avatarStyles.avatar, ...(transitions?.health?.ts && (transitions.health.target < transitions.health.original) && { opacity: getOpacity() }) }}>
                    <Box sx={{ ...styles.shieldBubble, ...styles.shieldLight, opacity: data?.stats.shield < 30 ? shieldOpacity(data) : 0 }}></Box>
                    <Box sx={{ ...styles.shieldBubble, ...styles.shieldMedium, opacity: (data?.stats.shield >= 30 && data.stats.shield < 60) ? shieldOpacity(data) : 0 }}></Box>
                    <Box sx={{ ...styles.shieldBubble, ...styles.shieldHeavy, opacity: (data?.stats.shield >= 60 && data.stats.shield < 90) ? shieldOpacity(data) : 0 }}></Box>
                    <Box sx={{ ...styles.shieldBubble, ...styles.shieldDivine, opacity: (data?.stats.shield >= 90 && data.stats.shield < 100) ? shieldOpacity(data) : 0 }}></Box>
                    <Box sx={{ ...styles.shieldBubble, ...styles.shieldImp, opacity: data?.stats.shield >= 100 ? shieldOpacity(data) : 0 }}></Box>

                </Box>
                :
                (<Box sx={{ ...styles.avatar, }}>
                    {!gameIsOver && <CircularProgress size={180} />}
                </Box>)}
            {projectileStyles.map((projectile, i) =>
                ts > projectile.startTime && ts < projectile.endTime && <Box key={i} sx={{ ...styles.projectile, ...projectile.style }}>
                </Box>)}
        </Box>)
}
