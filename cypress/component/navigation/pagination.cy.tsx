import React from 'react'
import Pagination from '../../../src/components/ui/global/pagination'

describe('<Pagination />', () => {
  it('renders proper pagination buttons', () => {
    const onPageChange = cy.stub().as('onPageChange')
    cy.mountWithSession(<Pagination currentPage={3} totalPages={10} onPageChange={onPageChange} />)
    // Check that left/right buttons are rendered
    cy.get('button').should('have.length.greaterThan', 0)
    // Check that current page button is disabled (button shows 3)
    cy.contains('3').should('be.disabled')
  })
})