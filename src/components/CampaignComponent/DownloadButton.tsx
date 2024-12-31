import React from 'react';
import styles from './Campaign.module.css';
import { DownloadButtonProps } from './types';

export const DownloadButton: React.FC<DownloadButtonProps> = ({ onClick }) => (
  <button className={styles.downloadButton} onClick={onClick}>
    <div className={styles.buttonContent}>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7ae6762565aef009d714d78982d8dc804924878677efa3d3efe0c0a2cd0b4b68?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740"
        alt=""
        className={styles.buttonIcon}
      />
      <span className={styles.buttonText}>Download</span>
    </div>
  </button>
);