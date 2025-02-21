describe('Login page', () => {
  beforeEach(() => {
    // Visit the login page.
    cy.visit('/login')
  })

  it('simulates login and redirects to dashboard', () => {
    // Instead of overriding signIn, we stub the session to simulate an authenticated user.
    cy.loginByStub()
    
    // Visit a protected page. Your app should detect the stubbed session.
    cy.visit('/dashboard/candidatos?page=1')
    
    // Verify that we are on the dashboard.
    cy.url().should('include', '/dashboard/candidatos?page=1')
  })
})