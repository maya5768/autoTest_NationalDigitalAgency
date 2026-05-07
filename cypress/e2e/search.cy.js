const SearchPage = require('../pages/SearchPage')

describe('Search Component Tests - gov.il Header', () => {
  const searchPage = new SearchPage()

  beforeEach(() => {
    searchPage.visit()
  })

  it('TC01 - search button is visible in the header', () => {
    searchPage.verifySearchBtnVisible()
  })

  it('TC02 - clicking the search button reveals the search input', () => {
    searchPage.openSearch()
    searchPage.verifyInputVisible()
  })

  it('TC03 - typing a query shows autocomplete suggestions', () => {
    searchPage.openSearch()
    searchPage.typeQuery('בריאות')
    searchPage.verifySuggestionsVisible()
  })

  it('TC04 - submitting a search navigates to results page', () => {
    searchPage.search('דרכון')
    cy.url().should('satisfy', (url) => {
      return url.includes('search') || url.includes('דרכון') || url.includes('query')
    })
  })

  it('TC05 - clearing the search input empties the field', () => {
    searchPage.openSearch()
    searchPage.typeQuery('תעודת זהות')
    searchPage.clearInput()
    searchPage.verifyInputEmpty()
  })
})
