import 'normalize.css';
import '@fontsource/ubuntu/400.css';
import '@fontsource/ubuntu/700.css';
import '@fontsource/ubuntu-condensed/400.css';
import { createRoot } from 'react-dom/client';

import './theme.css';
import './global.css';
import App from './App';

const container = document.getElementById('app')!;
const root = createRoot(container);
root.render(<App />);
