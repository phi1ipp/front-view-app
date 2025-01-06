import React, { useState, useEffect } from 'react';
import styles from './ControlModal.module.css';
import { ControlModalProps, Control } from './types';
import { v4 as uuidv4 } from 'uuid';

export const ControlModal: React.FC<ControlModalProps> = ({
  isOpen,
  onClose: close,
  control,
  onSubmit
}) => {
  const [formData, setFormData] = useState<Control>({
    name: '',
    ent1Name: '',
    ent2Name: '',
  });

  const onClose = () => {
    // Reset states to initial values when closing the modal
    setFormData({ name: '', ent1Name: '', ent2Name: '' });
    setEntitlementOptions1([]);
    setEntitlementOptions2([]);
    setError(null);  // Clear any errors
    close();  // Call the onClose prop function to officially close the modal
  };
  const [entitlementOptions1, setEntitlementOptions1] = useState([]);
  const [entitlementOptions2, setEntitlementOptions2] = useState([]);
  const [selectedEntitlements1, setSelectedEntitlements1] = useState<{ id: string; name: string }[]>([]);
  const [selectedEntitlements2, setSelectedEntitlements2] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchEntitlements = async () => {
      try {
        const response1 = await fetch('http://localhost:4000/campaignConnections');
        const data1 = await response1.json();
        setEntitlementOptions1(data1);

        const response2 = await fetch('http://localhost:4000/campaignConnections');
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
    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    required
  />
  <label htmlFor="Name">Control Name</label>
</div>
<div className={styles.formField}>
  <select
    id="ent1Name"
    value={formData.ent1Name}
    onChange={(e) => setFormData({ ...formData, ent1Name: e.target.value })}
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
    value={formData.ent2Name}
    onChange={(e) => setFormData({ ...formData, ent2Name: e.target.value })}
    required
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
