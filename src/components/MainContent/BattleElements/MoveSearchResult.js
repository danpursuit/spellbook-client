import { Box, Typography } from '@mui/material'
import React from 'react'

import styles from './styles'
import CastLogic, { Fail } from '../../../gameLogic/CastLogic'

const CostBox = ({ costType, amount }) => {
    return (
        <Box sx={styles.costBox}>
            <Typography sx={styles.costText}>{amount}</Typography>
            <Box sx={{ ...styles.costIcon, ...styles['cost' + costType] }} />
        </Box>
    )
}

// Used by CommandInput to display a move, whether it can be casted, etc.
const MoveSearchResult = ({ move, index, search, player, ts, border }) => {
    const [req, setReq] = React.useState({ res: false, reason: null, progress: null, reasonMsg: null, styles: null });
    React.useEffect(() => {
        if (move && player) {
            const castInfo = CastLogic.playerCanCast(player, move, false);
            let progress = null;
            let reasonMsg = null;
            let styles = {};
            if (!castInfo.res) {
                if (castInfo.reason === Fail.onCooldown) {
                    const { actionTime, cdTime } = castInfo;
                    progress = Math.min(Math.floor((ts - actionTime) / (cdTime) * 100), 100);
                    reasonMsg = '';
                } else if (castInfo.reason === Fail.equipment) {
                    reasonMsg = `Equip ${castInfo.required} ${castInfo.detail}`;
                    styles.flex = '0 0 180px'
                } else if (castInfo.reason === Fail.cost) {
                    reasonMsg = `Insuff. ${castInfo.detail}`;
                    styles.flex = '0 0 180px'
                } else if (castInfo.reason === Fail.stat) {
                    reasonMsg = `Requires ${castInfo.detail} > ${castInfo.required}`;
                    styles.flex = '0 0 180px'
                } else if (castInfo.reason === Fail.alignment) {
                    reasonMsg = `${castInfo.required} alignment only`;
                    styles.flex = '0 0 180px'
                } else if (castInfo.reason === Fail.classType) {
                    reasonMsg = `${castInfo.required} class only`;
                    styles.flex = '0 0 180px'
                } else {
                    reasonMsg = castInfo.reason;
                }
            }
            setReq({ ...castInfo, progress, reasonMsg, styles });
        }
    }, [move, player, ts])
    return (
        <Box key={move.name} sx={{ ...styles.result, ...(!req.res && styles.resultMoveCannotCast) }}>
            {index === search.selectIndex && <Box sx={{ ...styles.resultHighlight, border }} />}
            <Typography sx={styles.resultNumber}>{index + 1}.</Typography>
            <Typography sx={styles.resultCommandSmall}>{move.command}</Typography>
            <Typography sx={{ ...styles.resultMove }}>{move.fullName}</Typography>
            {move.costs && Object.keys(move.costs).map((costType, i) => (
                <CostBox key={i} costType={costType} amount={move.costs[costType]} />
            ))}
            <Box sx={{ ...styles.resultStatus, ...(!req.res && styles.resultStatusCannotCast), ...req.styles }}>
                <Typography sx={{ zIndex: 3 }}>
                    {req.res ? 'READY' : req.reasonMsg}
                </Typography>
                {req.progress !== null && <Box sx={{ ...styles.resultProgress, width: `${req.progress}%` }}></Box>}
            </Box>
        </Box >
    )
}

export default MoveSearchResult