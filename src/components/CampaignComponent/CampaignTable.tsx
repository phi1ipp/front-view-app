import React, { useState } from 'react';
import styles from './Campaign.module.css';
import { TableHeader } from './TableHeader.tsx';
import { TableRow } from './TableRow.tsx';
import { TableFooter } from './TableFooter.tsx';
import { CampaignTableProps } from '../../types/types';
import { API_ENDPOINTS } from '../../types/api.ts';

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

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1); // Reset to the first page when rows per page changes
  };

  const handleDownload = async (campaign: Campaign) => {
    try {
      const response = await fetch(
        API_ENDPOINTS.CAMPAIGN_DOWNLOAD(campaign.name),
        {
          headers: {
            'Content-Type': 'application/octet-stream',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();

      // Create a URL for the blob and trigger the download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reports_${campaign.name}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading campaign reports:', error);
    }
  };


  
  // Calculate the campaigns to display based on pagination
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentCampaigns = campaigns.slice(startIndex, startIndex + rowsPerPage);

  
  const isNextDisabled = currentPage >= totalPages || currentCampaigns.length === 0;

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
        {currentCampaigns.map((campaign) => (
          <TableRow
            key={campaign.id}
            campaign={campaign}
            onDownload={onDownload}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
      <TableFooter
        totalItems={campaigns.length}
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