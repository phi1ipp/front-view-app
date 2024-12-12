import React, { useState } from 'react';
import styles from './Campaigns.module.css';
import { CampaignsTable } from './CampaignsTable.tsx';
import { AddCampaignModal } from './CampaignPopUp/AddCampaignModal.tsx';

export const Campaigns: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal state

  const handleOpenModal = () => {
    setIsModalOpen(true); // Open modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
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
        <button className={styles.createButton} onClick={handleOpenModal}>
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
        <CampaignsTable />
      </div>
      {/* AddCampaignModal Component */}
      <AddCampaignModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddCampaign}
      />
    </div>
  );
};