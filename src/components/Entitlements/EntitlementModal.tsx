import React, { useState, useEffect } from 'react';
import styles from './EntitlementModal.module.css';
import { EntitlementModalProps, Entitlement } from './types';

export const EntitlementModal: React.FC<EntitlementModalProps> = ({
  isOpen,
  onClose,
  entitlement,
  onSubmit
}) => {
  const [formData, setFormData] = useState<Entitlement>({
    entitlementName: '',
    accessSet: [],
  });

  const [functions, setFunctions] = useState([]);


  useEffect(() => {
    fetchFunctions();
    if (entitlement) {
      setFormData(entitlement);
    } else {
      setFormData({
        entitlementId: '',
        entitlementName: '',
        accessSet: [],
      });
    }
  }, [entitlement]);

  const fetchFunctions = async () => {
    try {
      const response = await fetch('http://localhost:4000/campaignControls');
      const data = await response.json();
      setFunctions(data);
    } catch (error) {
      console.error('Error fetching functions:', error);
    }
  };

  const handleFunctionChange = (event) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setFormData({ ...formData, functionList: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} role="dialog" aria-modal="true">
        <h2 className={styles.modalTitle}>
          {entitlement ? 'Edit Entitlement' : 'Create Entitlement'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formField}>
            <input
              id="entitlementName"
              type="text"
              value={formData.entitlementName}
              onChange={(e) => setFormData({ ...formData, entitlementName: e.target.value })}
              required
              placeholder="Entitlement Name"
            />
            <label htmlFor="entitlementName">Entitlement Name</label>
          </div>
          <div className={styles.formField}>
            <label htmlFor="accessSet">Select Functions</label>
            <select
              id="accessSet"
              multiple
              value={formData.accessSet}
              onChange={handleFunctionChange}
              size="5" // Adjust size as needed
              required
            >
              {functions.map((func) => (
                <option key={func.id} value={func.id}>
                  {func.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              {entitlement ? 'Save' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
