Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username, password
  }).then(({ body }) => {
    window.localStorage.setItem('user', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', (newBlog) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: newBlog,
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('user')).token}`
    }
  })
  cy.visit('http://localhost:3000')
})

describe('Blog app', function () {
  const testUser = {
    username: 'Tester',
    password: 'pass',
    name: 'Cypress'
  }
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/test/reset')
    cy.request('POST', 'http://localhost:3003/api/users', testUser)
    
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('form.loginForm').should('to.be.visible')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('Tester')
      cy.get('#password').type('pass')
      cy.contains('login').click()
      
      cy.contains('Cypress logged in!').should('to.exist')
    })

    it('fails with wrong credentials', function () {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('Tester')
      cy.get('#password').type('wrongPass')
      cy.contains('login').click()
      
      cy.contains('wrong username or password!').should('to.exist')
      cy.contains('Cypress logged in!').should('not.to.exist')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login(testUser)
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Cypress Test')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('cypress.io')
      cy.contains('create').click()

      cy.contains('Cypress Test Cypress').should('to.exist')
    })

    describe('testing blogs interface', function () {
      beforeEach(function () {
        const testBlog = {
          title: 'Cypress Test',
          author: 'Cypress',
          url: 'cypress.io',
          likes: 0,
        }
        cy.createBlog(testBlog)
      })

      it('users can like a blog', function() {
        cy.contains('Cypress Test Cypress').parent().as('testBlog')
        cy.get('@testBlog').contains('view').click()
        cy.get('@testBlog').contains('likes 0').should('to.exist')
        cy.get('@testBlog').contains('like').click()
        cy.get('@testBlog').contains('likes 1').should('to.exist')
      })

      it('creator can delete their blogs', function() {
        cy.contains('Cypress Test Cypress').parent().as('testBlog')
        cy.get('@testBlog').contains('view').click()
        cy.get('@testBlog').contains('delete').should('to.exist')
      })

      it.only('blogs are ordered by likes', function () {
        const blogWithMostLikes = {
          title: 'Most Likes',
          author: 'Cypress',
          url: 'cypress.io',
          likes: 100
        }
        const blogWithSecondMostLikes = {
          title: 'Second Most Likes',
          author: 'Cypress',
          url: 'cypress.io',
          likes: 50
        }
        cy.createBlog(blogWithMostLikes)
        cy.createBlog(blogWithSecondMostLikes)

        cy.get('div.blogList').find('>div').as('blogList')
        cy.get('@blogList').eq(0).should('contain', 'Most Likes')
        cy.get('@blogList').eq(1).should('contain', 'Second Most Likes')
        cy.get('@blogList').eq(2).should('contain', 'Cypress Test')
      })
    })

    
  })
})