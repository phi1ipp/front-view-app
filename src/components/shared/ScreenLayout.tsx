import React from 'react';
import styles from './shared.module.css';
import { Banner } from './Banner';
import { Button } from './Button';
import { ICONS } from './icons';

export interface ScreenLayoutProps {
  title: string;
  onCreate?: () => void;
  createLabel?: string;
  successMessage?: string;
  errorMessage?: string;
  children: React.ReactNode;
}

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  title,
  onCreate,
  createLabel = 'Create',
  successMessage,
  errorMessage,
  children,
}) => (
  <div className={styles.screen}>
    {successMessage && <Banner type="success">{successMessage}</Banner>}
    {errorMessage && <Banner type="error">{errorMessage}</Banner>}
    <div className={styles.screenHeader}>
      <div className={styles.screenTitleContainer}>
        <h1 className={styles.screenTitle}>{title}</h1>
      </div>
      {onCreate && (
        <Button variant="primary" icon={ICONS.create} iconAlt="Create Icon" onClick={onCreate}>
          {createLabel}
        </Button>
      )}
    </div>
    <div className={styles.screenContent}>{children}</div>
  </div>
);
