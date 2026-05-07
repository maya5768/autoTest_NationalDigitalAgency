const GovHomePage = require('../pages/GovHomePage')

describe('Intercept API Requests - Status Code Validation', () => {
  it('should return status 200 for cities, categories, and accessibilitytype requests', () => {
    const page = new GovHomePage()

    page.visit().triggerApiFetch('/cities', '/categories', '/accessibilitytype')

    cy.wait('@cities').its('response.statusCode').should('eq', 200)
    cy.wait('@categories').its('response.statusCode').should('eq', 200)
    cy.wait('@accessibilitytype').its('response.statusCode').should('eq', 200)
  })
})
