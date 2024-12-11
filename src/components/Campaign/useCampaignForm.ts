import { useState, useCallback } from 'react';
import { Control, Connection, Campaign } from '../types';
import { fetchControls, fetchConnections, createCampaign } from '../api';

export const useCampaignForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [controls, setControls] = useState<Control[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Campaign>({
    name: '',
    controlId: '',
    connectionId: '',
  });

  const openModal = useCallback(async () => {
    setIsOpen(true);
    setLoading(true);
    try {
      const [controlsRes, connectionsRes] = await Promise.all([
        fetchControls(),
        fetchConnections(),
      ]);
      setControls(controlsRes.data);
      setConnections(connectionsRes.data);
    } catch (err) {
      setError('Failed to load form data');
    } finally {
      setLoading(false);
    }
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setError(null);
    setFormData({
      name: '',
      controlId: '',
      connectionId: '',
    });
  }, []);

  const updateField = useCallback((field: keyof Campaign, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const submitForm = useCallback(async () => {
    setLoading(true);
    try {
      await createCampaign(formData);
      closeModal();
    } catch (err) {
      setError('Failed to create campaign');
    } finally {
      setLoading(false);
    }
  }, [formData, closeModal]);

  return {
    isOpen,
    controls,
    connections,
    loading,
    error,
    formData,
    openModal,
    closeModal,
    updateField,
    submitForm,
  };
};