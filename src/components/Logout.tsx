import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data or reset relevant state
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userName");

    // Redirect to the login page
    navigate('/login');
  };

  // You can trigger the logout process automatically on component mount
  // or via a button click, depending on your use case
  React.useEffect(() => {
    handleLogout();
  }, []);

  // Optionally show a message or a loading spinner while the logout process completes
  return <div>Logging out...</div>;
};


