import App from './components/app';
import { createRoot } from 'react-dom/client';
import '@assets/plugins/input-knob';
import '@assets/style/_imports.scss';

const container = document.getElementById('app');
const root = createRoot(container!);

root.render(<App />);
