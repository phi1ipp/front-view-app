import React, { useState, useEffect } from 'react';
import styles from './Connection.module.css';
import { DeleteModal } from '../Users/DeleteModal.tsx';
import { Connection } from './types.ts';
import { ConnectionTable } from './ConnectionTable.tsx';
import {ConnectionModal} from './ConnectionModal.tsx'


export const ConnectionsComponent: React.FC = () => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState<Connection | undefined>();
  const [selectedConnectionId, setSelectedConnectionId] = useState<string>('');
  useEffect(() => {
    fetchConnections();
  }, []);


  
    const fetchConnections = async () => {
      try {
        const response = await fetch('http://localhost:4000/connections');
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
      await fetch(`http://localhost:4000/connections/${id}`, { method: 'DELETE' });
      fetchConnections();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting connection:', error);
    }
  };

  

  const handleSubmit = async (connection: Connection) => {
    const method = selectedConnection ? 'PUT' : 'POST';
    const url = selectedConnection ? `http://localhost:4000/connections/${connection.id}` : 'http://localhost:4000/connections';
    
    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(connection),
      });
      console.log("connection "+connection);
      setIsModalOpen(false);
      fetchConnections();

    } catch (error) {
      console.error('Error saving connection:', error);
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