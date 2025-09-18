import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './routes/route.jsx'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/route.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

// console.log(import.meta.env);
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

console.log("ENV CLIENT_ID:", import.meta.env.VITE_CLIENT_ID);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <Router />
      </GoogleOAuthProvider>
  </StrictMode>,
)
