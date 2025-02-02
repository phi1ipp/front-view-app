import React, { useState, useEffect } from 'react';
import styles from './Campaign.module.css';
import { Campaign } from '../../types/types.ts';
import { CampaignTable } from './CampaignTable.tsx';
import {CampaignModal} from './CampaignModal.tsx'
import { API_ENDPOINTS } from '../../types/api.ts';
import Create from './Create.png';
import { DeleteModal } from './DeleteModal.tsx';

export const CampaignComponent: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | undefined>();
  const [successMessage, setSuccessMessage] = useState(''); // State to manage the success message
  const [errorMessage,setErrorMessage] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleDeleteClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsDeleteModalOpen(true);
  };
  
    const fetchCampaigns = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.CAMPAIGNS);
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };


    const handleDownload = async (campaign: Campaign) => {
        const method ='POST';
        try {
          await fetch(API_ENDPOINTS.DOWNLOAD_CAMPAIGNS, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(campaign),
          });
          setIsModalOpen(false);
          fetchCampaigns();
    
        } catch (error) {
          console.error('Error saving campaign:', error);
        }
      };
  
      const handleStartClick = async (campaign: Campaign) => {
        const method ='POST';
        try {
          await fetch(API_ENDPOINTS.DOWNLOAD_CAMPAIGNS, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(campaign),
          });
          setIsModalOpen(false);
          fetchCampaigns();
    
        } catch (error) {
          console.error('Error saving campaign:', error);
        }
      };

  const handleSubmit = async (campaign: Campaign) => {
    const method = selectedCampaign ? 'PUT' : 'POST';
          const url = selectedCampaign ? `${API_ENDPOINTS.CONNECTIONS}/${campaign.id}` : `${API_ENDPOINTS.CAMPAIGN_START(campaign.name)}`;
    
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaign),
      });

      if (!response.ok) {
        setErrorMessage(`HTTP error! Status: ${response.status}`);
      }
      setSuccessMessage('Created Campaign Successfully!');  // Set success message
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      setIsModalOpen(false);
      fetchCampaigns();
    } catch (error) {
      console.error('Error saving campaign:', error);
      setErrorMessage('Failed to save campaign.');  // Set error message when saving campaign fails
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }

  };

  const handleCreateCampaign = () => {
    setSelectedCampaign({
      id: '',
      name: '',
      status: '',
      violationCount: '',
      connectionId: '',
      controls: []
    });
    setIsModalOpen(true);
  };


  const handleEdit = (campaign: Campaign) => {
      setSelectedCampaign(campaign);
      setIsModalOpen(true);
    };
  
  const handleDeleteConfirm = async (name: string) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.CAMPAIGNS}/${name}`, { method: 'DELETE' });
      
      if (!response.ok) {
        setErrorMessage(`HTTP error! Status: ${response.status}`);
      }

      setSuccessMessage('Deleted Connection Successfully!');  // Set success message
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);

      fetchCampaigns();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting Connections:', error);
      setErrorMessage('Failed to deleting Connections.');  // Set error message when saving campaign fails
      
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };
  
    
 

  return (
        <div className={styles.container}>
            {successMessage && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
          <div className={styles.header}>
            <div className={styles.titleContainer}>
              <h1 className={styles.title}>Campaigns</h1>
            </div>
            <button className={styles.createButton} onClick={handleCreateCampaign}>
  <div className={styles.buttonContent}>
    <img
      loading="lazy"
      src={Create}
      alt="Create Icon"
      className={styles.buttonIcon}
    />
    <span className={styles.buttonText}>Create</span>
  </div>
</button>
          </div>
      <div className={styles.content}>
        <CampaignTable
          campaigns={campaigns}
          onDownload={handleDownload}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          onStart={handleStartClick}
        />
      </div>
      <CampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        campaign={selectedCampaign}
        onSubmit={handleSubmit}
      />
     <DeleteModal
             isOpen={isDeleteModalOpen}
             onClose={() => setIsDeleteModalOpen(false)}
             campaign={selectedCampaign}
             onConfirm={handleDeleteConfirm}
           />
    </div>
  );
};