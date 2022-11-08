import { createTheme } from '@mui/material/styles';

// Spellbook's custom blue and orange theme for MUI

export default createTheme({
    palette: {
        primary: {
            light: "#f2ccb7",
            main: "#d56505",
            dark: "#b15100",
            contrastText: "#fcf1e0"
        },
        secondary: {
            light: "#b2e4fc",
            main: "#00a6f2",
            dark: "#0074bb",
            contrastText: "#000"
        },
        menu: {
            light: "#dcdcf0",
            main: "#dcdcf0",
            dark: "#94a6c4",
            contrastText: "#fff"
        },
        menuDark: {
            light: "#9393a0",
            main: "#696779",
            dark: "#030324",
            contrastText: "#fff"
        },
        transparency: 'c0',
        transparencyHigh: '80',
        transparencyLow: 'ee',
    },
    components: {
        MuiInput: {
            styleOverrides: {
                root: {
                    border: '0.5px solid #555',
                    borderRadius: 4,
                    backgroundColor: '#eeeeee80',
                    paddingLeft: 8,
                }
            }
        }
    },
    typography: {
        fontFamily: [
            'Roboto',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});