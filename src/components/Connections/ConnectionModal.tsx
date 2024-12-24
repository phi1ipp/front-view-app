import React, { useState, useEffect } from 'react';
import styles from './ConnectionModal.module.css';
import { ConnectionModalProps, Connection } from './types';

export const ConnectionModal: React.FC<ConnectionModalProps> = ({
  isOpen,
  onClose,
  connection,
  onSubmit
}) => {
  const [formData, setFormData] = useState<Connection>({
    name: '',
    hostport: '',
    loginId: ''
  });

  useEffect(() => {
    if (connection) {
      setFormData(connection);
    } else {
      setFormData({
        name: '',
        hostport: '',
        loginId: ''
      });
    }
  }, [connection]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} role="dialog" aria-modal="true">
        <h2 className={styles.modalTitle}>
          {connection ? 'Edit Connection' : 'Create Connection'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formField}>
            <label htmlFor="name">Connection Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="fullName">Host and Port</label>
            <input
              id="hostport"
              type="text"
              value={formData.hostport}
              onChange={(e) => setFormData({...formData, hostport: e.target.value})}
              required
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="loginId">LoginId</label>
            <input
              id="loginId"
              type="text"
              value={formData.loginId}
              onChange={(e) => setFormData({...formData, loginId: e.target.value})}
              required
            />
          </div>
          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              {connection ? 'Save' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};