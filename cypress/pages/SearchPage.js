class SearchPage {
  // --- Selectors ---

  get searchBtn() {
    // The magnifying glass icon in the header
    return cy.get('button[aria-label*="חיפוש"], [class*="search-btn"], [class*="searchBtn"]').first()
  }

  get searchInput() {
    return cy.get('input[placeholder*="חיפוש"], input[type="search"], [class*="search-input"] input').first()
  }

  get searchSuggestions() {
    return cy.get('[role="listbox"], [class*="suggestions"], [class*="autocomplete"], [class*="Suggestions"]')
  }

  get searchResultsContainer() {
    return cy.get('[class*="search-results"], [class*="searchResults"], .results')
  }

  // --- Actions ---

  visit() {
    cy.mockGovPages()
    cy.visit('/', { failOnStatusCode: false })
    cy.url().should('include', 'gov.il')
    return this
  }

  openSearch() {
    this.searchBtn.click()
    return this
  }

  typeQuery(query) {
    this.searchInput.should('be.visible').type(query)
    return this
  }

  clearInput() {
    this.searchInput.clear()
    return this
  }

  submit() {
    this.searchInput.type('{enter}')
    return this
  }

  search(query) {
    this.openSearch()
    this.typeQuery(query)
    this.submit()
    return this
  }

  // --- Assertions ---

  verifySearchBtnVisible() {
    this.searchBtn.should('be.visible')
    return this
  }

  verifyInputVisible() {
    this.searchInput.should('be.visible')
    return this
  }

  verifySuggestionsVisible() {
    this.searchSuggestions.should('be.visible')
    return this
  }

  verifyInputEmpty() {
    this.searchInput.should('have.value', '')
    return this
  }
}

module.exports = SearchPage
