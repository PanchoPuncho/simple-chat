Feature: Login
  Scenario: Registration
    Given I view the homepage
    When I click on the sign in button
    Then I should see a message telling me that the button was clicked
