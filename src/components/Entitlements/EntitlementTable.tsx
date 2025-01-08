import React, { useState } from 'react';
import styles from './Entitlement.module.css';
import { TableHeader } from './TableHeader.tsx';
import { TableRow } from './TableRow.tsx';
import { TableFooter } from './TableFooter.tsx';
import { EntitlementTableProps } from '../../types/types';

export const EntitlementTable: React.FC<EntitlementTableProps> = ({ entitlements, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <TableHeader label="Entitlement ID" sortable />
        <TableHeader label="Entitlemen Name" sortable />
        <TableHeader label="Function List" sortable />
        <TableHeader label="Action" />
      </div>
      <div className={styles.tableBody}>
        {entitlements.map((entitlement) => (
          <TableRow
            key={entitlement.id}
            entitlement={entitlement}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
      <TableFooter
        totalItems={entitlements.length}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
};