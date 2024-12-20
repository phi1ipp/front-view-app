import React from 'react';
import styles from './Campaigns.module.css';
import { StatusChipProps } from './types';

const statusStyles = {
  running: styles.statusChipWarning,
  completed: styles.statusChipSuccess,
  error: styles.statusChipError
};


export const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  console.log("Status: ", status); // Debugging to see what status is passed
  console.log("Computed Class: ", statusStyles[status]); // Check computed class

  return (
    <div className={`${styles.statusChip} ${statusStyles[status]}`}>
      <div className={styles.statusText}>{status}</div>
    </div>
  );
};
