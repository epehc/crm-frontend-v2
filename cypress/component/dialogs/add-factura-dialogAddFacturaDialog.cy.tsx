import React from 'react'
import AddFacturaDialog from '../../../src/components/ui/facturas/add-factura-dialog'

describe('<AddFacturaDialog />', () => {
  it('renders', () => {
    cy.mountWithSession(<AddFacturaDialog addFactura={() => {}} />)
  })
})