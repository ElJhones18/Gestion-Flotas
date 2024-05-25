import './App.css';
import { AdminLayout } from './layouts/adminLayouts/AdminLayout.js';
import { AdminRoutes } from './routes/AppRoute.js';
import { BrowserRouter } from "react-router-dom";
// import { CreateUserComponent } from './components/users/CreateUserComponent';
// import { ListComponent } from './components/users/ListComponent';
// import { DragAndDrop } from './pages/adminPages/drivers/TaskComponent.js';

function App() {
  return (
  <BrowserRouter>
    <AdminRoutes/>
  </BrowserRouter>
  
  
  // <CreateUserComponent />
  /* <ListComponent/> */
  // <DragAndDrop/>
  // <AdminLayout/>
  );
}

export default App;
