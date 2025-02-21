import React from 'react'
import AgendarEntrevistaDialog from '../../../src/components/ui/candidato-id/agendar-entrevista-dialog'

describe('<AgendarEntrevistaDialog />', () => {
  it('renders', () => {
    cy.mountWithSession(<AgendarEntrevistaDialog candidato={{} as any} shortVersion={true} />)
  })
})