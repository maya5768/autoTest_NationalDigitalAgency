const GovHomePage = require('../pages/GovHomePage')

describe('Intercept API Requests - Status Code Validation', () => {
  let page

  beforeEach(() => {
    cy.fixture('api-endpoints').as('apiData')
    page = new GovHomePage()
  })

  it('should return status 200 for cities, categories, and accessibilitytype requests', function() {
    const paths = this.apiData.endpoints.map((e) => e.path)
    page.visit().triggerApiFetch(...paths)

    this.apiData.endpoints.forEach((e) => {
      cy.wait(`@${e.path.slice(1)}`).its('response.statusCode').should('eq', this.apiData.expectedStatus)
    })
  })
})
