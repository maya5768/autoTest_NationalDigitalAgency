class GovHomePage {
  visit() {
    cy.mockGovPages()
    cy.visit('/he/', { failOnStatusCode: false })
    return this
  }

  triggerApiFetch(...endpoints) {
    cy.window().then((win) => {
      endpoints.forEach((ep) => win.fetch(ep))
    })
    return this
  }
}

module.exports = GovHomePage
