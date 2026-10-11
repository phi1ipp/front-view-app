import React from 'react';
import styles from './shared.module.css';

export type StatusKind = 'warning' | 'success' | 'error';

export interface StatusChipProps {
  status: string;
  label: string;
  kind: StatusKind;
}

const kindClass: Record<StatusKind, string> = {
  warning: styles.statusChipWarning,
  success: styles.statusChipSuccess,
  error: styles.statusChipError,
};

export const StatusChip: React.FC<StatusChipProps> = ({ status, label, kind }) => (
  <div className={`${styles.statusChip} ${kindClass[kind]}`}>
    <div className={styles.statusText}>{label}</div>
  </div>
);
