import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'


Given(`that i am in the creation user page`, () => {
  cy.visit('/treinar-automacao.php')
  cy.contains('h1[class=title]', 'Iniciando na Automação de testes.')
    .should('be.visible')
})

When(`create a new user with {string} and {string} and {string}`, (user, password, name) => {
  cy.createUser(user, password, name)
})

Then(`the {string} should be visible on the list`, user => {
  cy.contains('td[align=center]', user)
    .should('be.visible')
  cy.get('td[align=center]', user).dblclick
})

When(`i click on delete link at {string} row`, user => {
  cy.deleteUser(user)
})

Then(`the {string} should not be visible on the list`, user => {
  cy.contains('td[align=center]', user)
    .should('not.exist')
})
