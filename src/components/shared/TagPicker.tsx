import React from 'react';
import styles from './shared.module.css';

export interface TagOption {
  id: string;
  name: string;
}

export interface TagPickerProps {
  options: TagOption[];
  selected: TagOption[];
  placeholder?: string;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
}

export const TagPicker: React.FC<TagPickerProps> = ({
  options,
  selected,
  placeholder = 'Select a function',
  onAdd,
  onRemove,
}) => {
  const available = options.filter(
    (option) => !selected.some((item) => item.id === option.id)
  );

  return (
    <>
      <div className={styles.formField}>
        <select
          className={styles.dropdown}
          value=""
          onChange={(e) => onAdd(e.target.value)}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {available.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.selectedList}>
        {selected.map((item) => (
          <div key={item.id} className={styles.selectedItem}>
            {item.name}
            <button
              type="button"
              className={styles.removeButton}
              onClick={() => onRemove(item.id)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
