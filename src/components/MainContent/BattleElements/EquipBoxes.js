import { Box } from '@mui/material'
import React from 'react'
import styles from './styles'
import equipStyles from './equipStyles'

// colors a frame if it is enchanted with Fire or Shadow
const AlignmentFrame = ({ alignment }) => {
    return (<>
        {alignment ?
            <Box sx={{ ...equipStyles.float, ...equipStyles[`${alignment.toLowerCase()}Frame`] }}></Box> : <></>}
    </>)
}

// EquipBoxes is a component that displays the character's equipment
const EquipBoxes = ({ data }) => {
    return (
        <Box sx={styles.equipBoxes}>
            <Box sx={styles.equipRow}>
                <Box sx={{ ...styles.equipFrame, ...(data?.equipment.weapon ? styles[`${data.equipment.weapon.tier}Frame`] : styles.swordFrame) }}>
                    {data?.equipment.weapon && <AlignmentFrame alignment={data.equipment.weapon.alignment} />}
                    {data?.equipment.weapon && <Box sx={{ ...equipStyles.default, ...equipStyles[data.equipment.weapon.name] }} />
                    }
                </Box>
                <Box sx={{ ...styles.equipFrame, ...(data?.equipment.aux ? styles[`${data.equipment.aux.tier}Frame`] : styles.auxFrame) }}>
                    {data?.equipment.aux && <AlignmentFrame alignment={data.equipment.aux.alignment} />}
                    {data?.equipment.aux && <Box sx={{ ...equipStyles.default, ...equipStyles[data.equipment.aux.name] }} />}
                </Box>
            </Box>
            <Box sx={styles.equipRow}>
                <Box sx={{ ...styles.equipFrame, ...(data?.equipment.armor ? styles[`${data.equipment.armor.tier}Frame`] : styles.armorFrame) }}>
                    {data?.equipment.armor && <AlignmentFrame alignment={data.equipment.armor.alignment} />}
                    {data?.equipment.armor && <Box sx={{ ...equipStyles.default, ...equipStyles[data.equipment.armor.name] }} />}
                </Box>
                <Box sx={{
                    ...styles.equipFrame, ...(data?.equipment.gloves ? styles[`${data.equipment.gloves.tier}Frame`] : styles.gloveFrame),
                }}>
                    {data?.equipment.gloves && <AlignmentFrame alignment={data.equipment.gloves.alignment} />}
                    {data?.equipment.gloves && <Box sx={{ ...equipStyles.default, ...equipStyles[data.equipment.gloves.name] }} />}
                </Box>
            </Box>
        </Box >
    )
}

export default EquipBoxes