import React from 'react';
import styles from './shared.module.css';
import { TagOption } from './TagPicker';

export interface DualListProps {
  available: TagOption[];
  selected: TagOption[];
  availableTitle?: string;
  selectedTitle?: string;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  onAddAll: () => void;
  onRemoveAll: () => void;
}

export const DualList: React.FC<DualListProps> = ({
  available,
  selected,
  availableTitle = 'Available Controls',
  selectedTitle = 'Selected Controls',
  onAdd,
  onRemove,
  onAddAll,
  onRemoveAll,
}) => (
  <div className={styles.dualList}>
    <div className={styles.dualListPanel}>
      <h3 className={styles.dualListHeader}>{availableTitle}</h3>
      <ul className={styles.dualListScroll}>
        {available.length > 0 ? (
          available.map((item) => (
            <li key={item.id}>
              <button type="button" className={styles.dualListItem} onClick={() => onAdd(item.id)}>
                {item.name}
              </button>
            </li>
          ))
        ) : (
          <li className={styles.dualListEmpty}>No Available Controls</li>
        )}
      </ul>
    </div>
    <div className={styles.dualListActions}>
      <button type="button" onClick={onAddAll} aria-label="Add all">
        &gt;&gt;
      </button>
      <button type="button" onClick={onRemoveAll} aria-label="Remove all">
        &lt;&lt;
      </button>
    </div>
    <div className={styles.dualListPanel}>
      <h3 className={styles.dualListHeader}>{selectedTitle}</h3>
      <ul className={styles.dualListScroll}>
        {selected.length > 0 ? (
          selected.map((item) => (
            <li key={item.id}>
              <button type="button" className={styles.dualListItem} onClick={() => onRemove(item.id)}>
                {item.name}
              </button>
            </li>
          ))
        ) : (
          <li className={styles.dualListEmpty}>No Selected Controls</li>
        )}
      </ul>
    </div>
  </div>
);
