import React from 'react';
import styles from './Campaign.module.css';
import { TableRowProps } from '../../types/types';
import { StatusChip } from './StatusChip.tsx';
import { DownloadButton } from './DownloadButton.tsx';
import  Editimg  from '../Dashboard/img/Editimg.svg';


export const TableRow: React.FC<TableRowProps> = ({ campaign,onEdit,onDownload }) => {
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
         <button
                  className={styles.actionButton}
                  onClick={() => onEdit(campaign)}
                  aria-label={`Edit ${campaign.name}`}
                >
                  <div className={styles.buttonContent}>
                    <img
                      loading="lazy"
                      src={Editimg}
                     className={styles.buttonIcon}
                      alt="Edit"
                    />
                    <span className={styles.buttonText}>Edit</span>
                  </div>
                </button>
         <DownloadButton onClick={onDownload} />
      </div>
    </div>
  );
};