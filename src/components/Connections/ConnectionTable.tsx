import React, { useState } from 'react';
import { DataTable, TableFooter, Button, ICONS, Column } from '../shared';
import { ConnectionsTableProps, Connection } from '../../types/types';

const columns: Array<Column<Connection>> = [
  { key: 'name', label: 'Connection Name', sortable: true, flex: true, minWidth: 100, render: (c) => c.name },
  { key: 'host', label: 'Host', sortable: true, flex: true, minWidth: 100, render: (c) => c.host },
  { key: 'port', label: 'Port', sortable: true, flex: true, minWidth: 100, render: (c) => c.port },
  { key: 'type', label: 'Type', sortable: true, flex: true, minWidth: 100, render: (c) => c.type.toUpperCase() },
  { key: 'db', label: 'DB', sortable: true, flex: true, minWidth: 100, render: (c) => c.db },
  { key: 'user', label: 'User', sortable: true, flex: true, minWidth: 100, render: (c) => c.user },
];

export const ConnectionTable: React.FC<ConnectionsTableProps> = ({ connections, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalPages = Math.ceil(connections.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentConnections = connections.slice(startIndex, startIndex + rowsPerPage);
  const isNextDisabled = currentPage >= totalPages || currentConnections.length === 0;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  const allColumns: Array<Column<Connection>> = [
    ...columns,
    {
      key: 'actions',
      label: 'Action',
      isActions: true,
      render: (connection) => (
        <>
          <Button
            variant="ghost"
            icon={ICONS.edit}
            iconAlt="Edit"
            onClick={() => onEdit(connection)}
            ariaLabel={`Edit ${connection.name}`}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            icon={ICONS.delete}
            iconAlt="Delete"
            onClick={() => onDelete(String(connection.id))}
            ariaLabel={`Delete ${connection.name}`}
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
      rows={currentConnections}
      rowKey={(c) => String(c.id)}
      footer={
        <TableFooter
          totalItems={connections.length}
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
