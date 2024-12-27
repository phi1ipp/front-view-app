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
    loginId: '',
    password: ''
  });

  useEffect(() => {
    if (connection) {
      setFormData(connection);
    } else {
      setFormData({
        name: '',
        hostport: '',
        loginId: '',
        password: ''
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
  <input
    id="name"
    type="text"
    placeholder=" " // Placeholder for floating effect
    value={formData.name}
    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    required
  />
  <label htmlFor="name">Connection Name</label>
</div>
<div className={styles.formField}>
  <input
    id="hostport"
    type="text"
    placeholder=" "
    value={formData.hostport}
    onChange={(e) => setFormData({ ...formData, hostport: e.target.value })}
    required
  />
  <label htmlFor="hostport">Host Name Port</label>
</div>
<div className={styles.formField}>
  <input
    id="loginId"
    type="text"
    placeholder=" "
    value={formData.loginId}
    onChange={(e) => setFormData({ ...formData, loginId: e.target.value })}
    required
  />
  <label htmlFor="loginId">Login Id</label>
  </div>
<div className={styles.formField}>
  <input
    id="password"
    type="password"
    placeholder=" "
    value={formData.password}
    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
    required
  />

<label htmlFor="password">Password</label>
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