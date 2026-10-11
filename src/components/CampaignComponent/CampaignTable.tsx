import React, { useState } from 'react';
import { DataTable, TableFooter, StatusChip, Column } from '../shared';
import { CampaignActions } from './CampaignActions';
import { CampaignTableProps, Campaign } from '../../types/types';

const statusKind = (status: string): 'warning' | 'success' | 'error' => {
  switch (status.toLowerCase()) {
    case 'ready':
      return 'success';
    case 'error':
      return 'error';
    default:
      return 'warning';
  }
};

const statusText = (dbStatus: string): string => {
  switch (dbStatus) {
    case 'ready':
      return 'Ready';
    case 'seed':
      return 'Needs data';
    case 'data':
      return 'Needs analysis';
    case 'transfer':
      return 'Data transfer';
    default:
      return 'Error';
  }
};

const columns: Array<Column<Campaign>> = [
  {
    key: 'name',
    label: 'Campaign Name',
    sortable: true,
    flex: true,
    minWidth: 150,
    render: (c) => c.name,
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    flex: true,
    minWidth: 150,
    render: (c) => (
      <StatusChip
        status={c.status}
        label={statusText(c.status.toLowerCase())}
        kind={statusKind(c.status)}
      />
    ),
  },
];

export const CampaignTable: React.FC<CampaignTableProps> = ({
  campaigns,
  onDownload,
  onEdit,
  onDelete,
  onStart,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalPages = Math.ceil(campaigns.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentCampaigns = campaigns.slice(startIndex, startIndex + rowsPerPage);
  const isNextDisabled = currentPage >= totalPages || currentCampaigns.length === 0;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  const allColumns: Array<Column<Campaign>> = [
    ...columns,
    {
      key: 'actions',
      label: 'Action',
      isActions: true,
      flex: true,
      minWidth: 150,
      render: (campaign) => (
        <CampaignActions
          campaign={campaign}
          onDownload={onDownload}
          onEdit={onEdit}
          onDelete={onDelete}
          onStart={onStart}
        />
      ),
    },
  ];

  return (
    <DataTable
      columns={allColumns}
      rows={currentCampaigns}
      rowKey={(c) => c.id}
      footer={
        <TableFooter
          totalItems={campaigns.length}
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
