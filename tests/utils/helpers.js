// helpers.js

export async function login(t, username, password) {
    await t
        .typeText('#username', username)
        .typeText('#password', password)
        .click('#loginButton');
}

export async function takeScreenshot(t, testName) {
    const screenshotPath = `reports/screenshots/${testName}.png`;
    await t.takeScreenshot(screenshotPath);
}

export async function logMessage(message) {
    const logFile = `reports/logs/test.log`;
    const fs = require('fs');
    fs.appendFileSync(logFile, `${new Date().toISOString()} - ${message}\n`);
}
