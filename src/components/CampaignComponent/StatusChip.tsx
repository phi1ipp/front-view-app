import React from 'react';
import styles from './Campaign.module.css';
import { StatusChipProps } from '../../types/types';

const statusStyles = {
  running: styles.statusChipWarning,
  seed: styles.statusChipWarning,
  transfer: styles.statusChipWarning,
  data: styles.statusChipWarning,
  ready: styles.statusChipSuccess,
  error: styles.statusChipError
};


export const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  // console.log("Status: ", status); // Debugging to see what status is passed
  // console.log("Computed Class: ", statusStyles[status.toLowerCase()]); // Check computed class

  return (
    <div className={`${styles.statusChip} ${statusStyles[status.toLowerCase()]}`}>
      <div className={styles.statusText}>{statusText(status.toLowerCase())}</div>
    </div>
  );
};

function statusText(dbStatus) {
  switch (dbStatus) {
    case 'ready':
      return 'Ready';
    case 'seed': 
      return 'Needs data';
    case 'data':
      return 'Needs analysis';
    case 'transfer':
      return 'Data transfer';
    default:
      return 'Error';
  }
}