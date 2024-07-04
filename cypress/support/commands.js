// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { validate } from 'jsonschema'

Cypress.Commands.add('validateSchema', (res, schema) => {
  cy.fixture(`schemas/${schema}`).as('dataLoader').then(schema => {
    const validation = validate(res, schema, {required: true, nestedErrors: true})
    let errors = ''
    if (!validation.valid) {
      errors += validation.errors.map(err => {
        return '\n' + err.message
      })
      throw new Error('SCHEMA VALIDATION ERROR: ' + errors)
    }
  })
})

Cypress.Commands.add('createUser', (user, password, name) => {
  cy.get('input[name=form_usuario]').type(user)
  cy.get('input[name=form_senha]').type(password)
  cy.get('input[name=form_nome]').type(name)
  cy.get('input[value=Enviar]').click()
})

Cypress.Commands.add('deleteUser', user => {
  cy.contains('td[align=center]', user)
    .parent()
      .contains('a', 'Apagar')
      .click()
})
