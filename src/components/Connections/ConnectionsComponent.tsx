import React, { useState, useEffect } from 'react';
import styles from './Connection.module.css';
import { UserModal } from '../Users/UserModal.tsx';
import { DeleteModal } from '../Users/DeleteModal.tsx';
import { Connection } from './types.ts';
import { ConnectionTable } from './ConnectionTable.tsx';


export const ConnectionsComponent: React.FC = () => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState<Connection | undefined>();

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await fetch('/api/connections');
        const data = await response.json();
        setConnections(data);
      } catch (error) {
        console.error('Error fetching connections:', error);
      }
    };
    fetchConnections();
  }, []);

  const handleEdit = (connection: Connection) => {
    setSelectedConnection(connection);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async (connectionId: string) => {
    try {
      await fetch(`/api/connections/${connectionId}`, { method: 'DELETE' });
      setConnections(connections.filter(c => c.id !== connectionId));
    } catch (error) {
      console.error('Error deleting connection:', error);
    }
  };

  const handleSubmit = async (connection: Connection) => {
    const method = selectedConnection ? 'PUT' : 'POST';
    const url = selectedConnection ? `/api/connections/${connection.id}` : '/api/connections';
    
    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(connection),
      });
      setIsModalOpen(false);
      setSelectedConnection(undefined); // Reset selected connection after successful submission
    } catch (error) {
      console.error('Error saving connection:', error);
    }
  };

  const handleCreateUser = () => {
      setSelectedConnection(undefined);
      setIsModalOpen(true);
    };
  
    
    
    const handleDeleteClick = (id: string) => {
      setSelectedConnection(id);
      setIsDeleteModalOpen(true);
    };
 

  return (
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.titleContainer}>
              <h1 className={styles.title}>Connections</h1>
            </div>
            <button className={styles.createButton} onClick={handleCreateUser}>
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
          users={connections}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      </div>
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedConnection}
        onSubmit={handleSubmit}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        userId={selectedConnection}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};