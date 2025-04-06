import React, { useState, useEffect } from 'react';
import styles from './ControlModal.module.css';
import { ControlModalProps, Controls, isSodControl } from '../../types/types.ts';
import { API_ENDPOINTS } from '../../types/api.ts';

export const ControlModal: React.FC<ControlModalProps> = ({
  isOpen,
  onClose: close,
  control,
  onSubmit
}) => {

  const [controlType, setControlType] = useState<'SA' | 'SOD'>('SA');
  const [formData, setFormData] = useState<Controls>(
    controlType === 'SA' 
        ? {
            id: 0,
            name: '',
            description: '',
            type: 'SA',
            entId: 0,
            entName: ''
        } as GrcSaControl
        : {
            id: 0,
            name: '',
            description: '',
            type: 'SOD',
            ent1Id: 0,
            ent2Id: 0,
            ent1Name: '',
            ent2Name: ''
        } as GrcSodControl
);

  const onClose = () => {
    // Reset states to initial values when closing the modal
    setControlType('SA');
    setFormData({ name: '', entName: '', entId: 0 } as GrcSaControl);

    setEntitlementOptions1([]);
    setEntitlementOptions2([]);
    setError(null);  // Clear any errors
    close();  // Call the onClose prop function to officially close the modal
  };

  const [entitlementOptions1, setEntitlementOptions1] = useState([]);
  const [entitlementOptions2, setEntitlementOptions2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchEntitlements = async () => {
      try {
        const response1 = await fetch(API_ENDPOINTS.ENTITLEMENTS);
        const data1 = await response1.json();
        setEntitlementOptions1(data1);

        const response2 = await fetch(API_ENDPOINTS.ENTITLEMENTS);
        const data2 = await response2.json();
        setEntitlementOptions2(data2);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch entitlements');
        setLoading(false);
      }
    };

    fetchEntitlements();

    if (control) {
      setControlType(control.type);
      setFormData(control);
    } else {
      setControlType('SA');
      setFormData({
        id: 0,
        name: '',
        type: 'SA',
        entName: '',
        entId: 0
      } as GrcSaControl);
    }
  }, [control]);



  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };


  

  if (!isOpen) return null;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
    placeholder=" "
    value={formData.name}
    onChange={(e) => {
      if (isSodControl(formData))
        setFormData({ ...formData, name: e.target.value } as GrcSodControl)
      else
        setFormData({ ...formData, name: e.target.value } as GrcSaControl)
    }}
    required
  />
  <label htmlFor="Name">Control Name</label>
</div>
<div className={styles.formField}>
  <select
    id="ent1Name"
    value={isSodControl(formData) ? formData.ent1Name : formData.entName}
    onChange={(e) => {
      const selectedOption = entitlementOptions1.find(option => option.name === e.target.value);

      if (isSodControl(formData))
        setFormData({ ...formData, ent1Name: e.target.value, ent1id: selectedOption.id } as GrcSodControl)
      else
        setFormData({ ...formData, entName: e.target.value, entId: selectedOption.id } as GrcSaControl)
    }}
    required
  >
    <option value="">Select Entitlement 1</option>
    {entitlementOptions1.map(option => (
      <option key={option.id} value={option.name}>{option.name}</option>
    ))}
  </select>
  <label htmlFor="ent1Name">Entitlement 1</label>
</div>
<div className={styles.formField}>
  <select
    id="ent2Name"
    value={isSodControl(formData) ? formData.ent2Name : ''}
    onChange={(e) => {
      setControlType('SOD');
      const selectedOption = entitlementOptions2.find(option => option.name === e.target.value);

      if (isSodControl(formData)) {
        setFormData(
          { 
            ...formData, 
            ent2id: selectedOption.id,
            ent2Name: e.target.value 
          } as GrcSodControl
        )
      } else {
        setFormData(
        {
          id: formData.id,
          name: formData.name,
          ent1Name: formData.entName,
          ent1id: formData.entId,
          ent2Name: e.target.value,
          ent2id: selectedOption.id,
          type: 'SOD'
        } as GrcSodControl)
      }
    }}
  >
    <option value="">Select Entitlement 2</option>
    {entitlementOptions2.map(option => (
      <option key={option.id} value={option.name}>{option.name}</option>
    ))}
  </select>
  <label htmlFor="ent2Name">Entitlement 2</label>
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
