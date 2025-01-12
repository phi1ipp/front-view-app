import React, { useState, useEffect } from 'react';
import styles from './Campaign.module.css';
import { Campaign } from '../../types/types.ts';
import { CampaignTable } from './CampaignTable.tsx';
import {CampaignModal} from './CampaignModal.tsx'
import { API_ENDPOINTS } from '../../types/api.ts';
import Create from './Create.png';

export const CampaignComponent: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | undefined>();
  const [successMessage, setSuccessMessage] = useState(''); // State to manage the success message
  const [errorMessage,setErrorMessage] = useState('');
  useEffect(() => {
    fetchCampaigns();
  }, []);


  
    const fetchCampaigns = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.CAMPAIGNS, {credentials: "include"});
        const data = await response.json();
        console.log(data)
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
          console.log("campaign "+campaign);
          setIsModalOpen(false);
          fetchCampaigns();
    
        } catch (error) {
          console.error('Error saving campaign:', error);
        }
      };
  

  const handleSubmit = async (campaign: Campaign) => {
    try {
      const method = selectedCampaign ? 'PUT' : 'POST';
      const url = selectedCampaign ? `${API_ENDPOINTS.CAMPAIGN_START}/${campaign.name}` :API_ENDPOINTS.CAMPAIGN_START(campaign.name);
     const response = await fetch(url, {credentials: 'include'});

      if (!response.ok) {
        setErrorMessage(`HTTP error! Status: ${response.status}`);
      }
    console.log("campaign ", campaign);
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
      setSelectedCampaign(undefined);
      setIsModalOpen(true);
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
        />
      </div>
      <CampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        campaign={selectedCampaign}
        onSubmit={handleSubmit}
      />
     
    </div>
  );
};