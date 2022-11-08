import React from "react";
import { io } from "socket.io-client"
import { ThemeProvider } from '@mui/material/styles';



import Navbar from "./components/Navbar/Navbar";
import MainContent from "./components/MainContent/MainContent";
import { Box } from "@mui/material";
import styles from './styles';
import theme from './theme';
import Notifications from "./components/Notifications/Notifications";
import baseURL from './constants/url';

const socket = io.connect(baseURL);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={styles.main}>
        <Navbar />
        <MainContent />
        <Notifications />
      </Box>
    </ThemeProvider>
  )
}

export default App;