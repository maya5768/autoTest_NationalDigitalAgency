describe('Intercept and Modify Response - Prime Ministers Office', () => {
  it('should change the "title" prop in the API response to "office משרד ראש הממשלה"', () => {
    cy.mockGovPages()

    cy.intercept('GET', '**/prime_ministers_office**', (req) => {
      const responseBody = {
        title: 'משרד ראש הממשלה',
        department: {
          title: 'משרד ראש הממשלה',
        },
      }

      const modifyTitle = (node) => {
        if (Array.isArray(node)) {
          node.forEach(modifyTitle)
        } else if (node && typeof node === 'object') {
          if (node.title === 'משרד ראש הממשלה') {
            node.title = 'office משרד ראש הממשלה'
          }

          Object.values(node).forEach((value) => {
            if (typeof value === 'object') modifyTitle(value)
          })
        }
      }

      modifyTitle(responseBody)

      req.reply({
        statusCode: 200,
        body: responseBody,
      })
    }).as('primeMinistersOffice')

    cy.visit('/he/', { failOnStatusCode: false })

    cy.window().then((win) => {
      win.fetch('/he/departments/prime_ministers_office')
    })

    cy.wait('@primeMinistersOffice')
      .its('response.body.title')
      .should('eq', 'office משרד ראש הממשלה')
  })
})
