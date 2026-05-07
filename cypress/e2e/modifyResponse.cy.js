const GovHomePage = require('../pages/GovHomePage')

describe('Intercept and Modify Response - Prime Ministers Office', () => {
  let page

  beforeEach(() => {
    cy.fixture('prime-ministers-office').as('dept')
    page = new GovHomePage()
  })

  it('should change the "title" prop in the API response to "office משרד ראש הממשלה"', function() {
    const dept = this.dept

    // visit() must run first so mockGovPages intercepts are registered,
    // then register @primeMinistersOffice last so it takes priority over the /he/** catch-all
    page.visit()

    cy.intercept('GET', dept.interceptPattern, (req) => {
      const responseBody = {
        title: dept.originalTitle,
        department: { title: dept.originalTitle },
      }

      const modifyTitle = (node) => {
        if (Array.isArray(node)) {
          node.forEach(modifyTitle)
        } else if (node && typeof node === 'object') {
          if (node.title === dept.originalTitle) {
            node.title = dept.modifiedTitle
          }
          Object.values(node).forEach((value) => {
            if (typeof value === 'object') modifyTitle(value)
          })
        }
      }

      modifyTitle(responseBody)
      req.reply({ statusCode: 200, body: responseBody })
    }).as('primeMinistersOffice')

    page.triggerApiFetch(dept.apiPath)

    cy.wait('@primeMinistersOffice')
      .its('response.body.title')
      .should('eq', dept.modifiedTitle)
  })
})
