import React from 'react';
import styles from './UserManagement.module.css';
import { userTableRowProps } from '../../types/types';
import  Editimg  from '../Dashboard/img/Editimg.svg';
import  Deleteimg  from '../Dashboard/img/Deleteimg.svg';

export const TableRow: React.FC<userTableRowProps> = ({ user, onEdit, onDelete }) => {
  return (
    <div className={styles.tableCellRow}>
      <div className={styles.cell}>
        <div className={styles.cellContent}>{user.username}</div>
      </div>
      <div className={styles.cell}>
        <div className={styles.cellContent}>{user.email}</div>
      </div>
      <div className={styles.cell}>
        <div className={styles.cellContent}>{user.fullName}</div>
      </div>
      <div className={styles.cell}>
        <div className={styles.cellContent}>{user.enabled ? "Yes" : "No"}</div>
      </div>
      <div className={styles.actionCell}>
        <button
          className={styles.actionButton}
          onClick={() => onEdit(user)}
          aria-label={`Edit ${user.fullName}`}
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
          onClick={() => onDelete(user.id)}
          aria-label={`Delete ${user.fullName}`}
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