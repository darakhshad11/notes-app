import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { DarkModeProvider } from './context/DarkModeContext'; // Add this import
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <DarkModeProvider> 
        <App />
      </DarkModeProvider>
    </Provider>
  </React.StrictMode>
);