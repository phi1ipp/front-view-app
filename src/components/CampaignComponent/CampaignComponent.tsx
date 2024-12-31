import React, { useState, useEffect } from 'react';
import styles from './Campaign.module.css';
import { Campaign } from './types.ts';
import { CampaignTable } from './CampaignTable.tsx';
import {CampaignModal} from './CampaignModal.tsx'


export const CampaignComponent: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | undefined>();
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>('');
  useEffect(() => {
    fetchCampaigns();
  }, []);


  
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('http://localhost:4000/campaigns');
        const data = await response.json();
        console.log(data)
        setCampaigns(data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };


    const handleDownload = async (campaign: Campaign) => {
        const method ='POST';
        const url = 'http://localhost:4000/campaigns';
        
        try {
          await fetch(url, {
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
    const method ='POST';
    const url = 'http://localhost:4000/campaigns';
    
    try {
      await fetch(url, {
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

  const handleCreateCampaign = () => {
      setSelectedCampaign(undefined);
      setIsModalOpen(true);
    };
  
 

  return (
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.titleContainer}>
              <h1 className={styles.title}>Connections</h1>
            </div>
            <button className={styles.createButton} onClick={handleCreateCampaign}>
              <div className={styles.buttonContent}>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b4608d1988e70018595556c3c26823efc666bca62fa6ad93cfa773d0dd82ca2?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740"
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
        connection={selectedCampaign}
        onSubmit={handleSubmit}
      />
     
    </div>
  );
};