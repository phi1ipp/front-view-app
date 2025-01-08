// src/constants/apiConstants.js



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
    CONNECTIONS : `${BASE_URL}/connections`,
    CONNECTIONS_EDIT: `${BASE_URL}/connections/`,
    TEST_CONNECTION:`${BASE_URL}/connections/test-connection`,

     //Controls
     CONTROLS : `${BASE_URL}/controls`,
     CONTROLS_EDIT: `${BASE_URL}/controls/`,

     //Entitlements
     ENTITLEMENTS : `${BASE_URL}/entitlements`,
     ENTITLEMENTS_EDIT : `${BASE_URL}/entitlements/`,
     ENTITLEMENTS_ACCESSLIST: `${BASE_URL}/accessSet`


    // Add more API endpoints as needed
};
