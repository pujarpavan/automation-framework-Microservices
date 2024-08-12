// loginTests.js

import { LoginPage } from './loginPage';
import { environment } from '../common/env';
import { login, takeScreenshot, logMessage } from '../utils/helpers';

const loginPage = new LoginPage();

fixture `Login Tests`
    .page `${environment.baseUrl}/login`
    .beforeEach(async t => {
        logMessage('Starting a new test');
    });

test('User can log in with valid credentials', async t => {
    await login(t, 'validUsername', 'validPassword');
    await loginPage.verifyLoginSuccess(t);
    await takeScreenshot(t, 'validLoginTest');
});

test('Login fails with invalid credentials', async t => {
    await login(t, 'invalidUsername', 'invalidPassword');
    await loginPage.verifyLoginFailure(t);
    await takeScreenshot(t, 'invalidLoginTest');
});

