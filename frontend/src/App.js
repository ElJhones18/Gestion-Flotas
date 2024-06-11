import './App.css';
import { AdminRoutes } from './routes/AppRoute.js';
import { BrowserRouter } from "react-router-dom";
import { OpenRoutes } from './routes/OpenRoute.js';

function App() {
  return (
    <BrowserRouter>

      <AdminRoutes />

      <OpenRoutes />

    </BrowserRouter>

  );
}

export default App;
