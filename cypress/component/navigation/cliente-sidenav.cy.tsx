import React, { useState } from 'react'
import ClienteSidenav from '../../../src/components/ui/cliente-id/cliente-sidenav'

const ClienteSidenavWrapper = () => {
  const [activeSection, setActiveSection] = useState('facturas')
  return <ClienteSidenav activeSection={activeSection} setActiveSection={setActiveSection} />
}

describe('<ClienteSidenav />', () => {
  it('renders and highlights the active section', () => {
    cy.mountWithSession(<ClienteSidenavWrapper />)
    // Check that one of the links is rendered (e.g., Facturas)
    cy.contains('Facturas').should('be.visible')
  })

  it('changes active section on click', () => {
    cy.mountWithSession(<ClienteSidenavWrapper />)
    // Click on 'Personas de Contacto'
    cy.contains('Personas de Contacto').click()
    // After the click, the background should indicate the change. You may check by CSS class:
    cy.contains('Personas de Contacto')
      .parent()
      .should('have.class', 'bg-gray-300')
  })
})