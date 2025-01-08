import React, { useState, useEffect } from 'react';
import styles from './EntitlementModal.module.css';
import { EntitlementModalProps, Entitlement } from '../../types/types';
import { API_ENDPOINTS } from '../../types/api.ts';

export const EntitlementModal: React.FC<EntitlementModalProps> = ({
  isOpen,
  onClose: close,
  entitlement,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Entitlement>({
    id:'',
    name: '',
    accessSet: []
  });

  const onClose = () => {
    // Reset states to initial values when closing the modal
    setFormData({   id:'',
      name: '',
      accessSet: [] });  // Clear any errors
    close();  // Call the onClose prop function to officially close the modal
  };
  const [functions, setFunctions] = useState([]);

  useEffect(() => {
    fetchFunctions();
    if (entitlement) {
      setFormData({
        id:entitlement.id,
        name: entitlement.name,
        accessSet: entitlement.accessSet.map((access: any) => ({
          id: access.id,
          name: access.name,
        })),
      });
    } else {
      setFormData({
        id:'',
        name: '',
        accessSet: [],
      });
    }
  }, [entitlement]);

  const fetchFunctions = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.ENTITLEMENTS_ACCESSLIST);
      const data = await response.json();
      setFunctions(data);
    } catch (error) {
      console.error('Error fetching functions:', error);
    }
  };

  const handleAddFunction = (functionId: string) => {
    const functionToAdd = functions.find((func) => func.id === functionId);
    if (functionToAdd && !formData.accessSet.some((access) => access.id === functionId)) {
      setFormData({
        ...formData,
        accessSet: [...formData.accessSet, functionToAdd],
      });
    }
  };

  const handleRemoveFunction = (functionId: string) => {
    setFormData({
      ...formData,
      accessSet: formData.accessSet.filter((access) => access.id !== functionId),
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
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <label htmlFor="name">Entitlement Name</label>
          </div>

          <div className={styles.formField}>
            <select
              className={styles.dropdown}
              onChange={(e) => handleAddFunction(e.target.value)}
              value=""
            >
              <option value="" disabled>
                Select a function
              </option>
              {functions
                .filter((func) => !formData.accessSet.some((access) => access.id === func.id))
                .map((func) => (
                  <option key={func.id} value={func.id}>
                    {func.name}
                  </option>
                ))}
            </select>
          </div>

          <div className={styles.selectedList}>
            {formData.accessSet.map((selected) => (
              <div key={selected.id} className={styles.selectedItem}>
                {selected.name}
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => handleRemoveFunction(selected.id)}
                >
                  &times;
                </button>
              </div>
            ))}
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