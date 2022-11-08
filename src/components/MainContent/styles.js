export default {
    main: {
        display: 'flex',
        flexDirection: 'row',
        flex: '1 1 0',
        minHeight: 'calc(100vh - 65px)',
        maxHeight: 'calc(100vh - 65px)',
    },
    left: {
        flex: { xs: '0 1 525px', md: '0 1 700px' },
        minWidth: { xs: '500px', md: '600px' },
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',

    },
    right: {
        backgroundColor: theme => theme.palette.menu.light + theme.palette.transparency,
        flex: '1 1 60%',
        display: 'flex',
        boxSizing: 'border-box',
        overflowY: 'scroll',
    },
    joinChat: {
        flexDirection: 'column',
        gap: 2,
        paddingTop: 2,
        paddingBottom: 2,
        px: 4,
        overflowY: 'scroll',
        minWidth: '50px',
    },
    chatroom: {
        flexDirection: 'row',
        overflowX: 'scroll',
    },
    battle: {
        flex: { xs: '0 1 525px', md: '0 1 1000px' },
        minWidth: { xs: '500px', md: '600px' },
    },
    hoard: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
    },
    userAndGames: {
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
        maxHeight: 'calc(max(100vh, 870px))',
        boxSizing: 'border-box',
        paddingBottom: 4
    }
}