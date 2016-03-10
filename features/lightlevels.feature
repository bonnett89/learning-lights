Feature: Light Levels
  As a user of learning-lights
  I want to be able to see the most recent light levels availiable

  Scenario: display latest light levels
    Given I am on the light level page
    Then I should see the latest light levels

  Scenario: per light level information
    Given I am on the light level page
    Then I should see the light level and date of each entry
