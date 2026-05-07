describe('Intercept API Requests - Status Code Validation', () => {
  it('should return status 200 for cities, categories, and accessibilitytype requests', () => {
    cy.mockGovPages()

    cy.visit('/he/', { failOnStatusCode: false })

    cy.window().then((win) => {
      win.fetch('/cities')
      win.fetch('/categories')
      win.fetch('/accessibilitytype')
    })

    cy.wait('@cities').its('response.statusCode').should('eq', 200)
    cy.wait('@categories').its('response.statusCode').should('eq', 200)
    cy.wait('@accessibilitytype').its('response.statusCode').should('eq', 200)
  })
})
