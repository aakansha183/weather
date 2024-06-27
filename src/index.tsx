import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the '/client' here
import './index.css';
import App from './App';
import './styles.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
