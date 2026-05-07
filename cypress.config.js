const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: '9k247g',
  e2e: {
    baseUrl: 'https://www.gov.il',
    setupNodeEvents(on) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' || browser.name === 'chromium') {
          // Hide Cypress/Chrome automation markers
          launchOptions.args.push('--disable-blink-features=AutomationControlled')
          // Remove "Chrome is being controlled by automated software" banner
          launchOptions.args = launchOptions.args.filter(
            (arg) => arg !== '--enable-automation'
          )
          return launchOptions
        }
      })
    },
    browser: 'chrome',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 60000,
    chromeWebSecurity: false,
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  },
})
