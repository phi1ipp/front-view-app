import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route , Navigate} from 'react-router-dom';
import { LoginPage } from './components/Login/LoginPage.tsx';
import Home  from './components/Home.tsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    // Listen for changes in localStorage
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/home"
        element={isAuthenticated ? <Home /> : <Navigate to="/" />}
      />
    </Routes>
  </BrowserRouter>
  );
}

export default App;