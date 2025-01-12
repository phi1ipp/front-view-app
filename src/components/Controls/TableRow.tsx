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