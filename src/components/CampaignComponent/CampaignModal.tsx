import React, { useState, useEffect } from 'react';
import { Modal, ModalActions, FormField, Button, DualList, TagOption } from '../shared';
import { CampaignModalProps, Campaign } from '../../types/types';
import { API_ENDPOINTS } from '../../types/api';

interface ConnectionOption {
  id: number | string;
  name: string;
}

const emptyCampaign = (): Campaign => ({
  id: '',
  name: '',
  status: '',
  violationCount: '',
  connId: '',
  controls: [],
});

export const CampaignModal: React.FC<CampaignModalProps> = ({
  isOpen,
  onClose,
  campaign,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Campaign>(emptyCampaign());
  const [connections, setConnections] = useState<ConnectionOption[]>([]);
  const [controls, setControls] = useState<TagOption[]>([]);
  const [availableControls, setAvailableControls] = useState<TagOption[]>([]);
  const [selectedControls, setSelectedControls] = useState<TagOption[]>([]);
  const [showControlsModal, setShowControlsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchConnections();
    fetchAllControls();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    if (campaign) {
      setFormData(campaign);

      fetchCampaignControls(campaign.name).then((campaignControls) => {
        if (campaign.id && controls.length) {
          setSelectedControls(campaignControls);
          setAvailableControls(
            controls.filter(
              (control) => !campaignControls.map((c: TagOption) => c.id).includes(control.id)
            )
          );
          setShowControlsModal(true);
        } else {
          setAvailableControls(controls);
          setFormData(emptyCampaign());
        }
      });
    } else {
      setFormData(emptyCampaign());
      setSelectedControls([]);
      setAvailableControls(controls);
    }
  }, [isOpen, controls, campaign]);

  const fetchConnections = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.CONNECTIONS, { credentials: 'include' });
      const data = await response.json();
      setConnections(data || []);
    } catch (error) {
      console.error('Error fetching connections:', error);
      setConnections([]);
    }
  };

  const fetchCampaignControls = async (campaignName: string): Promise<TagOption[]> => {
    try {
      const response = await fetch(API_ENDPOINTS.CAMPAIGN_CONTROLS(campaignName), {
        credentials: 'include',
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching campaign controls:', error);
      return [];
    }
  };

  const fetchAllControls = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.CONTROLS);
      const data = await response.json();
      setControls(data || []);
    } catch (error) {
      console.error('Error fetching controls:', error);
      setControls([]);
    }
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    const campaignName = formData.name;
    const connId = formData.connId;

    try {
      if (formData.id === '') await fetch(API_ENDPOINTS.CAMPAIGN_PREPARE(campaignName, connId));

      setShowControlsModal(true);
    } catch (error) {
      console.error('Failed to prepare campaign:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.connId || selectedControls.length === 0) return;

    setIsLoading(true);
    try {
      const campaignToSubmit = {
        name: formData.name,
        connId: formData.connId,
        controlIds: selectedControls.map((control) => control.id),
      };
      await onSubmit(campaignToSubmit as unknown as Campaign);
      onClose();
    } catch (error) {
      console.error('Failed to create campaign:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddControl = (controlId: string) => {
    const control = availableControls.find((c) => c.id === controlId);
    if (control) {
      setSelectedControls((prev) => [...prev, control]);
      setAvailableControls((prev) => prev.filter((c) => c.id !== controlId));
    }
  };

  const handleRemoveControl = (controlId: string) => {
    const control = selectedControls.find((c) => c.id === controlId);
    if (control) {
      setAvailableControls((prev) => [...prev, control]);
      setSelectedControls((prev) => prev.filter((c) => c.id !== controlId));
    }
  };

  const handleAddAllControls = () => {
    setSelectedControls([...selectedControls, ...availableControls]);
    setAvailableControls([]);
  };

  const handleRemoveAllControls = () => {
    setAvailableControls([...availableControls, ...selectedControls]);
    setSelectedControls([]);
  };

  const cancelControl = () => {
    onClose();
    setSelectedControls([]);
  };

  if (!isOpen) return null;

  if (showControlsModal) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={formData.id ? 'Edit Campaign' : 'Create Campaign'}
        maxWidth={600}
      >
        <form onSubmit={handleSubmit}>
          <DualList
            available={availableControls}
            selected={selectedControls}
            onAdd={handleAddControl}
            onRemove={handleRemoveControl}
            onAddAll={handleAddAllControls}
            onRemoveAll={handleRemoveAllControls}
          />
          <ModalActions>
            <Button variant="primary" onClick={cancelControl}>
              Cancel
            </Button>
            <Button variant="ghost" onClick={() => setShowControlsModal(false)}>
              Previous
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Submit'}
            </Button>
          </ModalActions>
        </form>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Campaign" maxWidth={1000}>
      <form onSubmit={handleNext}>
        <FormField
          id="name"
          label="Campaign Name"
          type="text"
          value={formData.name}
          onChange={(v) => setFormData({ ...formData, name: v })}
          disabled={!!formData.id}
          required
        />
        <FormField
          id="connection"
          label="Connections"
          value={formData.connId}
          onChange={(v) => setFormData({ ...formData, connId: v })}
          disabled={!!formData.id}
          required
          options={[
            { value: '', label: 'Select connection' },
            ...connections.map((c) => ({ value: String(c.id), label: c.name })),
          ]}
        />
        <ModalActions>
          <Button variant="ghost" onClick={cancelControl}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Next
          </Button>
        </ModalActions>
      </form>
    </Modal>
  );
};
