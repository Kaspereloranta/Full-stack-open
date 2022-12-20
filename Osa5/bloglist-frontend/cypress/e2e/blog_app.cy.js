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

  describe('When logged in', function() {
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
      cy.contains('Tykättävä blogi - Kasper Eloranta')
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


    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.contains('new blog').click()
        cy.get('#title').type('eka blogi')
        cy.get('#author').type(' ekatekijiä')
        cy.get('#url').type(' ekaurl')
        cy.get('#submit-button').click()
        cy.visit('http://localhost:3001')
        cy.contains('new blog').click()
        cy.get('#title').type('toka blogi')
        cy.get('#author').type(' tokatekijiä')
        cy.get('#url').type(' tokaurl')
        cy.get('#submit-button').click()
        cy.visit('http://localhost:3001')
        cy.contains('new blog').click()
        cy.get('#title').type('kolmas blogi')
        cy.get('#author').type(' kolmastekijiä')
        cy.get('#url').type(' kolmasurl')
        cy.get('#submit-button').click()
        cy.visit('http://localhost:3001')
      })

      it('one of those can be liked', function () {
        cy.contains('kolmas blogi').parent().find('button').eq(0).click()
        cy.contains('kolmas blogi').parent().find('button').eq(1).click()
        cy.contains('1')
      })

      it('one of those can be deleted', function () {
        cy.contains('toka blogi').parent().find('button').eq(0).click()
        cy.contains('toka blogi').parent().find('button').eq(2).click()
        cy.get('html').should('not.contain', 'toka blogi')
      })

      it('they are ordered by the number of likes in descending order', async function () {
        cy.contains('kolmas blogi').parent().find('button').eq(0).click()
        cy.contains('kolmas blogi').parent().find('button').eq(1).click().wait(500).click().wait(500)
        cy.contains('kolmas blogi').parent().find('button').eq(0).click()

        cy.contains('toka blogi').parent().find('button').eq(0).click()
        cy.contains('toka blogi').parent().find('button').eq(1).click().wait(500).click().wait(500).click().wait(500)
        cy.visit('http://localhost:3001')

        cy.get('.blog').eq(0).should('contain', 'second blog')
        cy.get('.blog').eq(1).should('contain', 'third blog')
        cy.get('.blog').eq(2).should('contain', 'first blog')
      })
    })
  })
})

