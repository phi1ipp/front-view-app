import React, { useState } from 'react';
import styles from './Connection.module.css';
import { TableHeader } from './TableHeader.tsx';
import { TableRow } from './TableRow.tsx';
import { TableFooter } from './TableFooter.tsx';
import { ConnectionsTableProps } from './types';

export const ConnectionTable: React.FC<ConnectionsTableProps> = ({ connections, onEdit, onDelete }) => {
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
        <TableHeader label="Connection Name" sortable />
        <TableHeader label="Host" sortable />
        <TableHeader label="Port" sortable />
        <TableHeader label="Login Id" sortable />
        <TableHeader label="Action" />
      </div>
      <div className={styles.tableBody}>
        {connections.map((connection) => (
          <TableRow
            key={connection.id}
            connection={connection}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
      <TableFooter
        totalItems={connections.length}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
};