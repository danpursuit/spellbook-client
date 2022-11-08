const borderStyle = '1px solid #99a'

export default {
    usersBar: {
        flex: '3 1',
        overflow: 'hidden',
        borderRight: borderStyle,
        paddingTop: 1,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column'
    },
    gamesBar: {
        flex: '2 1',
        overflow: 'hidden',
        borderRight: borderStyle,
        paddingTop: 1,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        borderTop: borderStyle,
    },
    messageBar: {
        flex: '1 1',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        paddingTop: 1,
    },
    messageContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1',
        px: 1,
        overflowY: 'scroll',
    },
    writeMessage: {
        minWidth: '250px',
        flex: '0 0',
        px: 2,
        py: 1,
        borderTop: borderStyle,
    },
    writeInner: {
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
        alignItems: 'center',
        boxSizing: 'border-box',
        minWidth: 'fit-content',
    },
    input: {
        flex: '1 1 200px',
        fontSize: 14,
    },
    name: {
        borderTop: borderStyle,
        px: 1,
        lineHeight: 1.3,
    },
    nameContainer: {
        position: 'relative',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: theme => theme.palette.primary.light,
        }
    },
    msg: {
        lineHeight: 1.3,
        display: 'flex',
        gap: 1,
        alignItems: 'center',
    },
    userCount: {
        textAlign: 'center', paddingBottom: 0.5,
        flex: '0 0',
    },
    selectedUserOuter: {
        position: 'absolute',
        top: 0,
        left: '100%',
    },
    selectedUser: {
        position: 'fixed',
        backgroundColor: theme => theme.palette.secondary.light + theme.palette.transparencyLow,
        border: borderStyle,
        borderRadius: 2,
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1.5,
    }
}