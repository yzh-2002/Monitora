import React from 'react'
import ReactDOM from 'react-dom/client'

import {
    createBrowserRouter ,
    RouterProvider
} from "react-router-dom";

import { routes } from "./routes";
import { config } from "./config";

const router =createBrowserRouter(
    routes,
    // {basename:config.basename}
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
