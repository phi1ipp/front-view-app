import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import { InputField } from './InputField.tsx';
import { Button } from './Button.tsx';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';



export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
 const navigate = useNavigate(); 


  const validateForm = (): boolean => {
    const newErrors: { username?: string; password?: string } = {};

    if (!username) {
      newErrors.username = 'Username is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/users?email=${username}&password=${password}`);
        console.log("logged in");
        // Check if the response contains any users
        if (response.data.length > 0) {
            console.log("logged in 2");
          const user = response.data[0]; // Assuming the first match is the correct user
          localStorage.setItem("isAuthenticated", "true"); 
          localStorage.setItem("userName",username)
          navigate('/home');
        } else {
          setError('Invalid credentials. Please try again.');
        } 
    }catch (error) {
      setErrors({
        username: 'Invalid username or password',
        password: 'Invalid username or password'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBackground}>
        <div className={styles.loginWrapper}>
          <div className={styles.loginContent}>
            <div className={styles.loginHeader}>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/92063446ab01485ec2b740e4689c8bbfa46362e9a78fa7bc3f52c05c97832cab?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740"
                alt="Company Logo"
                className={styles.logo}
              />
              <div className={styles.loginForm}>
                <div className={styles.formContainer}>
                  <h1 className={styles.loginTitle}>Login</h1>
                  <form 
                    className={styles.formContent} 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleLogin();
                    }}
                  >
                    <InputField
                      label="User Name"
                      value={username}
                      onChange={setUsername}
                      icon="https://cdn.builder.io/api/v1/image/assets/TEMP/a94d82d58f593d997fb09f88cd789f083100aafcacd62e7ea17d30bb956357ac?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740"
                      error={errors.username}
                    />
                    <InputField
                      label="Password"
                      value={password}
                      onChange={setPassword}
                      type="password"
                      icon="https://cdn.builder.io/api/v1/image/assets/TEMP/a94d82d58f593d997fb09f88cd789f083100aafcacd62e7ea17d30bb956357ac?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740"
                      error={errors.password}
                    />
                    <Button 
                      label="Login" 
                      onClick={handleLogin}
                      disabled={isLoading}
                      isLoading={isLoading}
                    />
                  </form>
                </div>
                <a 
                  href="/contact-admin" 
                  className={styles.helpText}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/contact-admin';
                  }}
                >
                  Having Trouble? Contact Admin
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};