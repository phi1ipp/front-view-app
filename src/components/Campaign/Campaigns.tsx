import React, { useState } from 'react';
import styles from './Campaigns.module.css';
import { CampaignsTable } from './CampaignsTable.tsx';
import { CampaignData } from './types';
import Create from './Create.png';
import { CampaignModal } from './CampaignModal.tsx';
import { downloadCampaignReport, createCampaign, fetchCampaigns } from '../../types/api.ts';

export const Campaigns: React.FC = () => {
    const [campaigns, setCampaigns] = useState<CampaignData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [total, setTotal] = useState(0);
    const [selectedCampaign, setSelectedCampaign] = useState<CampaignData | undefined>();
    const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
    const [downloadingId, setDownloadingId] = useState<number | null>(null);
  
    const loadCampaigns = async () => {
      try {
        const response = await fetch('http://localhost:4000/campaigns');
              if (!response.ok) { // Check if the response was successful
          throw new Error(`HTTP error! status: ${response.status}`);
        }  
        const data = await response.json();
        setCampaigns(data);
        console.log(JSON.stringify(response));
        console.log('Data:', data); 
      } catch (error) {
        console.error('Error fetching users:', error);
      }
  
    }
   
  
    const handleCreateCampaign = () => {
      setSelectedCampaign(undefined);
      setIsCampaignModalOpen(true);
    };

    const handleCampaignCreate = async (campaigns: CampaignData) => {
        try {
          const method = selectedCampaign ? 'PUT' : 'POST';
          const url = selectedCampaign ? `http://localhost:4000/usersdata/${user.id}` : 'http://localhost:4000/usersdata';
          
          await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(campaigns),
          });
          
          fetchCampaigns();
          setIsCampaignModalOpen(false);
        } catch (error) {
          console.error('Error saving user:', error);
        }
      };
    
  return (
    <div className={styles.container}>
             <div className={styles.header}>
               <div className={styles.titleContainer}>
                 <h1 className={styles.title}>Users</h1>
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
      {/* AddCampaignModal Component */}
     <div className={styles.content}>
             <CampaignsTable
               campaigns={campaigns}
               //onDownload={handleEditUser}
             />
           </div>
           <CampaignModal
                   isOpen={isCampaignModalOpen}
                   onClose={() => setIsCampaignModalOpen(false)}
                   user={selectedCampaign}
                   onSubmit={handleCampaignCreate}
                 />
    </div>
  );
};