import React from 'react';
import styles from './Campaign.module.css';
import { StatusChipProps } from '../../types/types';

const statusStyles = {
  running: styles.statusChipWarning,
  completed: styles.statusChipSuccess,
  ready: styles.statusChipSuccess,
  error: styles.statusChipError
};


export const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  console.log("Status: ", status); // Debugging to see what status is passed
  console.log("Computed Class: ", statusStyles[status.toLowerCase()]); // Check computed class

  return (
    <div className={`${styles.statusChip} ${statusStyles[status.toLowerCase()]}`}>
      <div className={styles.statusText}>{status}</div>
    </div>
  );
};
