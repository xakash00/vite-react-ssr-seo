import { hydrateRoot } from 'react-dom/client';

import App from './app';
import { BrowserRouter } from 'react-router-dom';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/custom-sw.js').then(reg => {
            console.log("✅ Service Worker registered:", reg);
        }).catch(err => {
            console.error("❌ Service Worker registration failed:", err);
        });
    });
}

hydrateRoot(document.getElementById('app'), <BrowserRouter><App /></BrowserRouter>);
