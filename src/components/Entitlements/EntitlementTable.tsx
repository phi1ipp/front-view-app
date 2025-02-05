import React, { useState } from 'react';
import styles from './Entitlement.module.css';
import { TableHeader } from './TableHeader.tsx';
import { TableRow } from './TableRow.tsx';
import { TableFooter } from '../CampaignComponent/TableFooter.tsx';
import { EntitlementTableProps } from '../../types/types';

export const EntitlementTable: React.FC<EntitlementTableProps> = ({ entitlements, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalPages = Math.ceil(entitlements.length / rowsPerPage);
  
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1); // Reset to the first page when rows per page changes
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentEntitlements= entitlements.slice(startIndex, startIndex + rowsPerPage);

  
  const isNextDisabled = currentPage >= totalPages || currentEntitlements.length === 0;

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <TableHeader label="Entitlement Name" sortable />
        <TableHeader label="Function List" sortable />
        <TableHeader label="Action" />
      </div>
      <div className={styles.tableBody}>
        {currentEntitlements.map((entitlement) => (
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
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        isNextDisabled={isNextDisabled} 
      />
    </div>
  );
};