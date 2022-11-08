import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import CastLogic, { Fail } from '../../../gameLogic/CastLogic'

import mechanics from '../../../constants/mechanics.json'
import colors from '../../../constants/colors'
import styles from './styles'

// interpret a description string, plugging in actual numbers where the description specifies
const interpret = (description, player, opponent) => {
    if (typeof description === 'string') {
        return description
    }
    const { mult, stat } = description;
    let value;
    if (stat === mechanics.stat.attack) {
        value = mult * CastLogic.calcAttack(player, description.plus);
    } else if (stat === mechanics.stat.divinity) {
        value = mult * CastLogic.calcDivinity(player, description.plus);
    } else if (stat === mechanics.stat.psyche) {
        value = mult * CastLogic.calcPsyche(player, description.plus);
    } else {
        return 'unknown';
    }
    if (description.max && value > description.max) {
        value = description.max;
    }
    if (description.min && value < description.min) {
        value = description.min;
    }
    if (description.long === false) {
        return colors.statSpan(stat, value)
    }
    return colors.statSpan(stat, `${value}${description.suffix !== undefined ? description.suffix : ''} (${mult}x ${stat})${description.suffix2 !== undefined ? description.suffix2 : ''}`)
}

// InfoBar is the bottom bar that displays information about the current selected move
const InfoBar = ({ selection, player, opponent }) => {
    const [description, setDescription] = React.useState({
        text: 'No results',
        flavor: ''
    })
    useEffect(() => {
        if (!selection) {
            setDescription({ text: 'No results', flavor: '' })
            return
        } else if (selection === 'cast') {
            setDescription({ text: 'Cast spells to buff your stats and attack your opponent', flavor: '' })
            return
        } else if (selection === 'equip') {
            setDescription({ text: 'Use gold to purchase equipment', flavor: '' })
            return
        }
        if (selection.description) {
            // selection is a move. Compute description using interpret()
            setDescription({
                text: selection.description.map(d => interpret(d, player, opponent)),
                flavor: selection.flavor
            })
        }
    }, [selection, player, player?.stats, player?.stats.divinity])
    return (
        <Box sx={styles.infoBar}>
            <Box sx={{ display: 'block' }}>{description.text}</Box>
            {description.flavor && <span style={{ fontStyle: 'italic' }}>{description.flavor}</span>}
        </Box>
    )
}

export default InfoBar