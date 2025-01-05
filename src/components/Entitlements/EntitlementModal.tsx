import React, { useState, useEffect } from 'react';
import styles from './EntitlementModal.module.css';
import { EntitlementModalProps, Entitlement } from './types';

export const EntitlementModal: React.FC<EntitlementModalProps> = ({
  isOpen,
  onClose,
  entitlement,
  onSubmit,
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

  const handleAddFunction = (functionId: string) => {
    if (!formData.accessSet.includes(functionId)) {
      setFormData({
        ...formData,
        accessSet: [...formData.accessSet, functionId],
      });
    }
  };

  const handleRemoveFunction = (functionId: string) => {
    setFormData({
      ...formData,
      accessSet: formData.accessSet.filter((id) => id !== functionId),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
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
              onChange={(e) =>
                setFormData({ ...formData, entitlementName: e.target.value })
              }
              required
            />
            <label htmlFor="entitlementName">Entitlement Name</label>
          </div>

          {/* Dropdown to select functions */}
          <div className={styles.formField}>
            <select
              className={styles.dropdown}
              onChange={(e) => {
                handleAddFunction(e.target.value);
                e.target.value = ''; // Reset dropdown after selection
              }}
              value=""
            >
              <option value="" disabled>
                Select a function
              </option>
              {functions
                .filter((func) => !formData.accessSet.includes(func.id))
                .map((func) => (
                  <option key={func.id} value={func.id}>
                    {func.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Display selected functions below */}
          <div className={styles.selectedList}>
            {formData.accessSet.map((selectedId) => {
              const selectedFunction = functions.find(
                (func) => func.id === selectedId
              );
              return (
                <div key={selectedId} className={styles.selectedItem}>
                  {selectedFunction?.name}
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => handleRemoveFunction(selectedId)}
                  >
                    &times;
                  </button>
                </div>
              );
            })}
          </div>

          <div className={styles.modalActions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
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