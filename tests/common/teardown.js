// teardown.js

fixture `Global Teardown`
    .afterEach(async t => {
        console.log('Global teardown after each test');
        // Additional cleanup logic can be added here
    });
