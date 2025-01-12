import React from 'react';
import styles from './Entitlement.module.css';
import { EntitlementTableProps } from '../../types/types';
import  Editimg  from '../Dashboard/img/Editimg.svg';
import  Deleteimg  from '../Dashboard/img/Deleteimg.svg';

export const TableRow: React.FC<EntitlementTableProps> = ({ entitlement, onEdit, onDelete }) => {
  return (
    <div className={styles.tableCellRow}>
      <div className={styles.cell}>
        <div className={styles.cellContent}>{entitlement.n}</div>
      </div>
     <div className={styles.cell}>
        <div className={styles.cellContent}>
          {Array.isArray(entitlement.accessSet) ? (
            entitlement.accessSet.map((access: any) => (
              // Use access.id as the key to ensure uniqueness
              <span key={access.id} className={styles.accessItem}>
                {access.displayName || access.id || 'Unknown'} {/* Adjust based on your object properties */}
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
              src={Editimg} 
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
              src={Deleteimg}
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