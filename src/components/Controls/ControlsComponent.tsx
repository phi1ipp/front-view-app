import React, { useState, useEffect } from 'react';
import styles from './Control.module.css';
import { DeleteModal } from '../Users/DeleteModal.tsx';
import { Control } from '../../types/types.ts';
import { ControlTable } from './ControlTable.tsx';
import {ControlModal} from './ControlModal.tsx';
import Create from './Create.png';
import { API_ENDPOINTS } from '../../types/api.ts';


export const ControlsComponent: React.FC = () => {
  const [controls, setControls] = useState<Control[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedControl, setSelectedControl] = useState<Control | undefined>();
  const [selectedControlId, setSelectedControlId] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState(''); // State to manage the success message
      const [errorMessage,setErrorMessage] = useState('');
  useEffect(() => {
    fetchControls();
  }, []);


  
    const fetchControls = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.CONTROLS);
        const data = await response.json();
        console.log(data)
        setControls(data);
      } catch (error) {
        console.error('Error  fetchControls:', error);
      }
    };
    


  const handleEdit = (control: Control) => {
    setSelectedControl(control);
    setIsModalOpen(true);
  };



  const handleDeleteConfirm = async (id: string) => {
    console.log("id"+id)
    try {
      const response = await fetch(`${API_ENDPOINTS.CONTROLS}/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        setErrorMessage(`HTTP error! Status: ${response.status}`);
    }
      setSuccessMessage('Deleted Control Successfully!');  // Set success message
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      fetchControls();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting Controls:', error);
      setErrorMessage('Failed to deleting Control.');  // Set error message when saving campaign fails
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };



  

  const handleSubmit = async (control: Control) => {
    const method = selectedControl ? 'PUT' : 'POST';
    const url = selectedControl ? `${API_ENDPOINTS.CONTROLS}/${control.id}` : API_ENDPOINTS.CONTROLS;
    
    try {
    const response =  await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(control),
      });
      if (!response.ok) {
        setErrorMessage(`HTTP error! Status: ${response.status}`);
    }
    console.log("Controls ", control);
      setSuccessMessage('Created Control Successfully!');  // Set success message
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      setIsModalOpen(false);
      fetchControls();
    } catch (error) {
      console.error('Error saving Control:', error);
      setErrorMessage('Failed to save Control.');  // Set error message when saving campaign fails
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  const handleCreateControl = () => {
      setSelectedControl(undefined);
      setIsModalOpen(true);
    };
  
    
    
    const handleDeleteClick = (id: string) => {
      setSelectedControlId(id);
      setIsDeleteModalOpen(true);
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
              <h1 className={styles.title}>Controls</h1>
            </div>
            <button className={styles.createButton} onClick={handleCreateControl}>
              <div className={styles.buttonContent}>
                <img
                  loading="lazy"
                  src={Create}
                  className={styles.buttonIcon} alt="img"
                />
                <span className={styles.buttonText}>Create</span>
              </div>
            </button>
          </div>
      <div className={styles.content}>
        <ControlTable
          controls={controls}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      </div>
      <ControlModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        control={selectedControl}
        onSubmit={handleSubmit}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        id={selectedControlId}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};