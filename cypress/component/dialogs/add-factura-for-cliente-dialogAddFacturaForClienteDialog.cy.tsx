import React from 'react'
import AddFacturaForClienteDialog from '../../../src/components/ui/cliente-id/add-factura-for-cliente-dialog'

describe('<AddFacturaForClienteDialog />', () => {
  it('renders', () => {
    cy.mountWithSession(
      <AddFacturaForClienteDialog
        cliente={{
          client_id: "1",
          nombre: 'Test Cliente',
          plazas: [],
          saldo_pendiente: 0,
          saldo_vencido: 0,
          direccion: '',
          telefono: '',
          credito_por_dias: 20,
          nit: 'DefaultNit',
        }}
        addFactura={() => {}}
      />
    )
  })
})