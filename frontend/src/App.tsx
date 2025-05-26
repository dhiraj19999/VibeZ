

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import AuthCallbackPage from './pages/auth-callback/AuthCallbackPage';
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
import MainLayout from "./layout/MainLayout"
import ChatPage from './pages/chat/ChatPage';
function App() {
  

  return (
    <>
    <Routes>
     
      <Route
					path='/sso-callback'
					element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />}
				/>
				<Route path='/auth-callback' element={<AuthCallbackPage />} />
        <Route element={<MainLayout/>}>  <Route path='/' element={<HomePage/>}/> // here HomePage is outlet of MainLayout
        <Route path="/chat" element={<ChatPage/>} /> // here chat page is outlet of MainLayout
        </Route>
    </Routes>
    </>
  )
}

export default App
