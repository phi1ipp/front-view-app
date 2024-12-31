import React from 'react';
import styles from './Control.module.css';
import { TableHeaderProps } from './types';

export const TableHeader: React.FC<TableHeaderProps> = ({ label, sortable, onSort }) => {
  return (
    <div className={styles.tableHead} onClick={sortable ? onSort : undefined}>
      <div className={styles.head}>{label}</div>
      {sortable && (
        <div className={styles.mask}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b12a63bc13be902c28aa9340f7f815cf15812a7edd07e5e8d7d349c9145677d2?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740"
            className={styles.img}
            alt={`Sort ${label}`}
          />
        </div>
      )}
    </div>
  );
};