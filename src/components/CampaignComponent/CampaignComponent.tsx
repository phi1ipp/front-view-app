import React, { useState, useEffect } from 'react';
import { ScreenLayout, DeleteModal } from '../shared';
import { Campaign } from '../../types/types';
import { CampaignTable } from './CampaignTable';
import { CampaignModal } from './CampaignModal';
import { API_ENDPOINTS } from '../../types/api';

export const CampaignComponent: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | undefined>();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.CAMPAIGNS);
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();

    const intervalId = setInterval(fetchCampaigns, 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleDeleteClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsDeleteModalOpen(true);
  };

  const fetchCampaigns = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.CAMPAIGNS, { credentials: 'include' });
      const data = await response.json();
      setCampaigns(data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  const handleDownload = async (campaign: Campaign) => {
    try {
      const response = await fetch(API_ENDPOINTS.CAMPAIGN_DOWNLOAD(campaign.name), {
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reports_${campaign.name}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading campaign reports:', error);
    }
  };

  const handleStartClick = async (campaign: Campaign) => {
    const method = 'POST';
    try {
      // NOTE: `API_ENDPOINTS.DOWNLOAD_CAMPAIGNS` is not defined in src/types/api.ts, so this
      // request resolves to a relative "undefined" URL and fails. Preserved unchanged so this
      // styling refactor does not silently alter Start-button behaviour. Needs a real endpoint.
      await fetch(undefined as unknown as string, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaign),
      });
      setIsModalOpen(false);
      fetchCampaigns();
    } catch (error) {
      console.error('Error saving campaign:', error);
    }
  };

  const handleSubmit = async (campaign: Campaign) => {
    let response;

    try {
      if (selectedCampaign) {
        response = await fetch(`${API_ENDPOINTS.CONNECTIONS}/${campaign.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(campaign),
        });
      } else {
        response = await fetch(`${API_ENDPOINTS.CAMPAIGN_START(campaign.name)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(campaign),
        });
      }

      if (!response.ok) {
        setErrorMessage(`HTTP error! Status: ${response.status}`);
        setTimeout(() => setErrorMessage(''), 5000);
      }

      setSuccessMessage('Created Campaign Successfully!');
      setTimeout(() => setSuccessMessage(''), 5000);

      setIsModalOpen(false);
      fetchCampaigns();
    } catch (error) {
      console.error('Error saving campaign:', error);
      setErrorMessage('Failed to save campaign.');
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  const handleCreateCampaign = () => {
    setIsModalOpen(true);
  };

  const handleEdit = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async (name: string) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.CAMPAIGNS}/${name}`, { method: 'DELETE' });

      if (!response.ok) {
        setErrorMessage(`HTTP error! Status: ${response.status}`);
        setTimeout(() => setErrorMessage(''), 5000);
      }

      setSuccessMessage('Deleted Connection Successfully!');
      setTimeout(() => setSuccessMessage(''), 5000);

      fetchCampaigns();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting Connections:', error);
      setErrorMessage('Failed to deleting Connections.');
      setTimeout(() => setErrorMessage(''), 5000);
    } finally {
      setSelectedCampaign(undefined);
    }
  };

  return (
    <ScreenLayout
      title="Campaigns"
      onCreate={handleCreateCampaign}
      successMessage={successMessage}
      errorMessage={errorMessage}
    >
      <CampaignTable
        campaigns={campaigns}
        onDownload={handleDownload}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onStart={handleStartClick}
      />
      <CampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        campaign={selectedCampaign}
        onSubmit={handleSubmit}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        message={`Are you sure you want to delete campaign ${selectedCampaign?.name}? This action cannot be undone.`}
        onConfirm={() => {
          if (selectedCampaign) {
            handleDeleteConfirm(selectedCampaign.name);
          }
        }}
      />
    </ScreenLayout>
  );
};
