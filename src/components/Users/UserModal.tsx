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
    id: '',
    enabled: '',
    fullName: '',
    email: '',
    password: ''
  });

  const onClose = () => {
    // Reset states to initial values when closing the modal
    setFormData({  id: '',
      enabled: '',
      fullName: '',
      email: '',
      password: ''});  // Clear any errors
    close();  // Call the onClose prop function to officially close the modal
  };
  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData({
        id: '',
        enabled: '',
        fullName: '',
        email: '',
        password: ''
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
              id="id"
              type="id"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
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