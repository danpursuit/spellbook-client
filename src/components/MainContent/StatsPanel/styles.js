import chazeHex from '../../../images/chars/chaze/stats.png'
import threleHex from '../../../images/chars/threle/stats.png'

export default {
    container: {
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        py: 2,
        px: 2,
        borderRadius: 2,
        gap: 2,
    },
    containerInner: {
        backgroundColor: theme => theme.palette.menu.light + theme.palette.transparency,
        display: 'flex',
        flexDirection: 'column',
        padding: 1,
        borderRadius: 2,
        whiteSpace: 'pre-wrap',
    },
    statHexagon: {
        height: '150px',
        width: '150px',
        margin: 'auto',
        backgroundSize: 'contain',
        my: 2,
    },
    chazeHex: {
        backgroundImage: `url(${chazeHex})`,
    },
    threleHex: {
        backgroundImage: `url(${threleHex})`,
    }
}