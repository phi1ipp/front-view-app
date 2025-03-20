import React from 'react';
import styles from './Dashboard.module.css';
import { NavItemProps } from './types';

export const NavItem: React.FC<NavItemProps> = ({ 
  icon, 
  label, 
  isActive, 
  onClick,
  forAdmins,
  section 
}) => {
  const isDisabled = forAdmins && localStorage.getItem('isAdmin') === "false";

  return (
  <button 
    className={`${styles.navItem} ${isActive ? styles.navItemActive : ''} ${isDisabled ? styles.navItemDisabled : ''}`}
    onClick={onClick}
    aria-pressed={isActive}
  >
    <div className={styles.stateLayer}>
      <img loading="lazy" src={icon} className={styles.navIcon} alt="" />
      <span >{label}</span>
      {section && <span className={styles.section}>{section}</span>}
    </div>
    {isDisabled && <div><span>🔒</span></div>}
  </button>
);
}
