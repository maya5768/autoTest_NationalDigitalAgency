import './commands'
import './govMock'

Cypress.on('window:before:load', (win) => {
  // Hide webdriver flag - main Cloudflare detection
  Object.defineProperty(win.navigator, 'webdriver', { get: () => undefined })

  // Simulate real browser plugins
  Object.defineProperty(win.navigator, 'plugins', {
    get: () => [
      { name: 'Chrome PDF Plugin', filename: 'internal-pdf-viewer', description: 'Portable Document Format' },
      { name: 'Chrome PDF Viewer', filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai', description: '' },
      { name: 'Native Client', filename: 'internal-nacl-plugin', description: '' },
    ],
  })

  // Set realistic languages
  Object.defineProperty(win.navigator, 'languages', {
    get: () => ['he-IL', 'he', 'en-US', 'en'],
  })

  // Simulate real Chrome runtime object
  win.chrome = {
    runtime: {},
    loadTimes: () => {},
    csi: () => {},
    app: {},
  }

  // Remove automation-related properties
  Object.defineProperty(win.navigator, 'permissions', {
    get: () => ({
      query: () => Promise.resolve({ state: 'granted' }),
    }),
  })
})
