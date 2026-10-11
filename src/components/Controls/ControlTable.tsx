import React, { useState } from 'react';
import { DataTable, TableFooter, Button, ICONS, Column } from '../shared';
import { ControlTableProps, Controls, isSaControl } from '../../types/types';

const columns: Array<Column<Controls>> = [
  { key: 'name', label: 'Control Name', sortable: true, flex: true, minWidth: 150, render: (c) => c.name },
  {
    key: 'ent1',
    label: 'Entitlement1',
    sortable: true,
    flex: true,
    minWidth: 150,
    render: (c) => (isSaControl(c) ? c.entName : c.ent1Name),
  },
  {
    key: 'ent2',
    label: 'Entitlement2',
    sortable: true,
    flex: true,
    minWidth: 150,
    render: (c) => ('ent2Name' in c ? c.ent2Name : ''),
  },
];

export const ControlTable: React.FC<ControlTableProps> = ({ controls, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalPages = Math.ceil(controls.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentControls = controls.slice(startIndex, startIndex + rowsPerPage);
  const isNextDisabled = currentPage >= totalPages || currentControls.length === 0;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  const allColumns: Array<Column<Controls>> = [
    ...columns,
    {
      key: 'actions',
      label: 'Action',
      isActions: true,
      flex: true,
      minWidth: 150,
      render: (control) => (
        <>
          <Button
            variant="ghost"
            icon={ICONS.edit}
            iconAlt="Edit"
            onClick={() => onEdit(control)}
            ariaLabel={`Edit ${control.name}`}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            icon={ICONS.delete}
            iconAlt="Delete"
            onClick={() => onDelete(String(control.id))}
            ariaLabel={`Delete ${control.name}`}
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
      rows={currentControls}
      rowKey={(c) => String(c.id)}
      footer={
        <TableFooter
          totalItems={controls.length}
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
