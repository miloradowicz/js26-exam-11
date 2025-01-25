import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import '@fontsource/roboto/cyrillic.css';

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <PersistGate>
        <CssBaseline />
        <BrowserRouter>
          <SnackbarProvider autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <App />
          </SnackbarProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
