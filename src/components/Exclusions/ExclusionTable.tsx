import React, { useState } from 'react';
import styles from './Exclusion.module.css';
import { TableHeader } from './TableHeader.tsx';
import { TableRow } from './TableRow.tsx';
import { TableFooter } from '../CampaignComponent/TableFooter.tsx';
import { ExclusionTableProps } from '../../types/types';
export const ExclusionTable: React.FC<ExclusionTableProps> = ({ exclusions = [], onEdit, onDelete }) => {
  // Now `exclusions` is guaranteed to be an array, even if it's an empty array.
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

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <TableHeader label="Exclusion Name" sortable />
        <TableHeader label="Exclusion Rule" sortable />
        <TableHeader label="Action" />
      </div>
      <div className={styles.tableBody}>
        {currentExclusions.map((exclusion) => (
          <TableRow
            key={exclusion.id}
            exclusion={exclusion}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
      <TableFooter
        totalItems={exclusions.length}
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










  