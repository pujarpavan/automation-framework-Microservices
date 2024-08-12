// testcafe-config.js
module.exports = {
    browsers: ['chrome:headless'],
    reporter: [
        { name: 'xunit', output: 'reports/test-results.xml' }
    ],
    screenshots: {
        path: 'reports/screenshots/',
        takeOnFails: true
    },
    appUrl: 'http://your-service-url-on-vm'
};
