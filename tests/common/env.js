// env.js

export const environment = {
    baseUrl: process.env.BASE_URL || 'https://10.134.119.220/login',
    apiEndpoint: process.env.API_ENDPOINT || 'http://api.your-app-url.com',
    timeout: process.env.TIMEOUT || 30000 // Default timeout for all tests
};
