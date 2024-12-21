import React, { useState, useEffect } from 'react';
import styles from './ConnectionModal.module.css';
import { UserModalProps, User } from './types';

export const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  user,
  onSubmit
}) => {
  const [formData, setFormData] = useState<User>({
    userId: '',
    loginId: '',
    fullName: '',
    email: ''
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData({
        userId: '',
        loginId: '',
        fullName: '',
        email: ''
      });
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} role="dialog" aria-modal="true">
        <h2 className={styles.modalTitle}>
          {user ? 'Edit Connection' : 'Create Connection'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formField}>
            <label htmlFor="loginId">Login ID</label>
            <input
              id="loginId"
              type="text"
              value={formData.loginId}
              onChange={(e) => setFormData({...formData, loginId: e.target.value})}
              required
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              required
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              {user ? 'Save' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};