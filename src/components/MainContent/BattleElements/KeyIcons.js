import React from 'react'
import KeyboardIcon from '@mui/icons-material/Keyboard';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Typography } from '@mui/material';
import styles from './styles';

// small keyboard icons, occasioinally disabled depending on page/search results
const KeyIcons = ({ page, maxPage }) => {
    return (
        <Box sx={styles.resultPagination}>
            <Box sx={styles.keyIcons}><KeyboardIcon />
                <KeyboardArrowLeftIcon color={page === 1 ? 'disabled' : 'inherit'} />
                <Box sx={styles.upDownArrows}><KeyboardArrowUpIcon fontSize='small' />
                    <KeyboardArrowDownIcon fontSize='small' /></Box>
                <KeyboardArrowRightIcon color={page === maxPage ? 'disabled' : 'inherit'} /></Box>
            <Typography sx={styles.resultPaginationText}>{page} / {maxPage}</Typography>
        </Box>
    )
}

export default KeyIcons