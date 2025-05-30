import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import {ClerkProvider} from '@clerk/clerk-react'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from "./providers/AuthProvider"
// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
console.log({ PUBLISHABLE_KEY })
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
  <AuthProvider>
     <BrowserRouter>
      <App />
      </BrowserRouter>
      </AuthProvider>
    </ClerkProvider>
  </StrictMode>,
)
