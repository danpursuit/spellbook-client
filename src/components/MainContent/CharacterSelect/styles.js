export default {
    container: {
        width: '100%',
        flex: { xs: '0 0 384px', md: '0 0 512px' },
        backgroundSize: 'cover',
        transition: 'background 0.5s',
        boxSizing: 'border-box',
        py: 2
    },
    containerInner: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1
    },
    spriteBox: {
        flex: '1 1',
        width: '70%',
        position: 'relative',
        // backgroundColor: 'black'
    },
    loaderBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    joinBattleBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: { xs: 1, md: 2 },
        px: 5,
        borderRadius: 2,
        backgroundColor: theme => theme.palette.secondary.light + theme.palette.transparencyLow,
    },
    joinBattleRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 2,
        width: '100%',
        boxSizing: 'border-box',
    },
    joinBattleButtonRow: {
        justifyContent: 'center',
    },
    sprite: {
        position: 'absolute',
        left: '0%',
        width: '100%',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'background 0.5s',
    },
    glow: {
        width: '0px',
        height: '0px',
        position: 'absolute',
        left: '50%',
        boxShadow: { xs: '0px -50px 140px 80px', md: '0px -50px 140px 120px' },
    },
    button: {
        opacity: 0.8,
    },
    bar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '95%',
        justifyContent: 'space-around'
    },
    name: {
        flex: '0 1 70%'
    }
}