// src/constants/apiConstants.js



// const BASE_URL = 'http://localhost:8080/api';
const BASE_URL = '/api';

export const API_ENDPOINTS = {
    CAMPAIGNS: `${BASE_URL}/report`,
    CAMPAIGN_PREPARE: (campaignName, connectionId) => `${BASE_URL}/report/${campaignName}/connection/${connectionId}/prepare`,
    CAMPAIGN_START: (campaignName) => `${BASE_URL}/report/${campaignName}/start`,
    CAMPAIGN_DOWNLOAD: (campaignName) => `${BASE_URL}/report/${campaignName}/download`,
    //CAMPAIGN_CONTROLS: (campaignName) => `${BASE_URL}/campaigns/${campaignName}/controls`,
    CAMPAIGN_CONTROLS: (campaignName) => `${BASE_URL}/report/${campaignName}/controls`,

    CAMPAIGN_CONNECTIONS: `${BASE_URL}/campaignConnections`,

    //Exclusions
    EXCLUSIONS: `${BASE_URL}/exclusion`,

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