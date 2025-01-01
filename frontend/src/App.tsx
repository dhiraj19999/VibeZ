import { Routes } from "react-router-dom"

import { Route } from "react-router-dom"
import HomePage from "./Pages/home/HomePage"
import AuthCallbackPage from "./Pages/auth-callback/AuthCallbackPage"
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react"
function App() {
  

  return (
    <>
      
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/auth-callback" element={<AuthCallbackPage/>} />
      <Route
					path='/sso-callback'
					element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />}
				/>
    </Routes>
     
    </>
  )
}

export default App
