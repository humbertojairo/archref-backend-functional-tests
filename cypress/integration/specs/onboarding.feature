@Onboarding
Feature: Teste Api

  Scenario: GET Api
    Given that i made a get call to onboarding
    Then i should receive status 200

  Scenario: Visit Chargeback
    Given that i visit the chargeback portal
    Then the page should load
