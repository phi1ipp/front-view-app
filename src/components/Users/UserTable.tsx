import React, { useState } from 'react';
import { DataTable, TableFooter, Button, ICONS, Column } from '../shared';
import { UserTableProps, User } from '../../types/types';

const columns: Array<Column<User>> = [
  { key: 'username', label: 'User Name', sortable: true, flex: true, minWidth: 150, render: (u) => u.username },
  { key: 'email', label: 'Email', sortable: true, flex: true, minWidth: 150, render: (u) => u.email },
  { key: 'fullName', label: 'Full Name', sortable: true, flex: true, minWidth: 150, render: (u) => u.fullName },
  { key: 'isAdmin', label: 'Admin?', flex: true, minWidth: 150, render: (u) => (u.isAdmin ? '✅' : '❌') },
  { key: 'enabled', label: 'Enabled?', flex: true, minWidth: 150, render: (u) => (u.enabled ? '✅' : '❌') },
];

export const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalPages = Math.ceil(users.length / rowsPerPage);

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

  const allColumns: Array<Column<User>> = [
    ...columns,
    {
      key: 'actions',
      label: 'Action',
      isActions: true,
      render: (user) => (
        <>
          <Button
            variant="ghost"
            icon={ICONS.edit}
            iconAlt="Edit"
            onClick={() => onEdit(user)}
            ariaLabel={`Edit ${user.fullName}`}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            icon={ICONS.delete}
            iconAlt="Delete"
            onClick={() => onDelete(user.username)}
            ariaLabel={`Delete ${user.fullName}`}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <DataTable
      columns={allColumns}
      rows={currentUsers}
      rowKey={(u) => u.username}
      footer={
        <TableFooter
          totalItems={users.length}
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          isNextDisabled={isNextDisabled}
        />
      }
    />
  );
};
