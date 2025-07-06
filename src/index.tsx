import 'normalize.css';
import { createRoot } from 'react-dom/client';

import './theme.css';
import './global.scss';
import App from './App';

const container = document.getElementById('app')!;
const root = createRoot(container);
root.render(<App />);
