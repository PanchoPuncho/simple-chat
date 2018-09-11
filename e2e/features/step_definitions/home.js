var chai = require('chai'),
  chaiAsPromised = require('chai-as-promised'),
  expect = chai.expect;
chai.use(chaiAsPromised);

var HomePO = require('../page_objects/home.po.js'),
  home = new HomePO();

var uuid = require("uuid");
var randomId = '';

var steps = function () {
  this.Given(/^I view the homepage$/, function (callback) {
    browser.get(browser.params.env.hostname).then(callback);
  });

  this.Then(/^I should see the login modal$/, function (callback) {
    expect(home.isLoginModalVisible()).to.eventually.equal(true).and.notify(callback);
  });

  this.When(/^I click the register checkbox$/, function (callback) {
    home.clickRegisterCheckbox().then(callback);
  });

  this.When(/^I enter a username of (.*?)$/, function (str, callback) {
    home.enterUsername(str).then(callback);
  });

  this.When(/^I enter a random username$/, function (callback) {
    randomId = uuid.v4();
    home.enterUsername(randomId).then(callback);
  });

  this.When(/^I enter the active username$/, function (callback) {
    home.enterUsername(randomId).then(callback);
  });

  this.When(/^I enter a password of (.*?)$/, function (str, callback) {
    home.enterPassword(str).then(callback);
  });

  this.When(/^I enter a password confirmation of (.*?)$/, function (str, callback) {
    home.enterConfirmationPassword(str).then(callback);
  });

  this.When(/^I click on the register button$/, function (callback) {
    home.clickRegisterButton().then(callback);
  });

  this.When(/^I click on the login button$/, function (callback) {
    home.clickLoginButton().then(callback);
  });

  this.Then(/^I should see failure logging in$/, function (callback) {
    expect(home.isLoginModalVisible()).to.eventually.equal(true).and.notify(callback);
  });

  this.Then(/^I should see success logging in$/, function (callback) {
    expect(home.isPageVisible()).to.eventually.equal(true).and.notify(callback);
  });
};

module.exports = steps;
