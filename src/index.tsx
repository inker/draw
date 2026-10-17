import 'normalize.css';
import '@fontsource-variable/noto-sans/wdth.css';
import { createRoot } from 'react-dom/client';

import './fonts.css';
import './theme.css';
import './global.css';
import App from './App';

const container = document.getElementById('app')!;
const root = createRoot(container);
root.render(<App />);
