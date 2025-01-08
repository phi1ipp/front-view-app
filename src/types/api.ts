// src/constants/apiConstants.js

import { CampaignModal } from "../components/CampaignComponent/CampaignModal";

const BASE_URL = 'http://localhost:4000';

export const API_ENDPOINTS = {
    CAMPAIGNS: `${BASE_URL}/campaigns`,
    DOWNLOAD_CAMPAIGNS:  `${BASE_URL}/campaigns`,
    CAMPAIGN_CONNECTIONS: `${BASE_URL}/campaignConnections`,
    CAMPAIGN_CONTROLS: `${BASE_URL}/campaignControls`,


    //Users
    USERS: `${BASE_URL}/usersdata`,
    USERS_EDIT: `${BASE_URL}/usersdata/`,

    //Connections
    CONNECTIONS : `${BASE_URL}/connections/`,
    CONNECTIONS_EDIT: `${BASE_URL}/connections/`,


    // Add more API endpoints as needed
};
