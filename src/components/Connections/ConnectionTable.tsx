import React, { useState } from 'react';
import styles from './Connection.module.css';
import { TableHeader } from './TableHeader.tsx';
import { TableRow } from './TableRow.tsx';
import { TableFooter } from '../CampaignComponent/TableFooter.tsx';
import { ConnectionsTableProps } from '../../types/types';

export const ConnectionTable: React.FC<ConnectionsTableProps> = ({ connections, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalPages = Math.ceil(connections.length / rowsPerPage);


  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentConnections= connections.slice(startIndex, startIndex + rowsPerPage);


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
  
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <TableHeader label="Connection Name" sortable />
        <TableHeader label="Host" sortable />
        <TableHeader label="Port" sortable />
        <TableHeader label="Type" sortable />
        <TableHeader label="DB" sortable />
        <TableHeader label="User" sortable />
        <TableHeader label="Action" />
      </div>
      <div className={styles.tableBody}>
        {currentConnections.map((connection) => (
          <TableRow
            key={connection.id}
            connection={connection}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
      <TableFooter
        totalItems={connections.length}
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