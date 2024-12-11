import React from 'react';
import styles from './Campaigns.module.css';
import { TableHeaderProps } from './types';

export const TableHeader: React.FC<TableHeaderProps> = ({ label, sortable }) => (
  <div className={styles.tableHead}>
    <div className={styles.headerText}>{label}</div>
    {sortable && (
      <div className={styles.sortIcon}>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b12a63bc13be902c28aa9340f7f815cf15812a7edd07e5e8d7d349c9145677d2?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740"
          alt="Sort column"
          className={styles.sortImage}
        />
      </div>
    )}
  </div>
);