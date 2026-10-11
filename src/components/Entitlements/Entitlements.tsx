import React, { useState, useEffect } from 'react';
import { DeleteModal, ScreenLayout } from '../shared';
import { EntitlementTable } from './EntitlementTable';
import { EntitlementModal } from './EntitlementModal';
import { Entitlement } from '../../types/types';
import { API_ENDPOINTS } from '../../types/api';

export const Entitlements: React.FC = () => {
  const [entitlements, setEntitlements] = useState<Entitlement[]>([]);
  const [isEntitlementModalOpen, setIsEntitlementModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEntitlement, setSelectedEntitlement] = useState<Entitlement | undefined>(undefined);
  const [selectedEntitlementId, setSelectedEntitlementId] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchEntitlements();
  }, []);

  const fetchEntitlements = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.ENTITLEMENTS);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEntitlements(data);
    } catch (error) {
      console.error('Error fetching Entitlements:', error);
    }
  };

  const handleEditEntitlement = (entitlement: Entitlement) => {
    setSelectedEntitlement(entitlement);
    setIsEntitlementModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedEntitlementId(id);
    setIsDeleteModalOpen(true);
  };

  const handleEntitlementSubmit = async (entitlement: Entitlement) => {
    if (!entitlement || !entitlement.name) {
      setErrorMessage('Entitlement name is required.');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }

    try {
      const method = selectedEntitlement ? 'PUT' : 'POST';
      const url = selectedEntitlement
        ? `${API_ENDPOINTS.ENTITLEMENTS}/${entitlement.id}`
        : API_ENDPOINTS.ENTITLEMENTS;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entitlement),
      });

      if (!response.ok) {
        setErrorMessage(`HTTP error! Status: ${response.status}`);
        setTimeout(() => setErrorMessage(''), 5000);
        return;
      }

      setSuccessMessage('Entitlement saved successfully!');
      setTimeout(() => setSuccessMessage(''), 5000);

      fetchEntitlements();
      setIsEntitlementModalOpen(false);
    } catch (error) {
      console.error('Error saving entitlement:', error);
      setErrorMessage('Failed to save entitlement.');
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  const handleDeleteConfirm = async (id: string) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.ENTITLEMENTS}/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        setErrorMessage(`HTTP error! Status: ${response.status}`);
        setTimeout(() => setErrorMessage(''), 5000);
      }

      setSuccessMessage('Deleted Entitlement Successfully!');
      setTimeout(() => setSuccessMessage(''), 5000);
      fetchEntitlements();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting Entitlement:', error);
      setErrorMessage('Failed to delete Entitlement.');
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  return (
    <ScreenLayout
      title="Entitlements"
      successMessage={successMessage}
      errorMessage={errorMessage}
    >
      <EntitlementTable
        entitlements={entitlements}
        onEdit={handleEditEntitlement}
        onDelete={handleDeleteClick}
      />
      <EntitlementModal
        isOpen={isEntitlementModalOpen}
        onClose={() => setIsEntitlementModalOpen(false)}
        entitlement={selectedEntitlement}
        onSubmit={handleEntitlementSubmit}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => handleDeleteConfirm(selectedEntitlementId)}
      />
    </ScreenLayout>
  );
};
