const GovHomePage = require('../pages/GovHomePage')

describe('Intercept API Requests - Status Code Validation', () => {
  it('should return status 200 for cities, categories, and accessibilitytype requests', () => {
    const page = new GovHomePage()

    cy.fixture('api-endpoints').then((data) => {
      const paths = data.endpoints.map((e) => e.path)
      page.visit().triggerApiFetch(...paths)

      data.endpoints.forEach((e) => {
        cy.wait(`@${e.alias}`).its('response.statusCode').should('eq', data.expectedStatus)
      })
    })
  })
})
