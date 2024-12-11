import React from 'react';
import styles from './Campaigns.module.css';
import { TableHeader } from './TableHeader.tsx';
import { TableRow } from './TableRow.tsx';
import { CampaignData } from './types';

const campaignData: CampaignData[] = [
  { id: '10', name: 'Campaign 10', status: 'Running', violationCount: 1234 },
  { id: '1', name: 'Campaign 1', status: 'Completed', violationCount: 1234 },
  { id: '2', name: 'Campaign 2', status: 'Error', violationCount: 1234 },
  { id: '3', name: 'Campaign 3', status: 'Completed', violationCount: 1234 },
  { id: '4', name: 'Campaign 4', status: 'Running', violationCount: 1234 }
];

export const CampaignsTable: React.FC = () => {
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
        {campaignData.map((campaign) => (
          <TableRow
            key={campaign.id}
            campaign={campaign}
            onDownload={handleDownload}
          />
        ))}
      </div>
      <div className={styles.tableFooter}>
        <div className={styles.paginationContainer}>
          <div className={styles.rowsPerPage}>
            <span>Rows per page:</span>
            <div className={styles.rowSelector}>
              <span>10</span>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ee9bc83447ebd345e6fb673f2a5844fc7a7902c83fb6e44607ea5696617eaa38?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740"
                alt=""
                className={styles.dropdownIcon}
              />
            </div>
          </div>
          <div className={styles.paginationInfo}>1-5 of 13</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e05b104b94592e4fba2b040af7eb5911c3cd53cde2d34fd859120c5ba67dabb?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740"
            alt="Pagination controls"
            className={styles.paginationControls}
          />
        </div>
      </div>
    </div>
  );
};