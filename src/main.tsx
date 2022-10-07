import React from 'react'
import ReactDOM from 'react-dom/client'

import {
    createBrowserRouter ,
    RouterProvider
} from "react-router-dom";

import { ThemeProvider } from "@mui/material";
import { CssBaseline, StyledEngineProvider } from '@mui/material';

import { routes } from "./routes";
import {RecoilRoot} from "recoil";

import "@/assets/scss/style.scss"

// defaultTheme
import themes from '@/theme';
import { config } from "./config";

const router =createBrowserRouter(
    routes,
    // {basename:config.basename}
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
      <RecoilRoot>
          <StyledEngineProvider injectFirst>
              <ThemeProvider theme={themes()}>
                  <CssBaseline />
                  <RouterProvider router={router} />
              </ThemeProvider>
          </StyledEngineProvider>
      </RecoilRoot>
  // </React.StrictMode>
)
