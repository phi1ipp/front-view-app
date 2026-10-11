import React, { useState, useEffect } from 'react';
import styles from './Settings.module.css';
import { PasswordPolicy } from '../../types/types';
import { API_ENDPOINTS } from '../../types/api';

export const Settings: React.FC = () => {
  const [policy, setPolicy] = useState<PasswordPolicy | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
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
      setErrorMessage('');
    } catch (err) {
      setErrorMessage('Failed to fetch password policy');
      setTimeout(() => setErrorMessage(''), 5000);
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
      setErrorMessage('');
    } catch (err) {
      setErrorMessage('Failed to update password policy');
      setTimeout(() => setErrorMessage(''), 5000);
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
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Password Policy</h1>
        </div>
      </div>
      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formField}>
            <input
              type="number"
              id="minLength"
              name="minLength"
              value={formData.minLength}
              onChange={handleChange}
              min="1"
              placeholder=" "
            />
            <label htmlFor="minLength">Minimum Password Length</label>
          </div>

          <div className={styles.checkboxContainer}>
            <div className={styles.checkboxField}>
              <input
                type="checkbox"
                id="requireUppercase"
                name="requireUppercase"
                checked={formData.requireUppercase}
                onChange={handleChange}
                className={styles.checkbox}
              />
              <label htmlFor="requireUppercase" className={styles.checkboxLabel}>Require Uppercase</label>
            </div>
            <div className={styles.checkboxField}>
              <input
                type="checkbox"
                id="requireLowercase"
                name="requireLowercase"
                checked={formData.requireLowercase}
                onChange={handleChange}
                className={styles.checkbox}
              />
              <label htmlFor="requireLowercase" className={styles.checkboxLabel}>Require Lowercase</label>
            </div>
            <div className={styles.checkboxField}>
              <input
                type="checkbox"
                id="requireDigit"
                name="requireDigit"
                checked={formData.requireDigit}
                onChange={handleChange}
                className={styles.checkbox}
              />
              <label htmlFor="requireDigit" className={styles.checkboxLabel}>Require Digit</label>
            </div>
            <div className={styles.checkboxField}>
              <input
                type="checkbox"
                id="requireSpecial"
                name="requireSpecial"
                checked={formData.requireSpecial}
                onChange={handleChange}
                className={styles.checkbox}
              />
              <label htmlFor="requireSpecial" className={styles.checkboxLabel}>Require Special Character</label>
            </div>
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