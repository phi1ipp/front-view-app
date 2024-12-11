import React from 'react';
import styles from './Campaigns.module.css';
import { StatusChip } from './StatusChip.tsx';
import { DownloadButton } from './DownloadButton.tsx';
import { TableRowProps } from './types';

export const TableRow: React.FC<TableRowProps> = ({ campaign, onDownload }) => (
  <div className={styles.tableRow}>
    <div className={styles.tableCell}>
      <div className={styles.cellContent}>
        <div className={styles.cellText}>{campaign.id}</div>
      </div>
    </div>
    <div className={styles.tableCell}>
      <div className={styles.cellContent}>
        <div className={styles.cellText}>{campaign.name}</div>
      </div>
    </div>
    <div className={styles.tableCell}>
      <StatusChip status={campaign.status} />
    </div>
    <div className={styles.tableCell}>
      <div className={styles.cellContent}>
        <div className={styles.cellText}>{campaign.violationCount}</div>
      </div>
    </div>
    <div className={styles.tableCell}>
      <DownloadButton onClick={onDownload} />
    </div>
  </div>
);