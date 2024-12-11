import React from 'react';
import styles from './Campaigns.module.css';
import { StatusChipProps } from './types';

const statusStyles = {
  Running: styles.statusChipWarning,
  Completed: styles.statusChipSuccess,
  Error: styles.statusChipError
};

export const StatusChip: React.FC<StatusChipProps> = ({ status }) => (
  <div className={`${styles.statusChip} ${statusStyles[status]}`}>
    <div className={styles.statusText}>{status}</div>
  </div>
);