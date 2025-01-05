import React from 'react';
import styles from './Entitlement.module.css';
import { TableRowProps } from './types';

export const TableRow: React.FC<TableRowProps> = ({ entitlement, onEdit, onDelete }) => {
  return (
    <div className={styles.tableCellRow}>
      <div className={styles.cell}>
        <div className={styles.cellContent}>{entitlement.id}</div>
      </div>
      <div className={styles.cell}>
        <div className={styles.cellContent}>{entitlement.name}</div>
      </div>
     <div className={styles.cell}>
        <div className={styles.cellContent}>
          {Array.isArray(entitlement.accessSet) ? (
            entitlement.accessSet.map((access: any) => (
              // Use access.id as the key to ensure uniqueness
              <span key={access.id} className={styles.accessItem}>
                {access.name || access.id || 'Unknown'} {/* Adjust based on your object properties */}
              </span>
            ))
          ) : (
            <span>{entitlement.accessSet}</span>
          )}
        </div>
      </div>
      <div className={styles.actionCell}>
        <button
          className={styles.actionButton}
          onClick={() => onEdit(entitlement)}
          aria-label={`Edit ${entitlement.id}`}
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
          onClick={() => onDelete(entitlement.id)}
          aria-label={`Delete ${entitlement.entitlementName}`}
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