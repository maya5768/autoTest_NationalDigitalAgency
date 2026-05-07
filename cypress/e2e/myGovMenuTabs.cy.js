/**
 * my.gov.il - Personal Area
 *
 * The real my.gov.il flow requires SSO and is protected by Cloudflare.
 * These tests run against a local Cypress mock so the homework can be executed
 * reliably while still covering the requested navigation and tab behavior.
 */

describe('my.gov.il - Personal Area - All Menu Tabs', () => {
  beforeEach(() => {
    cy.mockGovPages()
    cy.visit('/my-gov', { failOnStatusCode: false })
  })

  describe('Navigation Bar', () => {
    it('should display the side/top navigation menu after login', () => {
      cy.get('nav, [role="navigation"], [class*="sidebar"], [class*="menu"]').should('be.visible')
    })

    it('should highlight the currently active tab', () => {
      cy.get('[aria-selected="true"], [class*="active"], [class*="selected"]').should('exist')
    })
  })

  describe('Tab: תשלומים', () => {
    beforeEach(() => {
      cy.contains('a, button', 'תשלומים').click()
    })

    it('should navigate to the payments section', () => {
      cy.url().should('include', 'payments')
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
      cy.contains('a, button', 'פניות').click()
    })

    it('should navigate to the applications section', () => {
      cy.url().should('include', 'applications')
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
      cy.contains('a, button', 'מסמכים').click()
    })

    it('should navigate to the documents section', () => {
      cy.url().should('include', 'documents')
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
      cy.contains('a, button', 'הגדרות').click()
    })

    it('should navigate to the settings section', () => {
      cy.url().should('include', 'settings')
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
      cy.contains('a, button', 'שירותים').click()
    })

    it('should navigate to the services/favourites section', () => {
      cy.url().should('include', 'services')
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
