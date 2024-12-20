import { Campaign, Control, Connection } from './types';

export const fetchControls = async (): Promise<Control[]> => {
  const response = await fetch('/api/controls');
  return response.json();
};

export const fetchConnections = async (): Promise<Connection[]> => {
  const response = await fetch('/api/connections');
  return response.json();
};

export const createCampaign = async (campaign: Campaign): Promise<Campaign> => {
  const response = await fetch('/api/campaigns', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(campaign),
  });
  return response.json();
};


export const fetchCampaigns = async (): Promise<Connection[]> => {
  const response = await fetch('/api/connections');
  return response.json();
};

export const downloadCampaignReport = async (): Promise<Connection[]> => {
  const response = await fetch('/api/connections');
  return response.json();
};

