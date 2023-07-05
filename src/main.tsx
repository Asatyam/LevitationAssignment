import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './login.tsx';
import Forgot from './forgot.tsx';
import MainForm from './MainForm.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "forgot",
    element: <Forgot/>,
  },
  {
    path: "form",
    element: <MainForm/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
