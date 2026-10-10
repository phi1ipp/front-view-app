import React from 'react';
import styles from './Dashboard.module.css';
import { NavItem } from './NavItem';
import { NavSection as NavSectionType } from '../../types/types';

export const NavSection: React.FC<NavSectionType> = ({ title, items }) => (
  <div className={styles.navSection}>
    {title && (
      <div className={styles.sectionTitle} aria-label={title}>
        {title}
      </div>
    )}
    {items.map((item, index) => (
      <NavItem key={index} {...item} />
    ))}
    <div className={styles.sectionDivider} role="separator" />
  </div>
);