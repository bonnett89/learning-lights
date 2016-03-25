Feature: Manual Light Control
  As a user of learning-lights
  I want to be able to manually control a light
  So that I have control of a light

  Scenario: Turn light on
    Given I am on the Home screen
    When I select the on button
    Then I should see that an attempt has been made to turn the light on

  Scenario: Turn light off
    Given I am on the Home screen
    When I select the off button
    Then I should see that an attempt has been made to turn the light off

  