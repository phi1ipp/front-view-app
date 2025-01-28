import React from 'react';
import styles from './Campaign.module.css';
import { TableFooterProps } from './types';

export const TableFooter: React.FC<TableFooterProps> = ({
  totalItems,
  currentPage,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startItem = (currentPage - 1) * rowsPerPage + 1;
  const endItem = Math.min(currentPage * rowsPerPage, totalItems);

  const handleRowsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
  };

  return (
    <div className={styles.tableFooter}>
      <div className={styles.paginationContainer}>
        <div className={styles.rowsPerPage}>
          <span>Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={handleRowsChange}
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
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/02a0da98b2611369f410df3a23d51a3c3a98bb1015cacca893a1c36a76e16f9a?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740"
              alt="Previous"
              className={styles.pageButtonIcon}
            />
          </button>
          <button
            className={styles.pageButton}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b4608d1988e70018595556c3c26823efc666bca62fa6ad93cfa773d0dd82ca2?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740"
              alt="Next"
              className={styles.pageButtonIcon}
            />
          </button>
        </div>
      </div>
    </div>
  );
};