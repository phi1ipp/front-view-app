import React, { useState, useEffect } from 'react';
import styles from './UserModal.module.css';
import { UserModalProps, User } from '../../types/types';


export const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose:close,
  user,
  onSubmit
}) => {
  const [formData, setFormData] = useState<User>({
    username: '',
    fullName: '',
    email: '',
    password: '',
    enabled: true,
    isAdmin: false
  });

  const onClose = () => {
    // Reset states to initial values when closing the modal
    setFormData({  username: '',
      fullName: '',
      email: '',
      password: '',
      enabled: true,
      isAdmin: false
    });  // Clear any errors
    close();  // Call the onClose prop function to officially close the modal
  };

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData({
        username: '',
        fullName: '',
        email: '',
        password: '',
        enabled: true,
        isAdmin: false
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
          {user ? 'Edit User' : 'Create User'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formField}>
            <input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
              placeholder=" "
            />
            <label htmlFor="fullName">Full Name</label>
          </div>
          <div className={styles.formField}>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder=" "
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className={styles.formField}>
            <input
              id="username"
              type="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
              placeholder=" "
            />
            <label htmlFor="id">User Name</label>
          </div>
          <div className={styles.formField}>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              placeholder=" "
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className={styles.checkboxContainer}>
            <div className={styles.checkboxField}>
              <input
                id="admin"
                type="checkbox"
                checked={!!formData.isAdmin}
                onChange={(e) => setFormData({ ...formData, isAdmin: e.target.checked })}
                className={styles.checkbox}
              />
              <label htmlFor="admin" className={styles.checkboxLabel}>Admin?</label>
            </div>
            <div className={styles.checkboxField}>
              <input
                id="enabled"
                type="checkbox"
                checked={!!formData.enabled}
                onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                className={styles.checkbox}
              />
              <label htmlFor="enabled" className={styles.checkboxLabel}>Enabled?</label>
            </div>
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