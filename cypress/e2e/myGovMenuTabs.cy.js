/**
 * my.gov.il - Personal Area
 *
 * The real my.gov.il flow requires SSO and is protected by Cloudflare.
 * These tests run against a local Cypress mock so the homework can be executed
 * reliably while still covering the requested navigation and tab behavior.
 */

const MyGovPage = require('../pages/MyGovPage')

describe('my.gov.il - Personal Area - All Menu Tabs', () => {
  let page

  beforeEach(() => {
    cy.fixture('my-gov-tabs').as('tabs')
    page = new MyGovPage()
    page.visit()
  })

  describe('Navigation Bar', () => {
    it('should display the side/top navigation menu after login', () => {
      page.verifyNavVisible()
    })

    it('should highlight the currently active tab', () => {
      page.verifyActiveTabExists()
    })
  })

  describe('Tab: תשלומים', () => {
    beforeEach(() => {
      page.clickTab('תשלומים')
    })

    it('should navigate to the payments section', function() {
      const { urlSegment } = this.tabs.find((t) => t.label === 'תשלומים')
      page.verifyUrlIncludes(urlSegment)
    })

    it('should display a list of payments or an empty state message', () => {
      cy.get('[class*="payment"], [class*="empty"]').should('exist')
    })

    it('should show payment details when clicking a payment item', () => {
      cy.get('[class*="payment-item"]').first().click()
      cy.get('[class*="payment-detail"], [class*="modal"]').should('be.visible')
    })

    it('should display the total amount for each payment', () => {
      cy.get('[class*="payment-item"]').first().within(() => {
        cy.get('[class*="amount"], [class*="sum"]').should('exist')
      })
    })
  })

  describe('Tab: פניות', () => {
    beforeEach(() => {
      page.clickTab('פניות')
    })

    it('should navigate to the applications section', function() {
      const { urlSegment } = this.tabs.find((t) => t.label === 'פניות')
      page.verifyUrlIncludes(urlSegment)
    })

    it('should display applications list or empty state', () => {
      cy.get('[class*="appeal"], [class*="application"], [class*="empty"]').should('exist')
    })

    it('should show application status for each item', () => {
      cy.get('[class*="appeal-item"], [class*="application-item"]').first().within(() => {
        cy.get('[class*="status"]').should('exist')
      })
    })
  })

  describe('Tab: מסמכים', () => {
    beforeEach(() => {
      page.clickTab('מסמכים')
    })

    it('should navigate to the documents section', function() {
      const { urlSegment } = this.tabs.find((t) => t.label === 'מסמכים')
      page.verifyUrlIncludes(urlSegment)
    })

    it('should display documents list or empty state', () => {
      cy.get('[class*="document"], [class*="empty"]').should('exist')
    })

    it('should allow downloading a document', () => {
      cy.get('[class*="document-item"]').first().within(() => {
        cy.get('a[download], button[aria-label*="הורד"]').should('exist')
      })
    })
  })

  describe('Tab: הגדרות', () => {
    beforeEach(() => {
      page.clickTab('הגדרות')
    })

    it('should navigate to the settings section', function() {
      const { urlSegment } = this.tabs.find((t) => t.label === 'הגדרות')
      page.verifyUrlIncludes(urlSegment)
    })

    it('should display user profile information', () => {
      cy.get('[class*="profile"], [class*="user-info"]').should('be.visible')
    })

    it('should allow editing notification preferences', () => {
      cy.get('input[type="checkbox"], input[type="radio"], [class*="toggle"]').should('exist')
    })

    it('should save settings and show a success message', () => {
      cy.get('button[type="submit"], button').contains('שמור').click()
      cy.get('[class*="success"], [class*="alert"], [role="alert"]').should('be.visible')
    })
  })

  describe('Tab: שירותים', () => {
    beforeEach(() => {
      page.clickTab('שירותים')
    })

    it('should navigate to the services/favourites section', function() {
      const { urlSegment } = this.tabs.find((t) => t.label === 'שירותים')
      page.verifyUrlIncludes(urlSegment)
    })

    it('should display favourite services or empty state', () => {
      cy.get('[class*="service"], [class*="favourite"], [class*="empty"]').should('exist')
    })

    it('should allow removing a favourite service', () => {
      cy.get('[class*="service-item"]').first().within(() => {
        cy.get('button[aria-label*="הסר"], [class*="remove"]').should('exist')
      })
    })
  })
})
