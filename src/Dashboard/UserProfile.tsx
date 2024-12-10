import React from 'react';
import styles from './Dashboard.module.css';
import { UserInfo } from './types';

interface UserProfileProps extends UserInfo {
  onLogout?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  name,
  initial,
  role,
  onLogout
}) => (
  <div className={styles.userProfile}>
    <div className={styles.userInfo} role="status">
      <div className={styles.avatar}>
        <div className={styles.avatarBackground} aria-hidden="true">
          {initial}
        </div>
      </div>
      <div className={styles.userDetails}>
        <span className={styles.userName}>{name}</span>
        <span className={styles.userRole}>{role}</span>
      </div>
    </div>
    <button 
      className={styles.logoutButton}
      onClick={onLogout}
      aria-label="Logout"
    >
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/163ffcbe3d2f0f4ad41fcc78ffab9c6a3373a72f1f6da2bac5ac81ba27159e26?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740" alt="" className={styles.logoutIcon} />
      <span>Logout</span>
    </button>
  </div>
);