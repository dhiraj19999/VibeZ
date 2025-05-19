import { useAuth } from "@clerk/clerk-react";

import axios from "axios";
import { Loader } from "lucide-react";
import { useEffect,useState } from "react";




import React from 'react'


const updateApiToken = (token: string | null) => {
    if (token) {
       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
         delete axios.defaults.headers.common['Authorization'];
    }
}


const AuthProvider = ({children}) => {
 
    const {getToken,userId}=useAuth()
    const[loading,setLoading]=useState(true)
    
    useEffect(()=>{
    const initAuth=async()=>{
        try {
            const token=await getToken()
            updateApiToken(token)
        } catch (error) {
         console.error("Error getting token",error)   
        }
        finally{
            setLoading(false)
        }
    }
    initAuth()
    },[])
    
    if (loading)
		return (
			<div className='h-screen w-full flex items-center justify-center'>
				<Loader className='size-8 text-emerald-500 animate-spin' />
			</div>
		);

	return <>{children}</>;
}

export default AuthProvider