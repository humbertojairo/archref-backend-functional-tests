import { Given, Then } from 'cypress-cucumber-preprocessor/steps'


Given('that sellers-limits API was accessed', () => {
    
    cy.api({
        method: 'GET',
        url: 'https://ant-anticipation-sellers-limits-ms.app.dev.gms.corp/api/seller-limit',
        headers: {
            'country': 'AR',
            'tenant': 'Santander'
          }

    }).as('getapi');

});

Then('the response status should to be 200', () => {
    cy.get('@getapi').should((response) => {
    expect(response.status).to.be.equal(200);

    });

});