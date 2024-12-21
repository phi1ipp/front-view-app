import React from 'react';
import styles from './Login.module.css';
import { ButtonProps } from './types';

export const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button className={styles.loginButton} onClick={onClick}>
      <div className={styles.buttonContent}>{label}</div>
    </button>
  );
};