import React from 'react'
import ReactDOM from 'react-dom/client'

import {
    createBrowserRouter ,
    RouterProvider
} from "react-router-dom";

import { routes } from "./routes";
import {RecoilRoot} from "recoil";
import { config } from "./config";

const router =createBrowserRouter(
    routes,
    // {basename:config.basename}
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <RecoilRoot>
          <RouterProvider router={router} />
      </RecoilRoot>
  </React.StrictMode>
)
