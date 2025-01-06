import React, { useState } from 'react';
import styles from './UserManagement.module.css';
import { TableHeader } from './TableHeader.tsx';
import { TableRow } from './TableRow.tsx';
import { TableFooter } from './TableFooter.tsx';
import { UserTableProps } from './types';

export const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
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
        <TableHeader label="User Name" sortable />
        <TableHeader label="Full Name" sortable />
        <TableHeader label="Email" sortable />
        <TableHeader label="Enabled" />
        <TableHeader label="Action" />
      </div>
      <div className={styles.tableBody}>
        {users.map((user) => (
          <TableRow
            key={user.id}
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