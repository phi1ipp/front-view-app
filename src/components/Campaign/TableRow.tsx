import React from 'react';
import styles from './Campaigns.module.css';
import { StatusChip } from './StatusChip.tsx';
import { DownloadButton } from './DownloadButton.tsx';
import { TableRowProps } from './types';

export const TableRow: React.FC<TableRowProps> = ({ campaign, onDownload }) => (
     <div className={styles.tableCellRow}>
          <div className={styles.cell}>
            <div className={styles.cellContent}>{campaign.id}</div>
          </div>
          <div className={styles.cell}>
            <div className={styles.cellContent}>{campaign.name}</div>
          </div>
          <div className={styles.cell}>
          <div className={styles.cellContent}>
        <StatusChip status={campaign.status} /></div>
      </div>
          <div className={styles.cell}>
            <div className={styles.cellContent}>{campaign.violationCount}</div>
          </div>
    <div className={styles.cell}>
      <DownloadButton onClick={onDownload} />
    </div>
  </div>
);