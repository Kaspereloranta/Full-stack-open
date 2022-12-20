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

  describe.only('When logged in', function() {
    beforeEach(function(){
      cy.contains('log in').click()
      cy.get('#username').type('KasperE')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('tekijä')
      cy.get('#url').type('url')
      cy.get('#submit-button').click()
      cy.contains('a blog created by cypress')
      cy.visit('http://localhost:3001')
      cy.contains('a blog created by cypress')
    })

    it('A blog can be liked', function(){
      cy.contains('new blog').click()
      cy.get('#title').type('Tykättävä blogi')
      cy.get('#author').type('Kasper Eloranta')
      cy.get('#url').type('www.hyväblogi.fi')
      cy.contains('save').click()
      cy.visit('http://localhost:3001')

      cy.contains('view').click()
      cy.contains('Tykättävä blogi by Kasper Eloranta')
      cy.contains('www.hyväblogi.fi')
      cy.contains('0')
      cy.get('#likebutton').click()
      cy.contains('1')
    })

    it('A blog can be created and deleted by user', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('tekijä')
      cy.get('#url').type('url')
      cy.get('#submit-button').click()
      cy.contains('a blog created by cypress')
      cy.visit('http://localhost:3001')
      cy.contains('a blog created by cypress')
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.visit('http://localhost:3001')
      cy.get('html').should('not.contain', 'a blog created by cypress')
      cy.get('html').should('not.contain', 'tekijä')
      cy.get('html').should('not.contain', 'url')
    })
  })
})

