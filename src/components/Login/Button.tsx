import React from 'react';
import styles from './LoginPage.module.css';
import { ButtonProps } from './types';

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  disabled = false,
  isLoading = false 
}) => {
  return (
    <button 
      className={`${styles.button} ${disabled ? styles.buttonDisabled : ''}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
    >
      <div className={styles.buttonContent}>
        {isLoading ? 'Loading...' : label}
      </div>
    </button>
  );
};