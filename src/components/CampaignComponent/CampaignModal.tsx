import React, { useState, useEffect } from 'react';
import styles from './CampaignModal.module.css';
import { CampaignModalProps, Campaign } from '../../types/types';
import { API_ENDPOINTS } from '../../types/api.ts';

export const CampaignModal: React.FC<CampaignModalProps> = ({
  isOpen,
  onClose,
  campaign,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Campaign>({
    id: '',
    name: '',
    status: '',
    violationCount: '',
    connId: '',
    controls: [],
  });
  const [connections, setConnections] = useState([]);
  const [controls, setControls] = useState([]);
  const [availableControls, setAvailableControls] = useState([]);
  const [selectedControls, setSelectedControls] = useState([]);
  const [showControlsModal, setShowControlsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchConnections();
    fetchAllControls();
  }, []);

  useEffect(() => {

    if (!isOpen) return;
    if (campaign) {
      // Set form data from existing campaign
      setFormData(campaign);
  
      // Fetch campaign-specific controls
      fetchCampaignControls(campaign.name).then(campaignControls => {
        
        // If editing an existing campaign, filter available controls and jump to the controls modal
        if (campaign.id && controls.length) {
          // This checks if it's an edit operation
          setSelectedControls(campaignControls);
          setAvailableControls(
            controls.filter(control => !campaignControls.map(c => c.id).includes(control.id))
          );
          setShowControlsModal(true); // Jump to controls management for editing
        } else {
          // For a new campaign creation, do not filter or jump to second screen
          setAvailableControls(controls);
          setFormData({
            id: '',
            name: '',
            status: '',
            violationCount: '',
            connId: '',
            controls: [],
          });
          

        }
      });
    } else {
      setFormData({
        id: '',
        name: '',
        status: '',
        violationCount: '',
        connId: '',
        controls: [],
      });
      setSelectedControls([]);
      setAvailableControls(controls); // Assuming `controls` holds all available controls
    }
  }, [isOpen, controls]);

  const fetchConnections = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.CONNECTIONS, {credentials: "include"});
      const data = await response.json();
      setConnections(data || []);
    } catch (error) {
      console.error('Error fetching connections:', error);
      setConnections([]);
    }
  };

  const fetchCampaignControls = async (campaignName) => {
    console.log("Campagin name "+campaignName);
    try {
      const response = await fetch(API_ENDPOINTS.CAMPAIGN_CONTROLS(campaignName), {credentials: "include"});
      console.log(API_ENDPOINTS.CAMPAIGN_CONTROLS(campaignName));
      return await response.json();
    } catch (error) {
      console.error('Error fetching campaign controls:', error);
      return [];
    }
    
  };

  const fetchAllControls = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.CONTROLS);
      const data = await response.json();
      setControls(data || []);
      // setAvailableControls(data || []);
    } catch (error) {
      console.error('Error fetching controls:', error);
      setControls([]);
      // setAvailableControls([]);
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();
    const campaignName = formData.name;
    const connectionId = formData.connId;

    try {
      if (formData.id === '')
        await fetch(API_ENDPOINTS.CAMPAIGN_PREPARE(campaignName, connectionId));
      
      setShowControlsModal(true);
    } catch (error) {
      console.error('Failed to prepare campaign:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.connId || selectedControls.length === 0) return;

    setIsLoading(true);
    try {
      const campaign = {
        name: formData.name,
        connectionId: formData.connId,
        controlIds: selectedControls.map((control) => control.id),
      };
      await onSubmit(campaign);
      onClose();
    } catch (error) {
      console.error('Failed to create campaign:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddControl = (e, controlId) => {
    e.preventDefault();
    const control = availableControls.find((control) => control.id === controlId);
    if (control) {
      setSelectedControls((prev) => [...prev, control]);
      setAvailableControls((prev) => prev.filter((c) => c.id !== controlId));
    }
  };

  const cancelControl= (e) => {
    onClose();
    setSelectedControls([]);
  }

  const handleRemoveControl = (e, controlId) => {
    e.preventDefault();
    const control = selectedControls.find((control) => control.id === controlId);
    if (control) {
      setAvailableControls((prev) => [...prev, control]);
      setSelectedControls((prev) => prev.filter((c) => c.id !== controlId));
    }
  };

  const handleAddAllControls = (e) => {
    e.preventDefault();
    setSelectedControls([...selectedControls, ...availableControls]);
    setAvailableControls([]);
  };

  const handleRemoveAllControls = (e) => {
    e.preventDefault();
    setAvailableControls([...availableControls, ...selectedControls]);
    setSelectedControls([]);
  };

  if (!isOpen) return null;

  if (showControlsModal) {
    return (
      <div className={styles.modalOverlayControl}>
        <div className={styles.modalContentControl}>
          <h2>{formData.id ? 'Edit Campaign' : 'Create Campaign'}</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.dualList}>
              <div className={styles.list}>
                <h3>Available Controls</h3>
                <ul className={styles.scroll}>
                  {availableControls && availableControls.length > 0 ? (
                    availableControls.map((control) => (
                      <li key={control.id}>
                        <button onClick={(e) => handleAddControl(e, control.id)}>
                          {control.name}
                        </button>
                      </li>
                    ))
                  ) : (
                    <li className={styles.empty}>No Available Controls</li>
                  )}
                </ul>
              </div>
              <div className={styles.listActions}>
                <button onClick={handleAddAllControls}>&gt;&gt;</button>
                <button onClick={handleRemoveAllControls}>&lt;&lt;</button>
              </div>
              <div className={styles.list}>
                <h3>Selected Controls</h3>
                <ul className={styles.scroll}>
                  {selectedControls.length > 0 ? (
                    selectedControls.map((control) => (
                      <li key={control.id}>
                        <button onClick={(e) => handleRemoveControl(e, control.id)}>
                          {control.name}
                        </button>
                      </li>
                    ))
                  ) : (
                    <li className={styles.empty}>No Selected Controls</li>
                  )}
                </ul>
              </div>
            </div>
            <div className={styles.modalActions}>
              <button
                type="button"
                onClick={() => setShowControlsModal(false)}
                className={styles.cancelButton}
              >
                Previous
              </button>
              <button type="submit" className={styles.submitButton} disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Submit'}
              </button>
            </div>
          </form>
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
              disabled={formData.id}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <label htmlFor="name">Campaign Name</label>
          </div>
          <div className={styles.formField}>
            <select
              id="connection"
              value={formData.connId}
              disabled={formData.id}
              onChange={(e) => setFormData({ ...formData, connId: e.target.value })}
              required
            >
              <option value="">Select connection</option>
              {connections.map((connection) => (
                <option key={connection.id} value={connection.id}>
                  {connection.name}
                </option>
              ))}
            </select>
            <label htmlFor="connection">Connections</label>
          </div>
          <div className={styles.modalActions}>
          <button type="button" onClick={(e) => cancelControl(e)} className={styles.cancelButton}>
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