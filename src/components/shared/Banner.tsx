import React from 'react';
import styles from './shared.module.css';

export interface BannerProps {
  type: 'success' | 'error';
  children: React.ReactNode;
}

export const Banner: React.FC<BannerProps> = ({ type, children }) => (
  <div className={type === 'success' ? styles.bannerSuccess : styles.bannerError}>
    {children}
  </div>
);
