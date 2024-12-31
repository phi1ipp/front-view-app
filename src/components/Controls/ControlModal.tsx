import React, { useState, useEffect } from 'react';
import styles from './ControlModal.module.css';
import { ControlModalProps, Control } from './types';

export const ControlModal: React.FC<ControlModalProps> = ({
  isOpen,
  onClose,
  control,
  onSubmit
}) => {
  const [formData, setFormData] = useState<Control>({
    name: '',
    hostport: '',
    loginId: '',
    password: ''
  });

  useEffect(() => {
    if (control) {
      setFormData(control);
    } else {
      setFormData({
        name: '',
        hostport: '',
        loginId: '',
        password: ''
      });
    }
  }, [control]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} role="dialog" aria-modal="true">
        <h2 className={styles.modalTitle}>
          {control ? 'Edit Control' : 'Create Control'}
        </h2>
        <form onSubmit={handleSubmit}>
        <div className={styles.formField}>
  <input
    id="Name"
    type="text"
    placeholder=" " // Placeholder for floating effect
    value={formData.name}
    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    required
  />
  <label htmlFor="name">Control Name</label>
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
  <label htmlFor="hostport">Entitlement 1</label>
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
  <label htmlFor="loginId">Entitlement 2</label>
  </div>

          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              {control ? 'Save' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};