Feature: Light Logging
  As a user of learning-lights
  I want to be able to log data
  So that I can use the data to train the neural network

  Scenario: Enable Logging
    Given I am on Light Logging page
    When I select Logging
    Then Light data should be logged

  Scenario: Disable Logging
    Given I am on the Light Logging page
    And Logging is enabled
    When I select Not Logging
    Then Light data should stop being logged