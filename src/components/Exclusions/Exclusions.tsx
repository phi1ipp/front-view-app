import React, { useState, useEffect } from 'react';
import styles from './Exclusion.module.css';
import { ExclusionTable } from './ExclusionTable.tsx';
import { ExclusionModal } from './ExclusionModal.tsx';
import { DeleteModal } from '../Dashboard/DeleteModal.tsx';
import { Exclusion } from '../../types/types.ts';
import Create from './Create.png';
import { API_ENDPOINTS } from '../../types/api.ts';

export const Exclusions: React.FC = () => {
  const [exclusions, setExclusions] = useState<Exclusion[]>([]); 
  const [isExclusionModalOpen, setIsExclusionModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedExclusion, setSelectedExclusion] = useState<Exclusion | undefined>(undefined);
  const [selectedExclusionId, setSelectedExclusionId] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    fetchExclusions();
  }, []);

  const fetchExclusions = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.EXCLUSIONS);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setExclusions(data); // This updates "exclusions" state
      console.log('Exclusions:', data); 
    } catch (error) {
      console.error('Error fetching Exclusions:', error);
    }
  };


  const [formData, setFormData] = useState<Functions>({
      name: ''
    });

  const handleCreateExclusion = () => {
    setSelectedExclusion(undefined);
    setIsExclusionModalOpen(true);
  };

  const handleEditExclusion = (exclusion: Exclusion) => {  // Ensure lowercase "exclusion"
    console.log("Edit Exclusion: ", JSON.stringify(exclusion, null, 2)); // Pretty print the object
    setSelectedExclusion(exclusion);
    setIsExclusionModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedExclusionId(id);
    setIsDeleteModalOpen(true);
  };

  const handleExclusionSubmit = async (exclusion: Exclusion) => {
    console.log('Exclusion before submit:', exclusion);

    if (!exclusion || !exclusion.name) {
      setErrorMessage('Exclusion name is required.');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }

    try {
      const method = selectedExclusion ? 'PUT' : 'POST';
      const url = selectedExclusion
        ? `${API_ENDPOINTS.EXCLUSIONS}/${exclusion.id}`
        : API_ENDPOINTS.EXCLUSIONS;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exclusion),
      });

      if (!response.ok) {
        setErrorMessage(`HTTP error! Status: ${response.status}`);
        setTimeout(() => setErrorMessage(''), 5000);
        return;
      }

      setSuccessMessage('Exclusion saved successfully!');
      setTimeout(() => setSuccessMessage(''), 5000);

      fetchExclusions();
      setIsExclusionModalOpen(false);
    } catch (error) {
      console.error('Error saving Exclusion:', error);
      setErrorMessage('Failed to save Exclusion.');
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  const handleDeleteConfirm = async (id: string) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.EXCLUSIONS}/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        setErrorMessage(`HTTP error! Status: ${response.status}`);
        setTimeout(() => setErrorMessage(''), 5000);
      }

      setSuccessMessage('Deleted Exclusion Successfully!');
      setTimeout(() => setSuccessMessage(''), 5000);
      fetchExclusions();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting Exclusion:', error);
      setErrorMessage('Failed to delete Exclusion.');
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  const handleCancel = () => {
    setInputText('');
  };

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
          <h1 className={styles.title}>Exclusions</h1>
        </div>
        <button className={styles.createButton} onClick={handleCreateExclusion}>
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

      <div className={styles.content}>
        <ExclusionTable
          exclusions={exclusions} // Now passing "exclusions" instead of "Exclusions"
          onEdit={handleEditExclusion}
          onDelete={handleDeleteClick}
        />
      </div>
      <ExclusionModal
        isOpen={isExclusionModalOpen}
        onClose={() => setIsExclusionModalOpen(false)}
        exclusion={selectedExclusion}
        onSubmit={handleExclusionSubmit}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        id={selectedExclusionId}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

