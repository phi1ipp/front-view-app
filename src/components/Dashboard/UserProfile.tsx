import React, { useState }  from 'react';
import styles from './Dashboard.module.css';
import { UserInfo } from './types';
import Logout from './img/Logout.svg';
import Lockout from './img/Lockout.svg'
import { ChangePasswordDialog } from './ChangePasswordDialog.tsx';

interface UserProfileProps extends UserInfo {
  onLogout?: () => void;
  onChangePassword?: (passwordData: { currentPassword: string; newPassword: string }) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  name,
  initial,
  role,
  onLogout,
  onChangePassword
}) => {
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const handleChangePassword = (passwordData: { currentPassword: string; newPassword: string }) => {
    if (onChangePassword) {
      onChangePassword(passwordData);
    }
  };

  return (
    <>
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
          onClick={() => setIsChangePasswordOpen(true)}
          aria-label="Change Password"
        >
          <img src={Lockout} alt="" className={styles.logoutIcon} />
          <span>Change Password</span>
        </button>
        
        <button 
          className={styles.logoutButton}
          onClick={onLogout}
          aria-label="Logout"
        >
          <img src={Logout} alt="" className={styles.logoutIcon} />
          <span>Logout</span>
        </button>
      </div>

      <ChangePasswordDialog
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
        onSubmit={handleChangePassword}
      />
    </>
  );
}