const GovHomePage = require('../pages/GovHomePage')

describe('Intercept and Modify Response - Prime Ministers Office', () => {
  it('should change the "title" prop in the API response to "office משרד ראש הממשלה"', () => {
    const page = new GovHomePage()

    // visit() must run first so mockGovPages intercepts are registered,
    // then register @primeMinistersOffice last so it takes priority over the /he/** catch-all
    page.visit()

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

    page.triggerApiFetch('/he/departments/prime_ministers_office')

    cy.wait('@primeMinistersOffice')
      .its('response.body.title')
      .should('eq', 'office משרד ראש הממשלה')
  })
})
