import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';


const AuthWrapper = ({children}) => {

    const user = useSelector(state=>state.user.user)

    if(!user) return <Navigate to='/login' replace/>
    if(user && !user.isAdmin) return <Navigate to='/' replace/>
    
  return children
}

export default AuthWrapper
