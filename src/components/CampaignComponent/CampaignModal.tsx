import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Ensure you have uuid installed
import styles from './CampaignModal.module.css';
import { CampaignModalProps, Campaign } from './types';

export const CampaignModal: React.FC<CampaignModalProps> = ({
  isOpen,
  onClose: close,
  campaign,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Campaign>({
    name: '',
    connection: '',
    controls:[]
  });
  const [connections, setConnections] = useState([]);
  const [controls, setControls] = useState<{ id: string; name: string }[]>([]);
  const [selectedControls, setSelectedControls] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  

  useEffect(() => {
    fetchConnections();
    fetchControls();
  }, []);

  const fetchConnections = async () => {
    try {
      const response = await fetch('http://localhost:4000/campaignConnections');
      const data = await response.json();
      setConnections(data);
    } catch (error) {
      console.error('Error fetching connections:', error);
    }
  };

  const fetchControls = async () => {
    try {
      const response = await fetch('http://localhost:4000/campaignControls');
      const data = await response.json();
      setControls(data);
    } catch (error) {
      console.error('Error fetching controls:', error);
    }
  };

  const handleAddControl = (controlId: string) => {
    const control = controls.find((c) => c.id === controlId);
    if (control && !selectedControls.some((selected) => selected.id === controlId)) {
      setSelectedControls([...selectedControls, control]);
    }
  };

  const handleRemoveControl = (controlId: string) => {
    setSelectedControls(selectedControls.filter((control) => control.id !== controlId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.connection || selectedControls.length === 0) return;

    setIsLoading(true);
    try {
      const campaign = {
        id: uuidv4(),
        name: formData.name,
        connectionId: formData.connection,
        controlIds: selectedControls.map((control) => control.id),
      };
      onSubmit(campaign); // Pass the complete campaign data including controls
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error('Failed to create campaign:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onClose = () => {
    setFormData({ name: '', connection: '' });
    setSelectedControls([]);
    close(); // Close the modal
  };

  const selectedConnectionName = connections.find((conn) => conn.id === formData.connection)?.name;

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Create Campaign</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formField}>
            <input
              id="name"
              type="text"
              placeholder=""
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <label htmlFor="name">Campaign Name</label>
          </div>
          <div className={styles.formField}>

<select

  id="connection"
value={formData.connection}

  onChange={(e) => setFormData({ ...formData, connection: e.target.value })}

  required

>

  <option value="">Select connection</option>

  {connections.map(connection => (

    <option key={connection.id} value={connection.id}>{connection.name}</option>

  ))}

</select>

<label htmlFor="connection">Connections</label>

</div>
          <div className={styles.formField}>
            <select
              className={styles.dropdown}
              onChange={(e) => handleAddControl(e.target.value)}
              value=""
            >
              <option value="" disabled>
                Select a control
              </option>
              {controls
                .filter((control) => !selectedControls.some((selected) => selected.id === control.id))
                .map((control) => (
                  <option key={control.id} value={control.id}>
                    {control.name}
                  </option>
                ))}
            </select>
          </div>

          <div className={styles.selectedList}>
            {selectedControls.map((control) => (
              <div key={control.id} className={styles.selectedItem}>
                {control.name}
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => handleRemoveControl(control.id)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>

          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Campaign'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
