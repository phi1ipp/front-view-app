import React, { useState, useEffect } from 'react';
import styles from './ControlModal.module.css';
import { ControlModalProps, Control } from './types';
import { v4 as uuidv4 } from 'uuid'; 

export const ControlModal: React.FC<ControlModalProps> = ({
  isOpen,
  onClose,
  control,
  onSubmit
}) => {
  const [formData, setFormData] = useState<Control>({
        name: '',
        ent1Name: '',
        ent2Name: '',
  });

  useEffect(() => {
    if (control) {
      setFormData(control);
    } else {
      setFormData({
        id: uuidv4(),
        name: '',
        ent1Name: '',
        ent2Name: '',
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
    id="ent1Name"
    type="text"
    placeholder=" "
    value={formData.ent1Name}
    onChange={(e) => setFormData({ ...formData, ent1Name: e.target.value })}
    required
  />
  <label htmlFor="entitlement1">Entitlement 1</label>
</div>
<div className={styles.formField}>
  <input
    id="ent2Name"
    type="text"
    placeholder=" "
    value={formData.ent2Name}
    onChange={(e) => setFormData({ ...formData, ent2Name: e.target.value })}
    required
  />
  <label htmlFor="entitlement2">Entitlement 2</label>
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