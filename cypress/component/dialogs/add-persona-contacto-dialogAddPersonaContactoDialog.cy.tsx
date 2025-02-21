import React from 'react'
import AddPersonaContactoDialog from '../../../src/components/ui/cliente-id/add-persona-contacto-dialog'

describe('<AddPersonaContactoDialog />', () => {
  it('renders', () => {
    cy.mountWithSession(<AddPersonaContactoDialog client_id="test-client" addContacto={() => {}} />)
  })
})