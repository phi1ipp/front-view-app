// src/constants/apiConstants.js



const BASE_URL = 'http://localhost:4000';

export const API_ENDPOINTS = {
    CAMPAIGNS: `${BASE_URL}/campaigns`,
    CAMPAIGN_PREPARE: (campaignName, connectionId) => `${BASE_URL}/campaigns/${campaignName}/connection/${connectionId}/prepare`,
    CAMPAIGN_START: (campaignName) => `${BASE_URL}/campaigns/${campaignName}/start`,
    DOWNLOAD_CAMPAIGNS:  `${BASE_URL}/campaigns`,
    CAMPAIGN_CONNECTIONS: `${BASE_URL}/connections`,
    CAMPAIGN_CONTROLS: (campaignName) => `${BASE_URL}/campaigns/${campaignName}/controls`,

    //Users
    USERS: `${BASE_URL}/users`,

    //Connections
    CONNECTIONS : `${BASE_URL}/connections`,
    TEST_CONNECTION:`${BASE_URL}/connections/test-connection`,

     //Controls
     CONTROLS : `${BASE_URL}/controls`,
     //Entitlements
     ENTITLEMENTS : `${BASE_URL}/entitlements`,
     ENTITLEMENTS_ACCESSLIST: `${BASE_URL}/accessSet`


    // Add more API endpoints as needed
};
