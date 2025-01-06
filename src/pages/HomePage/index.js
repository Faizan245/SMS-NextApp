'use client'
import React from 'react'
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation'
const HomePage = () => {
    const { isAuthenticated, logout } = useAuth();

    if (!isAuthenticated) {
         return <h1>Please login first</h1>
      }
    return (
        <>
            <div>HomePage</div>
            <button onClick={logout}>Logout</button>
        </>
    )
}

export default HomePage