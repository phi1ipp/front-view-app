import React from 'react';
import styles from './Dashboard.module.css';
import { NavSection } from './NavSection.tsx';
import { UserProfile } from './UserProfile.tsx';
import { SideNavProps } from './types.ts';

export const SideNav: React.FC<SideNavProps> = ({ 
  logo, 
  sections, 
  userInfo,
  onLogout 
}) => {

  const handleChangePassword = async (passwordData: { currentPassword: string; newPassword: string }) => {
    try {
      // Call your API to change password
      const response = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(passwordData)
      });

      if (response.ok) {
        alert('Password changed successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      alert('Failed to change password. Please try again.');
    }
  };

  return (
  <nav className={styles.sideNav} aria-label="Main navigation">
    <div className={styles.titleLogo}>
      <img loading="lazy" src={logo}
        className={styles.logoImage} alt="Company logo" 
      />
    </div>
    <div className={styles.navContent}>
      {sections.map((section, index) => (
        <NavSection key={index} {...section} />
      ))}
    </div>
    <UserProfile {...userInfo} onLogout={onLogout} onChangePassword={handleChangePassword} />
  </nav>
);
};