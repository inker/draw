import 'normalize.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto-condensed/400.css';
import { createRoot } from 'react-dom/client';

import './theme.css';
import './global.css';
import App from './App';

const container = document.getElementById('app')!;
const root = createRoot(container);
root.render(<App />);
