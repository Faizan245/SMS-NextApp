'use client';
import { useAuth } from '../../context/AuthContext';
import Login from "@/pages/login";
import HomePage from "@/pages/HomePage";
import { useState, useEffect } from 'react';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulate an async operation to check auth status
    const checkAuth = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
      setLoading(false);
    };

    checkAuth();
  }, [isAuthenticated]);

  // Show a loader while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Render HomePage if authenticated, otherwise render Login
  return isAuthenticated ? <HomePage /> : <Login />;
}
