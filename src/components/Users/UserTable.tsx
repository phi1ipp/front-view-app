import React, { useState } from 'react';
import styles from './UserManagement.module.css';
import { TableHeader } from './TableHeader.tsx';
import { TableRow } from './TableRow.tsx';
import { TableFooter } from '../CampaignComponent/TableFooter.tsx';
import { UserTableProps } from '../../types/types';

export const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalPages = Math.ceil(users.length / rowsPerPage);

  // Calculate the users to display based on pagination
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentUsers = users.slice(startIndex, startIndex + rowsPerPage);


  const isNextDisabled = currentPage >= totalPages || currentUsers.length === 0;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <TableHeader label="User Name" sortable />
        <TableHeader label="Email" sortable />
        <TableHeader label="Full Name" sortable />
        <TableHeader label="Admin?" />
        <TableHeader label="Enabled?" />
        <TableHeader label="Action" />
      </div>
      <div className={styles.tableBody}>
        {currentUsers.map((user) => (
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
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        isNextDisabled={isNextDisabled} 
      />
    </div>
  );
};