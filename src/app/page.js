'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import Login from "@/pages/login";

export default function App() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to the /home route if the user is authenticated
      router.push("/home");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    // Render the login page if the user is not authenticated
    return <Login />;
  }

  // Optional: You can render a loading spinner or placeholder while the user is being redirected
  return null;
}
