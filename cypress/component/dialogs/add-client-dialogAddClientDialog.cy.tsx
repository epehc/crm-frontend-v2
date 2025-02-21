import React from 'react'
import AddClientDialog from '../../../src/components/ui/clientes/add-client-dialog'

// Here you can stub the session if needed, for example using your custom mountWithSession:
// cy.mountWithSession(<AddClientDialog ... />)
// For this sample, assume mounting works as expected

describe('<AddClientDialog />', () => {
  it('opens dialog on button click', () => {
    cy.mountWithSession(<AddClientDialog addCliente={() => {}} />)
    // Initially, the dialog content should not be visible.
    cy.contains('Agregar un nuevo cliente').should('not.exist')
    // Click the trigger button to open the dialog.
    cy.get('button').contains(/Nuevo cliente/i).click()
    // Now the title of the dialog should be visible.
    cy.contains('Agregar un nuevo cliente').should('be.visible')
  })

  
  it('renders input fields when the dialog is open', () => {
    cy.mountWithSession(<AddClientDialog addCliente={() => {}} />)
    // Open the dialog.
    cy.get('button').contains(/Nuevo cliente/i).click()
    // Check for one or more input fields.
    cy.get('input')
      .should('have.length.greaterThan', 0)
      .and('be.visible')
    // Optionally check that the "Nombre:" label exists.
    cy.contains('Nombre:').should('be.visible')
  })
})

