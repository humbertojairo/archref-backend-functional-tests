import { Given, Then } from 'cypress-cucumber-preprocessor/steps'


Given(`that i made a get call to onboarding`, () => {
  cy.request({
    method: 'GET',
    url: 'https://onb-offers-ms.app.dev.gms.corp/api/offers?billing=1&context=default&type=new_customer&mcc%5B0%5D=62&mcc%5B1%5D=7512&business_unit=MX&channel=mx_onboarding_sales_executive&currency=MXN',
    headers: {
      'country': 'MX',
      'tenant': 'santander'
    }
  }).as('onbCall')
})

Then(`i should receive status 200`, () => {

  cy.get('@onbCall').should((response) => {
    expect(response.status).to.equal(200)
  })
})

Given(`that i visit the chargeback portal`, () => {
  cy.visit('https://chb-chargebacks-portal.app.dev.gms.corp/pt-br/claims')
})

Then(`the page should load`, () => {
  cy.wait(30000)
})