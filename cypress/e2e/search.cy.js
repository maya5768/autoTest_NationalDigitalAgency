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
    cy.fixture('search-queries').then((q) => {
      searchPage.openSearch()
      searchPage.typeQuery(q.healthQuery)
      searchPage.verifySuggestionsVisible()
    })
  })

  it('TC04 - submitting a search navigates to results page', () => {
    cy.fixture('search-queries').then((q) => {
      searchPage.search(q.passportQuery)
      cy.url().should('satisfy', (url) => {
        return url.includes('search') || url.includes(q.passportQuery) || url.includes('query')
      })
    })
  })

  it('TC05 - clearing the search input empties the field', () => {
    cy.fixture('search-queries').then((q) => {
      searchPage.openSearch()
      searchPage.typeQuery(q.idQuery)
      searchPage.clearInput()
      searchPage.verifyInputEmpty()
    })
  })
})
