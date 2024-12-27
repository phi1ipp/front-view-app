import React, { useEffect, useState } from 'react';
import styles from './Campaigns.module.css';
import { CampaignsTable } from './CampaignsTable.tsx';
import { AddCampaignModal} from './CampaignPopUp/AddCampaignModal.tsx'
import {Campaign} from './type.ts';
import { DeleteModal } from './DeleteModal.tsx';
import { CampaignModal } from './CampaignModal.tsx';

export const Campaigns: React.FC = () => {
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
          console.error('Error fetching connections:', error);
        }
      };

const handleEdit = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async (id: string) => {
    console.log("id"+id)
    try {
      await fetch(`http://localhost:4000/campaigns/${id}`, { method: 'DELETE' });
      fetchCampaigns();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting connection:', error);
    }
  };

  

  const handleSubmit = async (campaign: Campaign) => {
    const method = selectedCampaign ? 'PUT' : 'POST';
    const url = selectedCampaign ? `http://localhost:4000/campaigns/${campaign.id}` : 'http://localhost:4000/campaigns';
    
    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaign),
      });
      console.log("connection "+campaign);
      setIsModalOpen(false);
      fetchCampaigns();

    } catch (error) {
      console.error('Error saving campaigns:', error);
    }
  };

  const handleCreateCampaign = () => {
      setSelectedCampaign(undefined);
      setIsModalOpen(true);
    };
  
    
    
    const handleDeleteClick = (id: string) => {
      setSelectedCampaignId(id);
      setIsDeleteModalOpen(true);
    };
 

  const handleAddCampaign = (newCampaign: any) => {
    console.log('Campaign Added:', newCampaign); // Handle the new campaign submission
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Campaigns</h1>
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
        <CampaignsTable
                  campaigns={campaigns}
                />
      </div>
      {/* AddCampaignModal Component */}
      <AddCampaignModal
       isOpen={isModalOpen}
       onClose={() => setIsModalOpen(false)}
       campaign={selectedCampaign}
       onSubmit={handleSubmit}
      />
       <DeleteModal
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              id={selectedCampaignId}
              onConfirm={handleDeleteConfirm}
            />
    </div>
    
  );
};