import React from 'react';
import styles from './shared.module.css';
import { ICONS } from './icons';

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  minWidth?: number;
  maxWidth?: number;
  flex?: boolean;
  isActions?: boolean;
  render: (row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: Array<Column<T>>;
  rows: Array<T>;
  rowKey: (row: T) => string;
  onSort?: (key: string) => void;
  sortIcon?: string;
  footer?: React.ReactNode;
}

const cellStyle = <T,>(col: Column<T>): React.CSSProperties => ({
  flex: col.flex ? 1 : undefined,
  minWidth: col.minWidth,
  maxWidth: col.maxWidth,
});

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  onSort,
  sortIcon = ICONS.sort,
  footer,
}: DataTableProps<T>) {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        {columns.map((col) => (
          <div
            key={col.key}
            className={styles.tableHead}
            style={cellStyle(col)}
            onClick={col.sortable && onSort ? () => onSort(col.key) : undefined}
          >
            <div className={styles.tableHeadLabel}>{col.label}</div>
            {col.sortable && (
              <img src={sortIcon} alt={`Sort ${col.label}`} className={styles.sortIcon} loading="lazy" />
            )}
          </div>
        ))}
      </div>
      <div className={styles.tableBody}>
        {rows.map((row) => (
          <div key={rowKey(row)} className={styles.tableRow}>
            {columns.map((col) =>
              col.isActions ? (
                <div key={col.key} className={styles.actionCell} style={cellStyle(col)}>
                  {col.render(row)}
                </div>
              ) : (
                <div key={col.key} className={styles.cell} style={cellStyle(col)}>
                  <div className={styles.cellContent}>{col.render(row)}</div>
                </div>
              )
            )}
          </div>
        ))}
      </div>
      {footer}
    </div>
  );
}
