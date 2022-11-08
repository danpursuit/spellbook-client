import logo from '../../images/textLogo.png';
import styles from '../MainContent/styles';

export default {
    appBarContainer: {
        display: 'flex',
        flexDirection: 'column',
        borderBottom: '1px solid #99a',
        flex: '1 1 64px',
    },
    appBar: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        px: 0,
        opacity: 1.,
        height: '60px'
    },
    tabs: {
        display: 'flex',
        alignItems: 'end',
        height: '100%',
        gap: 0,
        position: 'relative',
    },
    tab: {
        borderRadius: '4px 4px 0px 0px',
        minWidth: '3em',
        paddingTop: '5px',
        px: '7px',
        paddingBottom: '2px',
        textAlign: 'center',
        cursor: 'pointer',
        color: '#000',
        opacity: 0.5,
        '&:hover': {
            color: '#fff',
        }
    },
    selectedTab: {
        backgroundColor: theme => theme.palette.menu.light + theme.palette.transparency,
        opacity: 1,
        "&:hover": {
            backgroundColor: theme => theme.palette.menu.light + theme.palette.transparency,
            opacity: 1
        }
    },
    tabDesk: {
        backgroundColor: theme => theme.palette.menu.light + theme.palette.transparency,
        width: '100%', height: '4px',
    },
    logoContainer: {
        paddingLeft: '18px',
        paddingTop: '2px'
    },
    textLogo: {
        backgroundSize: 'cover',
        backgroundImage: `url(${logo})`,
        width: '116px',
        height: '60px',
        borderRadius: '50%',
    },
    battleSide: {
        display: 'flex',
        height: '100%',
        gap: { xs: 2, md: 4 },
        flex: { xs: '0 1 525px', md: '0 1 700px' },
        minWidth: { xs: '500px', md: '600px' },
    },
    inBattle: {
        ...styles.battle
    },
    rightSide: {
        flex: '1 1 60%',
        display: 'flex',
        justifyContent: 'space-between',
        height: '100%',
        paddingRight: 2,
        boxSizing: 'border-box',
    },
    button: {
        minWidth: 0
    },
    icon: {
        minWidth: 0,
        px: 0
    },
    input: {
        // minWidth: '200px',
    },
    float: {
        position: 'fixed',
        top: '0%',
        left: '0%',
        backgroundColor: 'rgba(80,120,140,0.4)',
        width: '100%',
        height: '100%',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '10%'
    },
    prompt: {
        backgroundColor: theme => theme.palette.menu.light,
        height: 'fit-content',
        padding: 4,
        borderRadius: 4,
        width: '30%',
        maxWidth: '350px',
        minWidth: '200px',
        border: '1px solid #444'
    },
    promptInner: {
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
    },

    settings: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        gap: 1,
        position: 'absolute',
        top: '80%',
        right: '15px',
        backgroundColor: theme => theme.palette.menu.light,
        width: '300px',
        height: 'fit-content',
        borderRadius: 1.5,
        border: '1px solid #99a',
        boxSizing: 'border-box',
        padding: 2,
        zIndex: 100,
    },
    userIcon: {
        fill: 'url(#blue-gradient)'
    },
    username: {
        letterSpacing: '0.1em',
        background: '-webkit-linear-gradient(90deg, rgba(35,66,213,1) 0%, rgba(31,53,167,1) 70%,rgba(2,9,80,1) 100%)',
        'WebkitBackgroundClip': 'text',
        'WebkitTextFillColor': 'transparent',
    },
    user: {
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    settingsSide: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1
    },
    tabContainer: {
        position: 'relative',
        "& .x-butt": {
            visibility: "hidden"
        },
        "&:hover .x-butt": {
            visibility: "visible"
        },
    },
    challengerScreen: {
        gap: 1,
        display: 'flex',
        flexDirection: 'column',
    }
}