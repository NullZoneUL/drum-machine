import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app';
import '@assets/style/_imports.scss';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(<App />);
