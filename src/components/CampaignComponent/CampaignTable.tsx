import React, { useState } from 'react';
import styles from './Campaign.module.css';
import { TableHeader } from './TableHeader.tsx';
import { TableRow } from './TableRow.tsx';
import { TableFooter } from './TableFooter.tsx';
import { CampaignTableProps } from '../../types/types';

export const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns, onEdit, onDelete,onStart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };
  const handleDownload = () => {
    // Handle download logic
  };
  
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <TableHeader label="Campaign ID" sortable />
        <TableHeader label="Campaign Name" sortable />
        <TableHeader label="Status" sortable />
        <TableHeader label="Violation Count" sortable />
        <TableHeader label="Action" />
      </div>
      <div className={styles.tableBody}>
        {campaigns.map((campaign) => (
                 <TableRow
                   key={campaign.id}
                   campaign={campaign}
                   onDownload={handleDownload}
                   onEdit={onEdit}
            onDelete={onDelete}
                 />
        ))}
      </div>
      <TableFooter
        totalItems={campaigns.length}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
};