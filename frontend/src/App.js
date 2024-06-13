import './App.css';
import { AdminRoutes } from './routes/AppRoute.js';
import { BrowserRouter } from "react-router-dom";
import { OpenRoutes } from './routes/OpenRoute.js';
import { AuthProvider } from './context/AuthProvider';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>

        <AdminRoutes />

        <OpenRoutes />

      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
