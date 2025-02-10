import React from 'react';
import styles from './Exclusion.module.css';
import { ExclusionTableRowProps } from '../../types/types';

export const TableRow: React.FC<ExclusionTableRowProps> = ({ exclusion, onEdit, onDelete }) => {
  return (
    <div className={styles.tableCellRow}>
      <div className={styles.cell}>
        <div className={styles.cellContent}>{exclusion.id}</div>
      </div>
      <div className={styles.cell}>
        <div className={styles.cellContent}>{exclusion.rule}</div>
      </div>
      <div className={styles.actionCell}>
        <button
          className={styles.actionButton}
          onClick={() => onEdit(exclusion)}
          aria-label={`Edit`}
        >
          <div className={styles.buttonContent}>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/290a98c58fd6ff11b6bb3c974f3f49ea50375d611a7fc5c322ece00569ad5402?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740"
              className={styles.buttonIcon}
              alt="Edit"
            />
            <span className={styles.buttonText}>Edit</span>
          </div>
        </button>
        <button
          className={styles.actionButton}
          onClick={() => onDelete(exclusion.id)}
          aria-label={`Delete`}
        >
          <div className={styles.buttonContent}>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2dece34272e8ea9ad59a9c4539c5fa65e60c9c38463f6b19ce518fa8c1a8f0f9?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740"
              className={styles.buttonIcon}
              alt="Delete"
            />
            <span className={styles.buttonText}>Delete</span>
          </div>
        </button>
      </div>
    </div>
  );
};