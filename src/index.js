import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DarkModeContextProvider } from './context/darkModeContext';
import { UserAuthContextProvider } from './context/userAuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <UserAuthContextProvider>
        <DarkModeContextProvider>
          <App />
        </DarkModeContextProvider>
      </UserAuthContextProvider>

);

