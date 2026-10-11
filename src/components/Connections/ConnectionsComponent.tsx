import React, { useState, useEffect } from 'react';
import { DeleteModal, ScreenLayout } from '../shared';
import { Connection } from '../../types/types';
import { ConnectionTable } from './ConnectionTable';
import { ConnectionModal } from './ConnectionModal';
import { API_ENDPOINTS } from '../../types/api';

export const ConnectionsComponent: React.FC = () => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState<Connection | undefined>();
  const [selectedConnectionId, setSelectedConnectionId] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.CONNECTIONS);
      const data = await response.json();
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
    try {
      const response = await fetch(`${API_ENDPOINTS.CONNECTIONS}/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        setErrorMessage(`HTTP error! Status: ${response.status}`);
        setTimeout(() => setErrorMessage(''), 5000);
      }
      setSuccessMessage('Deleted Connection Successfully!');
      setTimeout(() => setSuccessMessage(''), 5000);
      fetchConnections();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting Connections:', error);
      setErrorMessage('Failed to deleting Connections.');
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  const handleSubmit = async (connection: Connection) => {
    const method = selectedConnection ? 'PUT' : 'POST';
    const url = selectedConnection
      ? `${API_ENDPOINTS.CONNECTIONS}/${connection.id}`
      : API_ENDPOINTS.CONNECTIONS;

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
      setSuccessMessage('Created Connections Successfully!');
      setTimeout(() => setSuccessMessage(''), 5000);
      setIsModalOpen(false);
      await fetchConnections();
    } catch (error) {
      console.error('Error saving Connections:', error);
      setErrorMessage('Failed to save Connections.');
      setTimeout(() => setErrorMessage(''), 5000);
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
    <ScreenLayout
      title="Connections"
      onCreate={handleCreateConnection}
      successMessage={successMessage}
      errorMessage={errorMessage}
    >
      <ConnectionTable
        connections={connections}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />
      <ConnectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        connection={selectedConnection}
        onSubmit={handleSubmit}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => handleDeleteConfirm(selectedConnectionId)}
      />
    </ScreenLayout>
  );
};
