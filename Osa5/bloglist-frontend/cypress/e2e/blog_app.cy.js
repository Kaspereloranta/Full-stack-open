describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Kasper Eoranta',
      username: 'KasperE',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3001')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('log in')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('KasperE')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
    })

    it('fails with wrong credenttials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('KasperE')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error').should('contain','Wrong username or password')
      cy.get('.error').and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'KasperE logged') 
    })
  })
})
