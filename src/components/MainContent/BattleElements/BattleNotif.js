import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import styles from './styles'
import colors from '../../../constants/colors'
import CastLogic from '../../../gameLogic/CastLogic'
import mechanics from '../../../constants/mechanics.json'

const nameShield = (shield) => {
    if (shield >= 100)
        return 'impenetrable'
    if (shield >= 90)
        return 'divine'
    if (shield >= 60)
        return 'heavy'
    if (shield >= 30)
        return 'medium'
    return 'light'
}


const BattleNotif = ({ notif, ts, data }) => {
    const [progress, setProgress] = React.useState(0)
    useEffect(() => {
        if (progress >= 100) return;
        if (notif.actionTime + notif.castTime < ts) {
            setProgress(100);
            return;
        }

        setProgress(Math.floor((ts - notif.actionTime) / (notif.castTime) * 100));
    }, [notif, ts])
    const progressColor = () => {
        if (progress < 100) return '#edf100';
        if (ts - notif.actionTime - notif.castTime > 400) return '#00fa00';
        if (Math.floor((ts - notif.actionTime - notif.castTime) / 100) % 2 === 0) return '#00fa00';
        return '#00efdf';
    }
    const getNotifText = () => {
        if (notif.moveName) {
            return (
                <Box sx={styles.notif}><b>{notif.username.toUpperCase()}</b>&nbsp;{notif.action}&nbsp;<b>{notif.moveName.toUpperCase()}</b>!
                    <Box sx={styles.notifProgress}>
                        <Box sx={{ ...styles.notifProgressInner, width: `${progress}%`, backgroundColor: progressColor() }}></Box>
                    </Box>
                </Box>)
        } else if (notif.type === 'statChange') {
            return (<Box sx={styles.notif}>{notif.username.toUpperCase()}'s&nbsp;{colors.statSpan(notif.stat, notif.stat, 'bold')}&nbsp;{notif.prev < notif.post ? 'rose' : (notif.prev === notif.post ? 'stayed the same' : 'fell')}! ({notif.prev} → {notif.post})</Box>)
        } else if (notif.type === 'gainPassive') {
            let meetsRequirements = true;
            if (notif.passive.requirements) {
                meetsRequirements = CastLogic.playerMeetsRequirements(
                    data.p1.username === notif.username ? data.p1 : data.p2,
                    { requirements: notif.passive.requirements }
                ).res;
            }
            return (meetsRequirements ?
                <Box sx={styles.notif}>{notif.username.toUpperCase()} {notif.passive.verb} <span style={{ fontStyle: 'italic' }}>&nbsp;{notif.passive.name}</span>&nbsp;({notif.passive.description})</Box> :
                <Box sx={styles.notif}>{notif.username.toUpperCase()} {notif.passive.verb} <span style={{ fontStyle: 'italic' }}>&nbsp;{notif.passive.name}</span>&nbsp;({notif.passive.alt.description})</Box>)
        } else if (notif.type === 'Physical Damage') {
            return (<Box sx={styles.notif}>{notif.username.toUpperCase()} {notif.verb} {notif.target.toUpperCase()} for&nbsp;
                {colors.statSpan(mechanics.stat.attack, Math.round(notif.physicalDamageFromAttack), 'bold')}
                {notif.physicalDamageFromDivinity > 0 && <span>&nbsp;</span>}
                {notif.physicalDamageFromDivinity > 0 && colors.statSpan(mechanics.stat.divinity, ` + ${Math.round(notif.physicalDamageFromDivinity)}`, 'bold')}
                &nbsp;physical damage!
                {notif.shieldedDamage > 0 && <span style={{ display: 'flex', color: colors.statColor(mechanics.stat.shieldDamage), fontWeight: 'bold' }}>&nbsp;(
                    {notif.shieldBreak && <Box sx={styles.shieldBreakIcon}></Box>}
                    <Box sx={{ ...(styles.shieldIcon) }}></Box>
                    &nbsp;
                    {Math.round(notif.shieldedDamage)})
                </span>}
            </Box>)
        } else if (notif.type === mechanics.effectType.magicalDamage) {
            return (<Box sx={styles.notif}>{notif.username.toUpperCase()} {notif.verb} {notif.target.toUpperCase()} for&nbsp;
                {colors.statSpan(mechanics.stat.psyche, Math.round(notif.magicalDamageFromPsyche), 'bold')}
                {notif.magicalDamageFromDivinity > 0 && <span>&nbsp;</span>}
                {notif.magicalDamageFromDivinity > 0 && colors.statSpan(mechanics.stat.divinity, ' + ' + Math.round(notif.magicalDamageFromDivinity), 'bold')}
                &nbsp;magical damage!
                {notif.shieldedDamage > 0 && <span style={{ display: 'flex', color: colors.statColor(mechanics.stat.shieldDamage), fontWeight: 'bold' }}>&nbsp;(
                    {notif.shieldBreak && <Box sx={styles.shieldBreakIcon}></Box>}
                    <Box sx={{ ...(styles.shieldIcon) }}></Box>
                    &nbsp;
                    {Math.round(notif.shieldedDamage)})
                </span>}
            </Box>)
        } else if (notif.type === mechanics.effectType.shield) {
            return (<Box sx={styles.notif}>
                {colors.statSpan(notif.alignment, mechanics.deity[notif.alignment], 'bold')}
                &nbsp;envelops {notif.username.toUpperCase()} in a {nameShield(notif.shield)}&nbsp;({Math.round(notif.shield)}%) shield!
                <span style={{ display: 'flex', color: colors.statColor(mechanics.stat.shieldDamage), fontWeight: 'bold' }}>&nbsp;(
                    <Box sx={{ ...(styles.shieldIcon) }}></Box>
                    →{notif.shieldHealth} HP)
                </span>
            </Box>)
        } else if (notif.type === mechanics.effectType.gainStatus) {
            return (<Box sx={styles.notif}>{notif.username.toUpperCase()} is <span style={{ fontStyle: 'italic' }}>&nbsp;{mechanics.statusType[notif.name].description}</span>!</Box>)
        } else if (notif.type === mechanics.effectType.recoil) {
            return (<Box sx={styles.notif}>{notif.username.toUpperCase()} takes {Math.round(notif.recoilDamage)} recoil damage!</Box>)
        } else if (notif.type === mechanics.effectType.heal) {
            return (<Box sx={styles.notif}>{notif.username.toUpperCase()} recovered {Math.round(notif.healAmount)} health.</Box>)
        } else if (notif.type === mechanics.effectType.restoreMana) {
            return (<Box sx={styles.notif}>{notif.username.toUpperCase()} restored {Math.round(notif.manaAmount)} mana.</Box>)
        } else if (notif.type === mechanics.effectType.dropShield) {
            return (<Box sx={styles.notif}>{notif.username.toUpperCase()}'s shield faded.</Box>)
        } else if (notif.type === 'Steal Gold') {
            return (<Box sx={styles.notif}>{notif.username.toUpperCase()}  stole&nbsp;{colors.statSpan('gold', Math.round(notif.goldStolen))}&nbsp;gold from {notif.target.toUpperCase()}!</Box>)
        } else if (notif.type === 'Burn Mana') {
            return (<Box sx={styles.notif}>{notif.username.toUpperCase()}  burns {notif.target.toUpperCase()} for&nbsp;{colors.statSpan(mechanics.stat.mana, Math.round(notif.burnAmount), 'bold')}&nbsp;mana!</Box>)
        } else if (notif.type === 'gameOver') {
            if (notif.tie) {
                return (<Box sx={{ ...styles.notif, ...styles.gameOver }}>{notif.description}</Box>)
            } else {
                return (<Box sx={{ ...styles.notif, ...styles.gameOver }}>{notif.winnerUsername.toUpperCase()} wins! {notif.description}</Box>)
            }
        } else {
            return (<Box sx={styles.notif}>{notif.username.toUpperCase()}</Box>)
        }
    }
    return (<>{getNotifText()}</>)
}

export default BattleNotif