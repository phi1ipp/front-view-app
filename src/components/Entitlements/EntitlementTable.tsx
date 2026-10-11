import React, { useState } from 'react';
import { DataTable, TableFooter, Button, ICONS, Column } from '../shared';
import styles from '../shared/shared.module.css';
import { EntitlementTableProps, Entitlement } from '../../types/types';

interface AccessChip {
  id: string;
  name?: string;
  displayName?: string;
}

const renderAccessSet = (entitlement: Entitlement) => {
  const accessSet = entitlement.accessSet as unknown as AccessChip[] | string;

  if (Array.isArray(accessSet)) {
    return accessSet.map((access) => (
      <span key={access.id} className={styles.accessItem}>
        {access.displayName || access.id || 'Unknown'}
      </span>
    ));
  }

  return <span>{accessSet}</span>;
};

const columns: Array<Column<Entitlement>> = [
  {
    key: 'name',
    label: 'Entitlement Name',
    sortable: true,
    flex: true,
    minWidth: 150,
    maxWidth: 300,
    render: (e) => e.name,
  },
  {
    key: 'accessSet',
    label: 'Function List',
    sortable: true,
    flex: true,
    minWidth: 150,
    render: renderAccessSet,
  },
];

export const EntitlementTable: React.FC<EntitlementTableProps> = ({
  entitlements,
  onEdit,
  onDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalPages = Math.ceil(entitlements.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentEntitlements = entitlements.slice(startIndex, startIndex + rowsPerPage);
  const isNextDisabled = currentPage >= totalPages || currentEntitlements.length === 0;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  const allColumns: Array<Column<Entitlement>> = [
    ...columns,
    {
      key: 'actions',
      label: 'Action',
      isActions: true,
      maxWidth: 200,
      render: (entitlement) => (
        <>
          <Button
            variant="ghost"
            icon={ICONS.edit}
            iconAlt="Edit"
            onClick={() => onEdit(entitlement)}
            ariaLabel={`Edit ${entitlement.id}`}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            icon={ICONS.delete}
            iconAlt="Delete"
            onClick={() => onDelete(entitlement.id)}
            ariaLabel={`Delete ${entitlement.name}`}
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
      rows={currentEntitlements}
      rowKey={(e) => e.id}
      footer={
        <TableFooter
          totalItems={entitlements.length}
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
