Feature: Login Modal

  Scenario: Happy Path Register
    Given I view the homepage
    Then I should see the login modal
    When I click the register checkbox
    And I enter a random username
    And I enter a password of password
    And I enter a password confirmation of password
    And I click on the register button
    Then I should see success logging in

  Scenario: Happy Path Login
    Given I view the homepage
    Then I should see the login modal
    When I enter the active username
    And I enter a password of password
    And I click on the login button
    Then I should see failure logging in

  Scenario Outline: Register Failure Edge Cases
    Given I view the homepage
    Then I should see the login modal
    When I click the register checkbox
    And I enter a username of <username>
    And I enter a password of <password>
    And I enter a password confirmation of <confirm>
    And I click on the register button
    Then I should see failure logging in
    Examples:
      | username | password | confirm |
      |          |          |         |
      |          |          | pass_b  |
      |          | pass_a   |         |
      |          | pass_a   | pass_b  |
      |          | pass_a   | pass_a  |
      | foo      |          |         |
      | foo      | pass_a   |         |
      | foo      |          | pass_b  |
      | foo      | pass_a   | pass_b  |

  Scenario Outline: Login Failure Edge Cases
    Given I view the homepage
    Then I should see the login modal
    When I enter a username of <username>
    And I enter a password of <password>
    And I click on the login button
    Then I should see failure logging in
    Examples:
      | username | password |
      |          |          |
      | foo      |          |
      |          | pass_a   |
      | foo      | pass_a   |

