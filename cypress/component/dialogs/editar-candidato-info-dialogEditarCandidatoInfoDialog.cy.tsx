import React from 'react'
import EditarCandidatoInfoDialog from '../../../src/components/ui/candidato-id/edit/editar-candidato-info-dialog'
import { Candidato } from '@/lib/definitions'

describe('<EditarCandidatoInfoDialog />', () => {
  it('renders', () => {
    const mockCandidato: Candidato = {
      candidato_id: '123',
      nombre: 'John Doe',
      puesto_aplicado: 'Developer',
      como_se_entero: 'LinkedIn',
      telefono: '123-456-7890',
      genero: 'Masculino',
      telefono_whatsapp: '123-456-7890',
      correo: 'john.doe@example.com',
      aspiracion_salarial: '50000',
      timestamp: new Date().toISOString(),
      comentarios: "",
    }
    const mockOnEdit = () => {}

    cy.mountWithSession(<EditarCandidatoInfoDialog candidato={mockCandidato} onEdit={mockOnEdit} />)
  })
})