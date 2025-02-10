import React, { useState, useEffect } from 'react';
import styles from './ExclusionModal.module.css';
import { ExclusionModalProps, Exclusion } from '../../types/types';


export const ExclusionModal: React.FC<ExclusionModalProps> = ({
  isOpen,
  onClose:close,
  exclusion,
  onSubmit
}) => {
  const [formData, setFormData] = useState<Exclusion>({
    id: '',
    rule: ''
  });

  const onClose = () => {
    // Reset states to initial values when closing the modal
    setFormData({  id: '',
      rule: ''});  // Clear any errors
    close();  // Call the onClose prop function to officially close the modal
  };
  useEffect(() => {
    if (exclusion) {
      setFormData(exclusion);
    } else {
      setFormData({
       id: '',
      rule: ''
      });
    }
  }, [exclusion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} role="dialog" aria-modal="true">
        <h2 className={styles.modalTitle}>
          {exclusion ? 'Edit Exclusion Rule' : 'Create Exclusion Rule'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className={formData.id ? styles.formFieldHidden : styles.formField}>
            <input
              id="id"
              type="text"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              required
              placeholder=" "
              readOnly={formData.id}
            />
            <label htmlFor="id">Exclusion ID</label>
          </div>
          <div className={styles.formField}>
            <input
              id="name"
              type="name"
              value={formData.rule}
              onChange={(e) => setFormData({ ...formData, rule: e.target.value })}
              required
              placeholder=" "
            />
            <label htmlFor="name">Exclusion Rule</label>
          </div>
         
          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              {exclusion ? 'Save' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};