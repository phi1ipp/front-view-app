import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Ensure you have uuid installed
import styles from './CampaignModal.module.css';
import { CampaignModalProps, Campaign } from '../../types/types';
import { API_ENDPOINTS } from '../../types/api.ts';

export const CampaignModal: React.FC<CampaignModalProps> = ({
  isOpen,
  onClose: close,
  onSubmit
}) => {
  const [formData, setFormData] = useState<Campaign>({
    id: '',
  name: '',
  status:'',
  violationCount:'',
  connectionId: '',
  controls: []
  });
  const [connections, setConnections] = useState([]);
  const [controls, setControls] = useState([]);
  const [selectedControls, setSelectedControls] = useState([]);
  const [showControlsModal, setShowControlsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.CONNECTIONS);
      const data = await response.json();
      setConnections(data);
    } catch (error) {
      console.error('Error fetching connections:', error);
    }
  };

  const fetchControls = async () => {
    try {
      const campaignName = formData.name;
      const response = await fetch(API_ENDPOINTS.CAMPAIGN_CONTROLS(campaignName));
      const data = await response.json();
      setControls(data);
    } catch (error) {
      console.error('Error fetching controls:', error);
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();
    const campaignName = formData.name;
    const connectionId = formData.connectionId;

    await fetch(API_ENDPOINTS.CAMPAIGN_PREPARE(campaignName, connectionId));
    const campaignControls = await fetchControls();
    // setSelectedControls(campaignControls);
    
    setShowControlsModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.connectionId || selectedControls.length === 0) return;

    setIsLoading(true);
    try {
      const campaign = {
        name: formData.name,
        connectionId: formData.connectionId,
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
    setFormData({id: '',
      name: '',
      status:'',
      violationCount:'',
      connectionId: '',
    controls:[]});
    setSelectedControls([]);
    setShowControlsModal(false);
    close();
  };

  const selectedConnectionName = connections.find(conn => conn.id === formData.connectionId)?.name;

  if (!isOpen) return null;

  const handleAddControl = (controlId: string) => {
    const control = controls.find((c) => c.id === controlId);
    if (control && !selectedControls.some((selected) => selected.id === controlId)) {
      setSelectedControls([...selectedControls, control]);
    }
  };

  const handleRemoveControl = (controlId: string) => {
    setSelectedControls(selectedControls.filter((control) => control.id !== controlId));
  };

  if (showControlsModal) {
 

    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
        <div className={styles.formField}>
          <h2>Controls</h2>
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
            <button type="button" onClick={() => setShowControlsModal(false)} className={styles.cancelButton}>
              Previous
            </button>
            <button type="submit" onClick={handleSubmit} className={styles.submitButton} disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Campaign'}
            </button>
          </div>
        </div>
      </div>
    );}

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
           
            <select
              id="connection"
              value={formData.connectionId}
              onChange={(e) => setFormData({ ...formData, connectionId: e.target.value })}
              required
            >
              <option value="">Select a Connection</option>
              {connections.map((connection) => (
                <option key={connection.id} value={connection.id}>
                  {connection.name}
                </option>
              ))}
            </select>
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