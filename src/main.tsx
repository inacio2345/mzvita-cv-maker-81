
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set document title to MozVita
document.title = 'MozVita - Criador de CV Profissional';

createRoot(document.getElementById("root")!).render(<App />);
