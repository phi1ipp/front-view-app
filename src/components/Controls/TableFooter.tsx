import React from 'react';
import styles from './Control.module.css';
import { TableFooterProps } from './types';

export const TableFooter: React.FC<TableFooterProps> = ({
  totalItems,
    currentPage,
    totalPages,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    isNextDisabled, // ✅ New prop to handle "Next" button state
  }) => {
    const startItem = (currentPage - 1) * rowsPerPage + 1;
    const endItem = Math.min(currentPage * rowsPerPage, totalItems);
  
    return (
      <div className={styles.tableFooter}>
        <div className={styles.paginationContainer}>
          <div className={styles.rowsPerPage}>
            <span>Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => onRowsPerPageChange(parseInt(e.target.value, 10))}
              className={styles.rowSelector}
            >
              {[5, 10, 20, 50].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
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
              disabled={isNextDisabled} 
              aria-label="Next page"
            >
              Next &gt;
            </button>
          </div>
        </div>
      </div>
    );
  };