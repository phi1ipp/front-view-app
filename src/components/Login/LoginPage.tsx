import React, { useState } from 'react';
import styles from './Login.module.css';
import { InputField } from './InputField.tsx';
import { Button } from './Button.tsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [, setErrors] = useState<{ username?: string; password?: string }>({});
  const [, setIsLoading] = useState(false);
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

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const loginData = new FormData();
      loginData.append('username', username);
      loginData.append('password', password);

      await axios(`/auth/login`,{
        method: 'POST',
        data: loginData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("logged in");

      const user = await fetch('/api/user/me').then(rsp => rsp.json());

      localStorage.setItem("isAuthenticated", "true"); 
      localStorage.setItem("userName", user.username);
      localStorage.setItem("isAdmin", user.isAdmin);

      // Manually trigger authentication state update
      window.dispatchEvent(new Event('auth-change'));

      navigate('/home');
        
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
            <div className={styles.headerSection}>
              <div className={styles.loginCard}>
                <div className={styles.loginForm}>
                  <img
                    loading="lazy"
                    src="https://logo.stocklight.com/NASDAQ/POWL.png"
                    alt="Company Logo"
                    className={styles.logo}
                  />
                  <form className={styles.formContent}>
                    <InputField
                      label="User Name 123456"
                      value={username}
                      onChange={setUsername}
                      icon="https://cdn.builder.io/api/v1/image/assets/TEMP/612fb9c937453b33d31c2c41ec8ceb4a6515f3e19362262b1bc0343f0b6d299e?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740"
                    />
                    <InputField
                      label="Password"
                      value={password}
                      onChange={setPassword}
                      type="password"
                      icon="https://cdn.builder.io/api/v1/image/assets/TEMP/612fb9c937453b33d31c2c41ec8ceb4a6515f3e19362262b1bc0343f0b6d299e?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740"
                    />
                    <Button label="Login" onClick={handleLogin}/>
                  </form>
                </div>
                <p className={styles.helpText}>Having Trouble? Contact Admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};