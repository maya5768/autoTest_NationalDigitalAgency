const SearchPage = require('../pages/SearchPage')

describe('Search Component Tests - gov.il Header', () => {
  const searchPage = new SearchPage()

  beforeEach(() => {
    cy.fixture('search-queries').as('q')
    searchPage.visit()
  })

  it('TC01 - search button is visible in the header', () => {
    searchPage.verifySearchBtnVisible()
  })

  it('TC02 - clicking the search button reveals the search input', () => {
    searchPage.openSearch()
    searchPage.verifyInputVisible()
  })

  it('TC03 - typing a query shows autocomplete suggestions', function() {
    searchPage.openSearch()
    searchPage.typeQuery(this.q.healthQuery)
    searchPage.verifySuggestionsVisible()
  })

  it('TC04 - submitting a search navigates to results page', function() {
    const { passportQuery } = this.q
    searchPage.search(passportQuery)
    cy.url().should('satisfy', (url) => {
      return url.includes('search') || url.includes(passportQuery) || url.includes('query')
    })
  })

  it('TC05 - clearing the search input empties the field', function() {
    searchPage.openSearch()
    searchPage.typeQuery(this.q.idQuery)
    searchPage.clearInput()
    searchPage.verifyInputEmpty()
  })
})
