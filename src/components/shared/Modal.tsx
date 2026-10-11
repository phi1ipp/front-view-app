import React from 'react';
import styles from './shared.module.css';
import { Button } from './Button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  maxWidth?: number;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  maxWidth = 500,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        style={{ maxWidth }}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={styles.modalTitle}>{title}</h2>
        {children}
      </div>
    </div>
  );
};

export const ModalText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className={styles.modalText}>{children}</p>
);

export const ModalActions: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={styles.modalActions}>{children}</div>
);

export interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  onConfirm: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  message = 'Are you sure you want to delete? This action cannot be undone.',
  onConfirm,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Confirm Delete" maxWidth={400}>
    <ModalText>{message}</ModalText>
    <ModalActions>
      <Button variant="ghost" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="danger" onClick={onConfirm}>
        Delete
      </Button>
    </ModalActions>
  </Modal>
);
