import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (email === '' || password === '') {
      setError('Both fields are required');
      return;
    }
  
    const url = isSignup
      ? 'http://localhost:5000/users' // POST request for signup
      : `http://localhost:5000/users?email=${email}&password=${password}`; // GET request for login
  
    try {
      if (isSignup) {
        // If SignUp, POST data to the server
        await axios.post(url, { email, password });  // Creating a new user
        alert('Account Created! You can now login.');
        setIsSignup(false);
      } else {
        // If Login, GET data and check if credentials match
        const response = await axios.get(url);
        console.log("logged in");
        // Check if the response contains any users
        if (response.data.length > 0) {
            console.log("logged in 2");
          const user = response.data[0]; // Assuming the first match is the correct user
          localStorage.setItem("isAuthenticated", "true"); 
          if (rememberMe) {
            localStorage.setItem('user', JSON.stringify(user));
          }
          navigate('/dashboard');
        } else {
          setError('Invalid credentials. Please try again.');
        }
      }
      setError('');
    } catch (err) {
      // Log the error to the console for debugging
      console.error('Error during login/signup:', err);
      setError('Something went wrong. Please try again later.');
    }
  };
  return (
    <div className="login-container">
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="remember-me">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label htmlFor="rememberMe">Remember Me</label>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>

        <div className="additional-links">
          <a href="/forgot-password" className="link">Forgot Password?</a>
          <a
            href="#"
            className="link"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
