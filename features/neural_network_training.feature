Feature: Training Neural Network
  As a user of learning-lights
  I want to create training data from logged data
  So that I can train a neural network to predict light states

  Scenario: Train network
    Given I am on the learning page
    When I train the network
    Then a trained network is produced