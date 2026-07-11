
import './App.css'
// import AppRoutes from './routes/AppRoutes'
import { RouterProvider } from "react-router-dom";
import { router } from './router/router';
import useAuthProfile from "./hooks/queries/useAuthProfile";

function App() {
  useAuthProfile();  

  return (
    <>
        <RouterProvider router={router} />;
    </>
  )
}

export default App
