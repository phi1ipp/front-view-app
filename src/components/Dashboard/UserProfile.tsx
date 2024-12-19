import React from 'react';
import styles from './Dashboard.module.css';
import { UserInfo } from './types';
import Logout from './Images/Logout.svg';

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
      <img src= {Logout} alt="" className={styles.logoutIcon} />
      <span>Logout</span>
    </button>
  </div>
);