import { Given, Then } from 'cypress-cucumber-preprocessor/steps'
import 'cypress-plugin-api'

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

//Then(`i should receive status 200`, () => {
//  cy.get('@onbCall').should((response) => {
//    expect(response.status).to.equal(200)
//  })
//})