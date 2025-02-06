import React, { useState } from 'react';
import styles from './Control.module.css';
import { TableHeader } from './TableHeader.tsx';
import { TableRow } from './TableRow.tsx';
import { TableFooter } from '../CampaignComponent/TableFooter.tsx';
import { ControlTableProps } from '../../types/types';

export const ControlTable: React.FC<ControlTableProps> = ({controls, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalPages = Math.ceil(controls.length / rowsPerPage);
  
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
  const currentControls = controls.slice(startIndex, startIndex + rowsPerPage);

  
  const isNextDisabled = currentPage >= totalPages || currentControls.length === 0;
  
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <TableHeader label="Control Name" sortable />
        <TableHeader label="Entitlement1" sortable />
        <TableHeader label="Entitlement2" sortable />
        <TableHeader label="Action" />
      </div>
      <div className={styles.tableBody}>
        {currentControls.map((control) => (
          <TableRow
            key={control.id}
            control={control}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
      <TableFooter
        totalItems={controls.length}
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