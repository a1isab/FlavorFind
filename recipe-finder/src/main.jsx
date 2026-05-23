import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { FavoritesProvider } from './context/FavoritesContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/FlavorFind">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
