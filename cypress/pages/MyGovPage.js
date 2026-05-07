class MyGovPage {
  get nav() {
    return cy.get('nav, [role="navigation"], [class*="sidebar"], [class*="menu"]')
  }

  get activeTab() {
    return cy.get('[aria-selected="true"], [class*="active"], [class*="selected"]')
  }

  visit() {
    cy.mockGovPages()
    cy.visit('/my-gov', { failOnStatusCode: false })
    return this
  }

  clickTab(label) {
    cy.contains('a, button', label).click()
    return this
  }

  verifyNavVisible() {
    this.nav.should('be.visible')
    return this
  }

  verifyActiveTabExists() {
    this.activeTab.should('exist')
    return this
  }

  verifyUrlIncludes(segment) {
    cy.url().should('include', segment)
    return this
  }
}

module.exports = MyGovPage
