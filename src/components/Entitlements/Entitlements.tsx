import React, { useState, useEffect } from 'react';
import styles from './Entitlement.module.css';
import { EntitlementTable } from './EntitlementTable.tsx';
import { EntitlementModal } from './EntitlementModal.tsx';
import { DeleteModal } from './DeleteModal.tsx';
import { Entitlement } from './types';
import Create from './Create.png';

export const Entitlements: React.FC = () => {
  const [entitlements, setEntitlements] = useState<Entitlement[]>([]);
  const [isEntitlementModalOpen, setIsEntitlementModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEntitlement, setSelectedEntitlement] = useState<Entitlement | undefined>();
  const [selectedEntitlementId, setSelectedEntitlementId] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState(''); // State to manage the success message
      const [errorMessage,setErrorMessage] = useState('');

  useEffect(() => {
    fetchEntitlements();
  }, []);

  const fetchEntitlements = async () => {
    try {
      const response = await fetch('http://localhost:4000/entitlement');
            if (!response.ok) { // Check if the response was successful
        throw new Error(`HTTP error! status: ${response.status}`);
      }  
      const data = await response.json();
      setEntitlements(data);
      console.log(JSON.stringify(response));
      console.log('Data:', data); 
    } catch (error) {
      console.error('Error fetching Entitlements:', error);
    }
  };

  const handleCreateEntitlement = () => {
    setSelectedEntitlement(undefined);
    setIsEntitlementModalOpen(true);
  };

  

  const handleEditEntitlement = (Entitlement: Entitlement) => {
    setSelectedEntitlement(entitlement);
    setIsEntitlementModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedEntitlementId(id);
    setIsDeleteModalOpen(true);
  };

  const handleEntitlementSubmit = async (entitlement: Entitlement) => {
    try {
      const method = selectedEntitlement ? 'PUT' : 'POST';
      const url = selectedEntitlement ? `http://localhost:4000/entitlement/${user.id}` : 'http://localhost:4000/entitlement';
      
      const response=await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entitlement),
      });
      
      if (!response.ok) {
        setErrorMessage(`HTTP error! Status: ${response.status}`);
    }
      setSuccessMessage('Created Entitlement Successfully!');  // Set success message
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      fetchEntitlements();
      setIsEntitlementModalOpen(false);
    } catch (error) {
      console.error('Error saving Entitlement:', error);
      setErrorMessage('Failed to save Entitlement.');  
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  const handleDeleteConfirm = async (id: string) => {
    console.log("id"+id)
    try {
     const response= await fetch(`http://localhost:4000/entitlement/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        setErrorMessage(`HTTP error! Status: ${response.status}`);
    }
      setSuccessMessage('Deleted Connection Successfully!');  // Set success message
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      fetchEntitlements();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting Entitlement:', error);
      setErrorMessage('Failed to delete Entitlement.');  
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
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
              <h1 className={styles.title}>Entitlements</h1>
            </div>
           <button className={styles.createButton} onClick={handleCreateEntitlement}>
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
        <EntitlementTable
          entitlements={entitlements}
          onEdit={handleEditEntitlement}
          onDelete={handleDeleteClick}
        />
      </div>
      <EntitlementModal
        isOpen={isEntitlementModalOpen}
        onClose={() => setIsEntitlementModalOpen(false)}
        entitlement={selectedEntitlement}
        onSubmit={handleEntitlementSubmit}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        id={selectedEntitlementId}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};