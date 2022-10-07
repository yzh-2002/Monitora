import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";

// @ts-ignore
import ViteMockApiServer from "./mock/MockApiPlugin"

const isDev =process.env.NODE_ENV !=='production'
const devPlugin =(p:Plugin)=>isDev ? p:null;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      react(),
      //@ts-ignore
      devPlugin(ViteMockApiServer({port:4000}))
  ],
  resolve: {
      alias: {
          "@":path.resolve(__dirname,"src")
      }
  },
  server:{
    // proxy:{
    //     '/':"http://localhost:5173/Monitora"
    // }
  }
})
