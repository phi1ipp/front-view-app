import React, { useState } from 'react';
import styles from '../Users/UserManagement.module.css';
import { TableHeader } from '../Users/TableHeader.tsx';
import { TableRow } from '../Users/TableRow.tsx';
import { TableFooter } from '../Users/TableFooter.tsx';
import { UserTableProps } from './types';

export const ConnectionsTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
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
        <TableHeader label="Campaign ID" sortable />
        <TableHeader label="Connection Name" sortable />
        <TableHeader label="Host Port" sortable />
        <TableHeader label="Login Id" sortable />
        <TableHeader label="Action" />
      </div>
      <div className={styles.tableBody}>
        {users.map((user) => (
          <TableRow
            key={user.userId}
            user={user}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
      <TableFooter
        totalItems={users.length}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
};