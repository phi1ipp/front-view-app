import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear authentication data
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userName");
    localStorage.removeItem("isAdmin");
    
    // Dispatch event to notify about auth change
    window.dispatchEvent(new Event('auth-change'));
    
    // Add a small delay to ensure state updates before redirect
    setTimeout(() => {
      navigate('/');
    }, 100);
  }, [navigate]);

  // Show a loading message while logout completes
  return <div>Logging out...</div>;
};