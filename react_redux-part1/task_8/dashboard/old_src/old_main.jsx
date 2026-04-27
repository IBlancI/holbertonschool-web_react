import React from 'react';
import ReactDOM from 'react-dom/client';

// Import des polices Roboto (poids 400, 500, 700)
import '@fontsource/roboto/400.css'; // Regular (corps de texte)
import '@fontsource/roboto/500.css'; // Medium (semi-accents)
import '@fontsource/roboto/700.css'; // Bold (titres/forts accents)

import './main.css';
import App from './App/App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
