import React, { useState } from 'react';
import styles from './Campaign.module.css';
import { TableRowProps } from '../../types/types';
import { StatusChip } from './StatusChip.tsx';
import StartFill from './StartFill.svg';

export const TableRow: React.FC<TableRowProps> = ({ campaign, onDownload, onEdit, onDelete, onStart }) => {

  const [isHoveringStart, setIsHoveringStart] = useState(false);
  const [isHoveringDelete, setIsHoveringDelete] = useState(false);
  const [isHoveringEdit, setIsHoveringEdit] = useState(false);
  const [isHoveringDownload, setIsHoveringDownload] = useState(false);

  return (
    <div className={styles.tableCellRow}>
{/*      <div className={styles.cell}>
        <div className={styles.cellContent}>{campaign.id}</div>
      </div>
*/}      <div className={styles.cell}>
        <div className={styles.cellContent}>{campaign.name}</div>
      </div>
      <div className={styles.cell}>
        <div className={styles.cellContent}><StatusChip status={campaign.status} /></div>
      </div>
      <div className={styles.cell}>
        <div className={styles.cellContent}>{campaign.violationCount}</div>
      </div>
      <div className={styles.actionCell}>
      <button
                  className={styles.actionButton}
                  onClick={() => onStart(campaign.id)}
                  onMouseEnter={() => setIsHoveringStart(true)}
                  onMouseLeave={() => setIsHoveringStart(false)}
                  aria-label={`Start ${campaign.name}`}
                  disabled={campaign.status === 'READY'}
                >
                  <div className={styles.buttonContent}>
                  {isHoveringStart ? 'Start' : <img src={StartFill} className={styles.buttonIcon} alt="Start" />}                   
                  </div>
                </button>
                <button
          className={styles.actionButton}
          onClick={() => onEdit(campaign)}
          onMouseEnter={() => setIsHoveringEdit(true)}
          onMouseLeave={() => setIsHoveringEdit(false)}
          aria-label={`Edit ${campaign.name}`}
        >
          <div className={styles.buttonContent}>
            {isHoveringEdit ? 'Edit' : <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/290a98c58fd6ff11b6bb3c974f3f49ea50375d611a7fc5c322ece00569ad5402" className={styles.buttonIcon} alt="Edit" />}
          </div>
        </button>
                <button
                  className={styles.actionButton}
                  onClick={() => onDelete(campaign)}
                  onMouseEnter={() => setIsHoveringDelete(true)}
          onMouseLeave={() => setIsHoveringDelete(false)}
                  aria-label={`Delete ${campaign.name}`}
                >
                  <div className={styles.buttonContent}>
                  {isHoveringDelete ? 'Delete' : 
                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/2dece34272e8ea9ad59a9c4539c5fa65e60c9c38463f6b19ce518fa8c1a8f0f9?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740" 
                  className={styles.buttonIcon} alt="Delete" />}
                  </div>
                </button>
                <button
          className={styles.actionButton}
          onClick={() => onDownload(campaign)}
          onMouseEnter={() => setIsHoveringDownload(true)}
          onMouseLeave={() => setIsHoveringDownload(false)}
          disabled={campaign.status !== 'READY'}
          aria-label={`Download ${campaign.name}`}
        >
          <div className={styles.buttonContent}>
            {isHoveringDownload ? 'Download' : <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/7ae6762565aef009d714d78982d8dc804924878677efa3d3efe0c0a2cd0b4b68" className={styles.buttonIcon} alt="Download" />}
          </div>
        </button>        
      </div>
    </div>
  );
};
