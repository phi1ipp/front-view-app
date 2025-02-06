import React from 'react';
import styles from './UserManagement.module.css';
import { UserTableRowProps } from '../../types/types';

export const TableRow: React.FC<UserTableRowProps> = ({ user, onEdit, onDelete }) => {
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
        <div className={styles.cellContent}>{user.isAdmin ? "✅" : "❌"}</div>
      </div>
      <div className={styles.cell}>
        <div className={styles.cellContent}>{user.enabled ? "✅" : "❌"}</div>
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
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/290a98c58fd6ff11b6bb3c974f3f49ea50375d611a7fc5c322ece00569ad5402?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740"
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