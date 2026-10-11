import React, { useState, useEffect } from 'react';
import styles from './Settings.module.css';
import { PasswordPolicy } from '../../types/types';
import { API_ENDPOINTS } from '../../types/api';

export const Settings: React.FC = () => {
  const [policy, setPolicy] = useState<PasswordPolicy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<PasswordPolicy>({
    minLength: 8,
    requireUppercase: false,
    requireLowercase: false,
    requireDigit: false,
    requireSpecial: false,
  });

  useEffect(() => {
    fetchPolicy();
  }, []);

  const fetchPolicy = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.CONFIG.PASSWORD_POLICY);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPolicy(data);
      setFormData(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch password policy');
      console.error('Error fetching password policy:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : name === 'minLength' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const response = await fetch(API_ENDPOINTS.CONFIG.PASSWORD_POLICY, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updated = await response.json();
      setPolicy(updated);
      setFormData(updated);
      setSuccessMessage('Password policy updated successfully!');
      setTimeout(() => setSuccessMessage(''), 5000);
      setError('');
    } catch (err) {
      setError('Failed to update password policy');
      console.error('Error updating password policy:', err);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading password policy...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {successMessage && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}
      {error && (
        <div className={styles.errorMessage}>{error}</div>
      )}
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Password Policy</h1>
        </div>
      </div>
      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="minLength" className={styles.label}>
              Minimum Password Length
            </label>
            <input
              type="number"
              id="minLength"
              name="minLength"
              value={formData.minLength}
              onChange={handleChange}
              min="1"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="requireUppercase"
                checked={formData.requireUppercase}
                onChange={handleChange}
                className={styles.checkbox}
              />
              <span className={styles.checkmark}></span>
              Require Uppercase
            </label>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="requireLowercase"
                checked={formData.requireLowercase}
                onChange={handleChange}
                className={styles.checkbox}
              />
              <span className={styles.checkmark}></span>
              Require Lowercase
            </label>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="requireDigit"
                checked={formData.requireDigit}
                onChange={handleChange}
                className={styles.checkbox}
              />
              <span className={styles.checkmark}></span>
              Require Digit
            </label>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="requireSpecial"
                checked={formData.requireSpecial}
                onChange={handleChange}
                className={styles.checkbox}
              />
              <span className={styles.checkmark}></span>
              Require Special Character
            </label>
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.saveButton} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};