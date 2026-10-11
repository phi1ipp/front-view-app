import React, { useState, useEffect } from 'react';
import { DeleteModal, ScreenLayout } from '../shared';
import { Controls, GrcSaControl, GrcSodControl, isSodControl } from '../../types/types';
import { ControlTable } from './ControlTable';
import { ControlModal } from './ControlModal';
import { API_ENDPOINTS } from '../../types/api';

export const ControlsComponent: React.FC = () => {
  const [controls, setControls] = useState<Controls[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedControl, setSelectedControl] = useState<Controls | undefined>();
  const [selectedControlId, setSelectedControlId] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchControls();
  }, []);

  const fetchControls = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.CONTROLS);
      const data = await response.json();
      setControls(data);
    } catch (error) {
      console.error('Error  fetchControls:', error);
    }
  };

  const handleEdit = (control: Controls) => {
    setSelectedControl(control);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async (id: string) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.CONTROLS}/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        setErrorMessage(`HTTP error! Status: ${response.status}`);
        setTimeout(() => setErrorMessage(''), 5000);
      }
      setSuccessMessage('Deleted Control Successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      fetchControls();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting Controls:', error);
      setErrorMessage('Failed to deleting Control.');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  const handleSubmit = async (control: Controls) => {
    const method = selectedControl ? 'PUT' : 'POST';
    const url = selectedControl
      ? `${API_ENDPOINTS.CONTROLS}/${control.id}`
      : API_ENDPOINTS.CONTROLS;

    try {
      const typedControl = isSodControl(control)
        ? (control as GrcSodControl)
        : (control as GrcSaControl);

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(typedControl),
      });

      if (!response.ok) {
        setErrorMessage(`HTTP error! Status: ${response.status}`);
        setTimeout(() => setErrorMessage(''), 5000);
      }

      setSuccessMessage('Created Control Successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      setIsModalOpen(false);
      fetchControls();
    } catch (error) {
      console.error('Error saving Control:', error);
      setErrorMessage('Failed to save Control.');
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
    <ScreenLayout
      title="Controls"
      onCreate={handleCreateControl}
      successMessage={successMessage}
      errorMessage={errorMessage}
    >
      <ControlTable
        controls={controls}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />
      <ControlModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        control={selectedControl}
        onSubmit={handleSubmit}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => handleDeleteConfirm(selectedControlId)}
      />
    </ScreenLayout>
  );
};
