var EC = protractor.ExpectedConditions;

var HomepagePageObject = function () {
    this.selectors = {
        'REGISTER_CHECKBOX': '.e2e-register-checkbox',
        'REGISTER_BUTTON': '.e2e-register-button',
        'LOGIN_USERNAME': '.e2e-login-username',
        'LOGIN_PASSWORD': '.e2e-login-password',
        'LOGIN_CONFIRM': '.e2e-login-confirm',
        'LOGIN_BUTTON': '.e2e-login-button',
        'LOGIN_MESSAGE': '.e2e-login-result'
    };

    this.registerCheckbox = browser.$(this.selectors.REGISTER_CHECKBOX);
    this.registerButton = browser.$(this.selectors.REGISTER_BUTTON);
    this.loginUsername = browser.$(this.selectors.LOGIN_USERNAME);
    this.loginPassword = browser.$(this.selectors.LOGIN_PASSWORD);
    this.loginConfirm = browser.$(this.selectors.LOGIN_CONFIRM);
    this.loginButton = browser.$(this.selectors.LOGIN_BUTTON);
    this.loginMessage = browser.$(this.selectors.LOGIN_MESSAGE);
};

HomepagePageObject.prototype.isLoginModalVisible = function () {
    browser.wait(EC.visibilityOf(this.loginUsername), 5000);
    return this.loginUsername.isDisplayed();
};

HomepagePageObject.prototype.clickRegisterCheckbox = function () {
    browser.wait(EC.visibilityOf(this.registerCheckbox), 5000);
    return this.registerCheckbox.click();
};

HomepagePageObject.prototype.enterUsername = function (username) {
    browser.wait(EC.visibilityOf(this.loginUsername), 5000);
    return this.loginUsername.sendKeys(username);
};

HomepagePageObject.prototype.enterPassword = function (password) {
    browser.wait(EC.visibilityOf(this.loginPassword), 5000);
    return this.loginPassword.sendKeys(password);
};

HomepagePageObject.prototype.enterConfirmationPassword = function (confirm) {
    browser.wait(EC.visibilityOf(this.loginConfirm), 5000);
    return this.loginConfirm.sendKeys(confirm);
};

HomepagePageObject.prototype.clickRegisterButton = function () {
    browser.wait(EC.visibilityOf(this.registerButton), 5000);
    return this.registerButton.click();
};

HomepagePageObject.prototype.clickLoginButton = function () {
    browser.wait(EC.visibilityOf(this.loginButton), 5000);
    return this.loginButton.click();
};

HomepagePageObject.prototype.isPageVisible = function () {
    browser.wait(EC.visibilityOf(this.loginMessage), 5000);
    return this.loginMessage.isDisplayed();
};

module.exports = HomepagePageObject;
