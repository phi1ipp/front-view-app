import React from 'react';
import styles from './Connection.module.css';
import { TableRowPropsConnection } from '../../types/types';
import  Editimg  from '../Dashboard/img/Editimg.svg';
import  Deleteimg  from '../Dashboard/img/Deleteimg.svg';

export const TableRow: React.FC<TableRowPropsConnection> = ({ connection, onEdit, onDelete }) => {
  return (
    <div className={styles.tableCellRow}>
      <div className={styles.cell}>
        <div className={styles.cellContent}>{connection.name}</div>
      </div>
      <div className={styles.cell}>
        <div className={styles.cellContent}>{connection.host}</div>
      </div>
      <div className={styles.cell}>
        <div className={styles.cellContent}>{connection.port}</div>
      </div>
      <div className={styles.cell}>
        <div className={styles.cellContent}>{connection.db}</div>
      </div>
      <div className={styles.cell}>
        <div className={styles.cellContent}>{connection.user}</div>
      </div>
      <div className={styles.actionCell}>
        <button
          className={styles.actionButton}
          onClick={() => onEdit(connection)}
          aria-label={`Edit ${connection.name}`}
        >
          <div className={styles.buttonContent}>
            <img
              loading="lazy"
              src={Editimg}
              alt="Edit"
            />
            <span className={styles.buttonText}>Edit</span>
          </div>
        </button>
        <button
          className={styles.actionButton}
          onClick={() => onDelete(connection.id)}
          aria-label={`Delete ${connection.name}`}
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