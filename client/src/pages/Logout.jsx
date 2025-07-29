import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user session/token here if needed
    localStorage.removeItem("token");
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm flex flex-col items-center gap-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">You have been logged out</h2>
        <p className="text-gray-600 mb-6 text-center">Choose where to go next:</p>
        <div className="flex gap-4 w-full">
          <Button className="flex-1 bg-blue-600 text-white" onClick={() => navigate("/login")}>Login</Button>
          <Button className="flex-1 bg-gray-200 text-gray-800" onClick={() => navigate("/register")}>Register</Button>
        </div>
      </div>
    </div>
  );
}
