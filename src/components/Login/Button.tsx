import React from 'react';
import styles from './Login.module.css';
import { ButtonProps } from '../../types/types';

export const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary', type = 'button' }) => {
  return (
    <button
      type={type}
      className={variant === 'secondary' ? styles.loginButtonSecondary : styles.loginButton}
      onClick={onClick}
    >
      <div className={styles.buttonContent}>{label}</div>
    </button>
  );
};