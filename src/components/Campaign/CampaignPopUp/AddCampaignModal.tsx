import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AddCampaignProps, Control, Connection } from './types';
import styles from './AddCampaignModal.module.css';

export const AddCampaignModal: React.FC<AddCampaignProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [campaignName, setCampaignName] = useState('');
  const [selectedControl, setSelectedControl] = useState('');
  const [selectedConnection, setSelectedConnection] = useState('');
  const [controls, setControls] = useState<Control[]>([]);
 const [isLoading, setIsLoading] = useState(false);
  const [connections, setConnections] = useState<Connection[]>([]);
  


  const fetchControls = async () => {
    try {
      const response = await fetch('http://localhost:4000/campaignControls');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }  
      const controlData = await response.json();
      setControls(controlData); // Correctly set connections array
      console.log('controls Data:', controlData); 
    } catch (error) {
      console.error('Error fetching controls:', error);
    }
  };

  const fetchConnections = async () => {
    try {
      const response = await fetch('http://localhost:4000/campaignConnections');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }  
      const connectionsData = await response.json();
      setConnections(connectionsData); // Correctly set connections array
      console.log('Connections Data:', connectionsData); 
    } catch (error) {
      console.error('Error fetching connections:', error);
    }
  };

  const createCampaign = async (campaign: { id: any; name: string; controlId: string; connectionIds: Connection[]; }) => {
    try {
  const response = await fetch('http://localhost:4000/campaigns', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(campaign),
  });
  return response.json();
} catch (error) {
  console.error('Error fetching connections:', error);
}
};
  


  useEffect(() => {
    if (isOpen) {
      fetchControls();
      fetchConnections();
    }
  }, [isOpen]);  // Ensures that data is fetched every time the modal is opened
  


  const handleSubmit = async () => {
    if (!campaignName || !selectedControl || selectedConnection.length === 0) return;
  
    setIsLoading(true);
    try {
      const campaign = {
        id: uuidv4(),
        name: campaignName,
        controlId: selectedControl,
        connectionIds: connections, // Changed to array of selected connections
      };
  
      await createCampaign(campaign);
      onSubmit(campaign);
      onClose();
    } catch (error) {
      console.error('Failed to create campaign:', error);
    } finally {
      setIsLoading(false);
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className={styles.popUpAddCampaign}>
      <div className={styles.div}>
        <div className={styles.addCampaign}>Add Campaign</div>
        <div className={styles.div2}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a1a925403c4f2acb897d21f32c6ab49446ca3bd68b732af83c9dee8ae9c7ed3b?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740"
            className={styles.img}
            alt="Close"
            onClick={onClose}
          />
        </div>
      </div>
      <div className={styles.div3}>
  <div className={styles.div4}>
    <div className={styles.div5}>
      <div className={styles.labelTextContainer}>Campaign Name</div>
      <input
        type="text"
        value={campaignName}
        onChange={(e) => setCampaignName(e.target.value)}
        className={styles.inputTextContainer}
        placeholder="Enter campaign name"
        aria-label="Campaign Name"
      />
    </div>
  </div>
  <div className={styles.div6}>
    <div className={styles.div7}>
      <div className={styles.labelTextContainer2}>Controls</div>
      <select
        value={selectedControl}
        onChange={(e) => setSelectedControl(e.target.value)}
        className={styles.inputTextContainer}
        aria-label="Controls"
      >
        <option value="">Select Control</option>
        {controls.map((control) => (
          <option key={control.id} value={control.id}>{control.name}</option>
        ))}
      </select>
    </div>
  </div>
  <div className={styles.div6}>  {/* Using the same div structure as Controls for alignment */}
    <div className={styles.div7}>
      <div className={styles.labelTextContainer}>Connection Name</div>
      <select
        multiple
        value={selectedConnection}
        onChange={e => {
          const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
          setSelectedConnection(selectedOptions);
        }}
        className={styles.inputTextContainer}
        aria-label="Connection Names"
      >
        <option value="">Select Connections</option>
        {connections.map((connection) => (
          <option key={connection.id} value={connection.id}>{connection.name}</option>
        ))}
      </select>
    </div>
  </div>
</div>

      <div className={styles.horizontalMiddleInset}>
      </div>
      <div className={styles.div10}>
        <button
          onClick={onClose}
          className={styles.button}
          disabled={isLoading}
          aria-label="Cancel"
        >
          <div className={styles.stateLayer5}>Cancel</div>
        </button>
        <button
          onClick={handleSubmit}
          className={styles.submitButt}
          disabled={isLoading || !campaignName || !selectedControl || !selectedConnection}
          aria-label="Run Campaign"
        >
          <div className={styles.stateLayer6}>
            {isLoading ? 'Running...' : 'Run Campaign'}
          </div>
        </button>
      </div>
    </div>
  );
};