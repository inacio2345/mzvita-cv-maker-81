
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set document title to MozVita
document.title = 'MozVita - Criador de CV Profissional';

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/serviceWorker.js')
      .then((registration) => {
        // Service Worker registered successfully
      })
      .catch((error) => {
        console.error('PWA: Service Worker registration failed:', error);
      });
  });
}

createRoot(document.getElementById("root")!).render(<App />);
