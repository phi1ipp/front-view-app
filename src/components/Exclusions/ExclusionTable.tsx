import React, { useState } from 'react';
import { DataTable, TableFooter, Button, ICONS, Column } from '../shared';
import { ExclusionTableProps, Exclusion } from '../../types/types';

const columns: Array<Column<Exclusion>> = [
  {
    key: 'name',
    label: 'Exclusion Name',
    sortable: true,
    flex: true,
    minWidth: 150,
    maxWidth: 300,
    render: (e) => e.name,
  },
  {
    key: 'rule',
    label: 'Exclusion Rule',
    sortable: true,
    flex: true,
    minWidth: 150,
    render: (e) => e.rule,
  },
];

export const ExclusionTable: React.FC<ExclusionTableProps> = ({
  exclusions = [],
  onEdit,
  onDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalPages = Math.ceil(exclusions.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentExclusions = exclusions.slice(startIndex, startIndex + rowsPerPage);
  const isNextDisabled = currentPage >= totalPages || currentExclusions.length === 0;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  const allColumns: Array<Column<Exclusion>> = [
    ...columns,
    {
      key: 'actions',
      label: 'Action',
      isActions: true,
      maxWidth: 200,
      render: (exclusion) => (
        <>
          <Button
            variant="ghost"
            icon={ICONS.edit}
            iconAlt="Edit"
            onClick={() => onEdit(exclusion)}
            ariaLabel="Edit"
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            icon={ICONS.delete}
            iconAlt="Delete"
            onClick={() => onDelete(exclusion.id)}
            ariaLabel="Delete"
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
      rows={currentExclusions}
      rowKey={(e) => e.id}
      footer={
        <TableFooter
          totalItems={exclusions.length}
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
