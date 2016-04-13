Feature: Lighting Mode Feature
  As a user of learning-lights
  I want to be able to change the lighting mode

  Scenario: View Modes
    Given I am on the Home page
    Then I should see the Lighting Modes available

  Scenario: Enable Learning Mode
    Given I am on the Home page
    When I select learning mode
    Then learning mode should be enabled

  Scenario: Disable Learning Mode
    Given I am on the Home page
    And learning mode is enabled
    When I disable learning mode
    Then learning mode should be disabled

  Scenario: Enable Manual Mode
    Given I am on the Home page
    When I select manual mode
    Then manual mode should be enabled

  Scenario: Disable Manual Mode
    Given I am on the Home page
    And manual mode is enabled
    When I disable manual mode
    Then manual mode should be disabled

  Scenario: Determine Mode
    Given I am on the Home page
    Then I should clearly see the mode currently running

  Scenario: Light Control through Learning - ON
    Given I am on the Home page
    And learning mode is enabled
    When the network predicts that a lightbulb should be ON
    Then the smart light bulb should go to an ON state

  Scenario: Light Control through learning - OFF
    Given I am on the Home page
    And learning mode is enabled
    When the network predicts that a lightbulb should be OFF
    Then the smart light bulb should go to an OFF state