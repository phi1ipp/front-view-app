import React from 'react';
import styles from './Control.module.css';
import { TableRowProps } from './types';
import  Editimg  from '../Dashboard/img/Editimg.svg';
import  Deleteimg  from '../Dashboard/img/Deleteimg.svg';

export const TableRow: React.FC<TableRowProps> = ({ control, onEdit, onDelete }) => {
  return (
    <div className={styles.tableCellRow}>
      
      <div className={styles.cell}>
        <div className={styles.cellContent}>{control.name}</div>
      </div>
      <div className={styles.cell}>
        <div className={styles.cellContent}>{control.ent1Name}</div>
      </div>
      <div className={styles.cell}>
        <div className={styles.cellContent}>{control.ent2Name}</div>
      </div>
      <div className={styles.actionCell}>
        <button
          className={styles.actionButton}
          onClick={() => onEdit(control)}
          aria-label={`Edit ${control.name}`}
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
          onClick={() => onDelete(control.id)}
          aria-label={`Delete ${control.name}`}
        >
          <div className={styles.buttonContent}>
            <img
              loading="lazy"
              src={Deleteimg}              className={styles.buttonIcon}
              alt="Delete"
            />
            <span className={styles.buttonText}>Delete</span>
          </div>
        </button>
      </div>
    </div>
  );
};