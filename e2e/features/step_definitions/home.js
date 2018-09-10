var chai = require('chai'),
  chaiAsPromised = require('chai-as-promised'),
  expect = chai.expect;

chai.use(chaiAsPromised);

var HomePO = require('../page_objects/home.po.js'),
  home = new HomePO();

var steps = function () {
  this.Given(/^I view the homepage$/, function (callback) {
    browser
      .get(browser.params.env.hostname)
      .then(callback);
  });

  this.When(/^I click on the sign in button$/, function (callback) {
    home
      .clickLoginButton()
      .then(callback);
  });

  this.Then(/^I should see a message telling me that the button was clicked$/, function (callback) {
    expect(home.isLoginResultPresent()).to.eventually.equal(true).and.notify(callback);
  });
};

module.exports = steps;
