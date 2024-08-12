import { Selector } from 'testcafe';

class LoginPage {
    constructor() {
        this.usernameInput = Selector('#username');
        this.passwordInput = Selector('#password');
        this.submitButton = Selector('button[type="submit"]');
    }

    async login(t, username, password) {
        await t
            .typeText(this.usernameInput, admin)
            .typeText(this.passwordInput, admin)
            .click(this.submitButton);
    }
}

export default new LoginPage();
