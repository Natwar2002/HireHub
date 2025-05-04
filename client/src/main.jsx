import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import HeroProvider from './Provider.jsx';
import { BrowserRouter } from 'react-router-dom';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <HeroProvider>
      <App />
    </HeroProvider>
  </BrowserRouter>,
)
