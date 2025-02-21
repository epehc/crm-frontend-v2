import React from 'react'
import SideNav from '../../../src/components/ui/dashboard/sidenav'

describe('<SideNav />', () => {
  it('renders with brand name and sign out button', () => {
    cy.mountWithSession(<SideNav />)
    cy.contains('PROreclutamiento CRM').should('be.visible')
    cy.contains('Cerrar Sesion').should('be.visible')
  })

  it('has a link to the candidatos dashboard', () => {
    cy.mountWithSession(<SideNav />)
    cy.contains('PROreclutamiento CRM')
      .closest('a')
      .should('have.attr', 'href', '/dashboard/candidatos')
  })
})
