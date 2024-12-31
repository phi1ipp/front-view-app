import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Ensure you have uuid installed
import styles from './CampaignModal.module.css';
import { CampaignModalProps, Campaign } from './types';

export const CampaignModal: React.FC<CampaignModalProps> = ({
  isOpen,
  onClose: close,
  campaign,
  onSubmit
}) => {
  const [formData, setFormData] = useState<Campaign>({
    name: '',
    connection: ''
  });
  const [connections, setConnections] = useState([]);
  const [controls, setControls] = useState([]);
  const [selectedControls, setSelectedControls] = useState([]);
  const [showControlsModal, setShowControlsModal] = useState(false);
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

  const handleNext = (e) => {
    e.preventDefault();
    setShowControlsModal(true);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.connection || selectedControls.length === 0) return;

    setIsLoading(true);
    try {
      const campaign = {
        id: uuidv4(),
        name: formData.name,
        connectionId: formData.connection,
        controlIds: selectedControls
      };
      onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Failed to create campaign:', error);
    } finally {
      setIsLoading(false);
    }
  };


  const onClose = () => {
    setFormData({name: '', connection: ''});
    setSelectedControls([]);
    setShowControlsModal(false);
    close();
  };

  const selectedConnectionName = connections.find(conn => conn.id === formData.connection)?.name;

  if (!isOpen) return null;

  if (showControlsModal) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <h2>Select Controls</h2>
          {controls.map(control => (
            <div key={control.id}>
              <input
                type="checkbox"
                checked={selectedControls.includes(control.id)}
                onChange={() => {
                  const newSelection = selectedControls.includes(control.id)
                    ? selectedControls.filter(c => c !== control.id)
                    : [...selectedControls, control.id];
                  setSelectedControls(newSelection);
                }}
              />
              {control.name}
            </div>
          ))}
          <div className={styles.modalActions}>
            <button type="button" onClick={() => setShowControlsModal(false)} className={styles.cancelButton}>
              Previous
            </button>
            <button type="submit" onClick={handleSubmit} className={styles.submitButton}>
              Create Campaign
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Create Campaign</h2>
        <form onSubmit={handleNext}>
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
            {formData.connection && <div className={styles.selectedConnection}>{selectedConnectionName}</div>}
            <select
              id="connection"
              value={formData.connection}
              onChange={(e) => setFormData({ ...formData, connection: e.target.value })}
              required
            >
              <option value="">Select a Connection</option>
              {connections.map((connection) => (
                <option key={connection.id} value={connection.id}>
                  {connection.name}
                </option>
              ))}
            </select>
            <label htmlFor="connection">Connection</label>
          </div>
          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
