export default {
    container: {
        position: 'fixed',
        top: 0,
        right: '5px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'end',
        width: '20%',
        minWidth: '220px',
        height: 'calc(100% - 5px)',
        gap: 0.5,
        pointerEvents: 'none',
    },
    note: {
        pointerEvents: 'auto',
        borderRadius: 1,
        transition: 'all 0.5s ease',
        backgroundColor: 'rgba(128,255,255,0.8)',
        border: '1px solid rgba(0,0,0,1)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        py: 1,
        px: 2,
        boxSizing: 'border-box',
        "& .x-butt": {
            visibility: "hidden"
        },
        "&:hover .x-butt": {
            visibility: "visible"
        },
        position: 'relative',
    },
    noteActive: {
        opacity: 0,
        transform: 'translateY(-100%)',
        "&:hover .x-butt": {
            visibility: "hidden"
        }
    },
    text: {
    }
}