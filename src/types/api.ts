// src/constants/apiConstants.js



const BASE_URL = '/api';

export const API_ENDPOINTS = {
    CAMPAIGNS: `${BASE_URL}/report`,
    CAMPAIGN_PREPARE: (campaignName, connectionId) => `${BASE_URL}/report/${campaignName}/connection/${connectionId}/prepare`,
    DOWNLOAD_CAMPAIGNS:  `${BASE_URL}/campaigns`,
    CAMPAIGN_CONNECTIONS: `${BASE_URL}/campaignConnections`,
    CAMPAIGN_CONTROLS: (campaignName) => `${BASE_URL}/report/${campaignName}/controls`,


    //Users
    USERS: `${BASE_URL}/user`,

    //Connections
    CONNECTIONS : `${BASE_URL}/connection`,
    TEST_CONNECTION:`${BASE_URL}/connections/test-connection`,

     //Controls
     CONTROLS : `${BASE_URL}/control`,
     //Entitlements
     ENTITLEMENTS : `${BASE_URL}/entitlement`,
     ENTITLEMENTS_ACCESSLIST: `${BASE_URL}/accessSet`,
     ACCESSLIST: `${BASE_URL}/access`

    // Add more API endpoints as needed
};
