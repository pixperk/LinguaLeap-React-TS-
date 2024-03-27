import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material"
import {Provider} from "react-redux"
import { store } from './redux/store.ts';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0081a7', // Main primary color
    },
    secondary: {
      main: '#b8c0ff', // Main secondary color
    },
    
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Provider store={store}>
    <App />
    </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
