import React from 'react'
import GenerarInformeDialog from '../../../src/components/ui/candidato-id/informe/generar-informe-dialog'

describe('<GenerarInformeDialog />', () => {
  it('renders', () => {
    cy.mountWithSession(<GenerarInformeDialog />)
  })
})