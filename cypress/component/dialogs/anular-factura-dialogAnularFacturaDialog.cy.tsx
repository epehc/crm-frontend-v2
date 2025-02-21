import React from 'react'
import AnularFacturaDialog from '../../../src/components/ui/facturas/anular-factura-dialog'

describe('<AnularFacturaDialog />', () => {
  it('renders', () => {
    cy.mountWithSession(<AnularFacturaDialog factura={{} as any} onAnularFactura={() => {}} />)
  })
})