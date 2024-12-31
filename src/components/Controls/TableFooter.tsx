import React from 'react';
import styles from './Control.module.css';
import { TableFooterProps } from './types';

export const TableFooter: React.FC<TableFooterProps> = ({
  totalItems,
  currentPage,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange
}) => {
  const startItem = (currentPage - 1) * rowsPerPage + 1;
  const endItem = Math.min(currentPage * rowsPerPage, totalItems);

  return (
    <div className={styles.tableFooter}>
      <div className={styles.paginationContainer}>
        <div className={styles.rowsPerPage}>
          <span>Rows per page:</span>
          <div className={styles.rowSelector}>
            <span>{rowsPerPage}</span>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ee9bc83447ebd345e6fb673f2a5844fc7a7902c83fb6e44607ea5696617eaa38?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740"
              alt="Select rows per page"
              className={styles.dropdownIcon}
            />
          </div>
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
            disabled={endItem === totalItems}
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