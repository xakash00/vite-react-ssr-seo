import { hydrateRoot } from 'react-dom/client';

import App from './app';
import { BrowserRouter } from 'react-router-dom';

hydrateRoot(document.getElementById('app'), <BrowserRouter><App /></BrowserRouter>);
