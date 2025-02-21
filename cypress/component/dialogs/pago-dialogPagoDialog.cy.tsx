import React from 'react'
import PagoDialog from '../../../src/components/ui/facturas/pago-dialog'

describe('<PagoDialog />', () => {
  it('renders', () => {
    cy.mountWithSession(<PagoDialog factura={{} as any} client_id="test-client" addPago={() => {}} />)
  })
})