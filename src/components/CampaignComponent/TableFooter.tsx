import React from 'react';
import styles from './Campaign.module.css';
import { TableFooterProps } from './types';

export const TableFooter: React.FC<TableFooterProps> = ({
  totalItems,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const startItem = (currentPage - 1) * 10 + 1;
  const endItem = Math.min(currentPage * 10, totalItems);

  return (
    <div className={styles.tableFooter}>
      <div className={styles.paginationContainer}>
        <div className={styles.paginationInfo}>
          {`${startItem}-${endItem} of ${totalItems}`}
        </div>
        <div className={styles.paginationControls}>
          <button
            className={styles.pageButton}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            &lt; Previous
          </button>
          <span className={styles.pageNumber}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={styles.pageButton}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  );
};