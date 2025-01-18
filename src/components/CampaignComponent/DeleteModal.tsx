import React from 'react';
import styles from './DeleteModal.module.css';
import { DeleteModalProps } from '../../types/types';

export const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  campaign,
  onConfirm
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} role="dialog" aria-modal="true">
        <h2 className={styles.modalTitle}>Confirm Delete</h2>
        <p className={styles.modalText}>
          Are you sure you want to delete campaign {campaign.name}? This action cannot be undone.
        </p>
        <div className={styles.modalActions}>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
          <button
            onClick={() => onConfirm(campaign.name)}
            className={styles.deleteButton}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};