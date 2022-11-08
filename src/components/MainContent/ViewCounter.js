import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { addView, getViews } from '../../actions/views';

// ViewCounter is a component that displays the number of site visits
// Generic reusable component that I designed for my blog
const ViewCounter = () => {
    const dispatch = useDispatch();
    const { viewCount } = useSelector((state) => state.views);
    const getOrUpdateViews = () => {
        const viewTime = localStorage.getItem('viewTime');
        if (viewTime === null || Date.now() - Number(viewTime) > 20 * 60 * 1000) {
            localStorage.setItem('viewTime', Date.now());
            dispatch(addView());
        } else {
            dispatch(getViews());
        }
    }
    useEffect(() => getOrUpdateViews(), []);
    return (
        <Typography variant='body2' align='left' fontWeight={200}>
            Site visits: {viewCount > 0 ? viewCount : 'fetching...'}
        </Typography>
    )
}

export default ViewCounter