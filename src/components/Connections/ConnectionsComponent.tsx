import React, { useState, useEffect } from 'react';
import styles from './Connection.module.css';
import { DeleteModal } from '../Dashboard/DeleteModal.tsx';
import { Connection } from '../../types/types.ts';
import { ConnectionTable } from './ConnectionTable.tsx';
import {ConnectionModal} from './ConnectionModal.tsx'
import { API_ENDPOINTS } from '../../types/api.ts';


export const ConnectionsComponent: React.FC = () => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState<Connection | undefined>();
  const [selectedConnectionId, setSelectedConnectionId] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState(''); // State to manage the success message
    const [errorMessage,setErrorMessage] = useState('');
  useEffect(() => {
    fetchConnections();
  }, []);


  
    const fetchConnections = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.CONNECTIONS);
        const data = await response.json();
        console.log(data)
        setConnections(data);
      } catch (error) {
        console.error('Error fetching connections:', error);
      }
      
    };
    


  const handleEdit = (connection: Connection) => {
    setSelectedConnection(connection);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async (id: string) => {
    console.log("id"+id)
    try {
      const response = await fetch(`${API_ENDPOINTS.CONNECTIONS}/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        setErrorMessage(`HTTP error! Status: ${response.status}`);
        setTimeout(() => setErrorMessage(''), 5000);
    }
      setSuccessMessage('Deleted Connection Successfully!');  // Set success message
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      fetchConnections();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting Connections:', error);
      setErrorMessage('Failed to deleting Connections.');  // Set error message when saving campaign fails
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  

  const handleSubmit = async (connection: Connection) => {
    const method = selectedConnection ? 'PUT' : 'POST';
    const url = selectedConnection ? `${API_ENDPOINTS.CONNECTIONS}/${connection.id}` : API_ENDPOINTS.CONNECTIONS;
    
    try {
     const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(connection),
      });
      if (!response.ok) {
        setErrorMessage(`HTTP error! Status: ${response.status}`);
        setTimeout(() => setErrorMessage(''), 5000);
    }
    console.log("Connections ", connection);
      setSuccessMessage('Created Connections Successfully!');  // Set success message
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      setIsModalOpen(false);
      await fetchConnections();
    } catch (error) {
      console.error('Error saving Connections:', error);
      setErrorMessage('Failed to save Connections.');  // Set error message when saving campaign fails
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  const handleCreateConnection = () => {
      setSelectedConnection(undefined);
      setIsModalOpen(true);
    };
  
    
    
    const handleDeleteClick = (id: string) => {
      setSelectedConnectionId(id);
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
              <h1 className={styles.title}>Connections</h1>
            </div>
            <button className={styles.createButton} onClick={handleCreateConnection}>
              <div className={styles.buttonContent}>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b4608d1988e70018595556c3c26823efc666bca62fa6ad93cfa773d0dd82ca2?placeholderIfAbsent=true&apiKey=a425ac4ee7f44c4e8f299e4382456740"
                  alt="Create Icon"
                  className={styles.buttonIcon}
                />
                <span className={styles.buttonText}>Create</span>
              </div>
            </button>
          </div>
      <div className={styles.content}>
        <ConnectionTable
          connections={connections}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      </div>
      <ConnectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        connection={selectedConnection}
        onSubmit={handleSubmit}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        id={selectedConnectionId}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};