import React, { useState, useEffect } from 'react';
import styles from '../Users/UserModal.module.css';
import { CampaignModalProps, Campaign } from './types';

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
    violationCount: 0,
  });

  useEffect(() => {
    if (campaign) {
      setFormData(campaign);
    } else {
      setFormData({
        id: '',
        name: '',
        status: '',
        violationCount: 0,
      });
    }
  }, [campaign]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} role="dialog" aria-modal="true">
        <h2 className={styles.modalTitle}>
          {campaign ? 'Edit Campaign' : 'Create Campaign'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formField}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="status">Status</label>
            <input
              id="status"
              type="text"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              required
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="violationCount">Violation Count</label>
            <input
              id="violationCount"
              type="number"
              value={formData.violationCount}
              onChange={(e) =>
                setFormData({ ...formData, violationCount: Number(e.target.value) })
              }
              required
            />
          </div>
          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              {campaign ? 'Save' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};