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
}) => (
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
    <UserProfile {...userInfo} onLogout={onLogout} />
  </nav>
);