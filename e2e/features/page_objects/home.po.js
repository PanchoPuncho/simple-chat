var EC = protractor.ExpectedConditions;

var HomepagePageObject = function () {
    this.selectors = {
        'LOGIN_REGISTER': 'e2e-register-checkbox',
        'LOGIN_USERNAME': 'e2e-login-username',
        'LOGIN_PASSWORD': 'e2e-login-password',
        'LOGIN_CONFIRM': 'e2e-login-confirm',
        'LOGIN_BUTTON': '.e2e-login-button',
        'LOGIN_RESULT': '.e2e-login-result'
    };

    this.loginRegister = browser.$(this.selectors.LOGIN_REGISTER);
    this.loginUsername = browser.$(this.selectors.LOGIN_USERNAME);
    this.loginPassword = browser.$(this.selectors.LOGIN_PASSWORD);
    this.loginConfirm = browser.$(this.selectors.LOGIN_CONFIRM);
    this.loginButton = browser.$(this.selectors.LOGIN_BUTTON);
    this.loginResult = browser.$(this.selectors.LOGIN_RESULT);
};

HomepagePageObject.prototype.clickLoginButton = function () {
    browser.wait(EC.visibilityOf(this.loginButton), 5000);
    return this.loginButton.click();
};

HomepagePageObject.prototype.isLoginResultPresent = function () {
    return this.loginResult.isPresent();
};

module.exports = HomepagePageObject;
