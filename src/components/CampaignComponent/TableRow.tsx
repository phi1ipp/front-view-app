import React from 'react';
import styles from './Campaign.module.css';
import { TableRowProps } from './types';
import { StatusChip } from './StatusChip.tsx';
import { DownloadButton } from './DownloadButton.tsx';

export const TableRow: React.FC<TableRowProps> = ({ campaign,onDownload }) => {
  return (
    <div className={styles.tableCellRow}>
      <div className={styles.cell}>
        <div className={styles.cellContent}>{campaign.id}</div>
      </div>
      <div className={styles.cell}>
        <div className={styles.cellContent}>{campaign.name}</div>
      </div>
      <div className={styles.cell}>
        <div className={styles.cellContent}><div><StatusChip status={campaign.status} /></div></div>
      </div>
      <div className={styles.cell}>
        <div className={styles.cellContent}>{campaign.violationCount}</div>
      </div>
      <div className={styles.actionCell}>   
         <DownloadButton onClick={onDownload} />
      </div>
    </div>
  );
};