import React from 'react';
import styles from './Campaigns.module.css';
import { CampaignsTable } from './CampaignsTable.tsx';

export const Campaigns: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Campaigns</h1>
        </div>
        <button className={styles.createButton}>
          <div className={styles.buttonContent}>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b4608d1988e70018595556c3c26823efc666bca62fa6ad93cfa773d0dd82ca2?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740"
              alt=""
              className={styles.buttonIcon}
            />
            <span className={styles.buttonText}>Create</span>
          </div>
        </button>
      </div>
      <div className={styles.content}>
        <CampaignsTable />
      </div>
    </div>
  );
};