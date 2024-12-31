import React, { useState } from 'react';
import styles from './Control.module.css';
import { TableHeader } from './TableHeader.tsx';
import { TableRow } from './TableRow.tsx';
import { TableFooter } from './TableFooter.tsx';
import { ControlsTableProps } from './types';

export const ControlTable: React.FC<ControlsTableProps> = ({controls, onEdit, onDelete }) => {
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
        <TableHeader label="Control Name" sortable />
        <TableHeader label="Entitlement1" sortable />
        <TableHeader label="Entitlement2" sortable />
        <TableHeader label="Action" />
      </div>
      <div className={styles.tableBody}>
        {controls.map((control) => (
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
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
};