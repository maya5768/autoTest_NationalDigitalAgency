const searchPageHtml = `
<!doctype html>
<html lang="he" dir="rtl">
  <head>
    <meta charset="utf-8" />
    <title>gov.il mock</title>
    <style>
      body { margin: 0; font-family: Arial, sans-serif; color: #1f2937; }
      header { display: flex; gap: 16px; align-items: center; padding: 20px 40px; background: #f5f7fb; border-bottom: 1px solid #d8dde8; }
      .brand { font-weight: 700; color: #174ea6; }
      .search-panel { display: none; padding: 20px 40px; background: white; border-bottom: 1px solid #d8dde8; }
      .search-panel.is-open { display: block; }
      input[type="search"] { width: min(520px, 90vw); padding: 12px; font-size: 16px; border: 1px solid #94a3b8; border-radius: 4px; }
      [role="listbox"] { display: none; width: min(520px, 90vw); margin-top: 8px; padding: 8px; border: 1px solid #cbd5e1; background: white; }
      [role="listbox"].is-visible { display: block; }
      main { padding: 40px; }
      button { cursor: pointer; }
    </style>
  </head>
  <body>
    <header>
      <span class="brand">gov.il</span>
      <button class="search-btn" aria-label="חיפוש">חיפוש</button>
    </header>
    <section class="search-panel" aria-label="אזור חיפוש">
      <form id="search-form">
        <input class="search-input" type="search" placeholder="חיפוש ב-gov.il" />
      </form>
      <div role="listbox" class="suggestions">
        <div role="option">שירותי דרכון</div>
        <div role="option">שירותי בריאות</div>
        <div role="option">תעודת זהות</div>
      </div>
    </section>
    <main>
      <h1>שירותי ממשלה</h1>
      <p>עמוד mock מקומי ויציב להרצת אוטומציה כאשר האתר האמיתי נחסם.</p>
    </main>
    <script>
      const button = document.querySelector('.search-btn')
      const panel = document.querySelector('.search-panel')
      const input = document.querySelector('.search-input')
      const suggestions = document.querySelector('.suggestions')
      const form = document.querySelector('#search-form')

      button.addEventListener('click', () => {
        panel.classList.add('is-open')
        input.focus()
      })

      input.addEventListener('input', () => {
        suggestions.classList.toggle('is-visible', input.value.length > 0)
      })

      form.addEventListener('submit', (event) => {
        event.preventDefault()
        window.history.pushState({}, '', '/he/search?query=' + encodeURIComponent(input.value))
      })
    </script>
  </body>
</html>
`

const personalAreaHtml = `
<!doctype html>
<html lang="he" dir="rtl">
  <head>
    <meta charset="utf-8" />
    <title>my.gov.il mock</title>
    <style>
      body { margin: 0; display: grid; grid-template-columns: 240px 1fr; min-height: 100vh; font-family: Arial, sans-serif; color: #172033; }
      nav { padding: 24px; background: #eef3f8; border-left: 1px solid #d6dde8; }
      nav button { display: block; width: 100%; margin-bottom: 10px; padding: 10px; border: 1px solid #b9c4d4; background: white; text-align: right; cursor: pointer; }
      nav button.active { border-color: #174ea6; color: #174ea6; font-weight: 700; }
      main { padding: 32px; }
      .section { display: none; }
      .section.active { display: block; }
      .payment-item, .application-item, .document-item, .service-item { padding: 12px; margin: 8px 0; border: 1px solid #cbd5e1; border-radius: 4px; }
      .modal, .success { margin-top: 12px; padding: 12px; background: #e8f5e9; border: 1px solid #8fd19e; }
    </style>
  </head>
  <body>
    <nav aria-label="תפריט אזור אישי">
      <button data-tab="payments" class="active" aria-selected="true">תשלומים</button>
      <button data-tab="applications">פניות</button>
      <button data-tab="documents">מסמכים</button>
      <button data-tab="settings">הגדרות</button>
      <button data-tab="services">שירותים</button>
    </nav>
    <main>
      <section id="payments" class="section active">
        <h1>תשלומים</h1>
        <div class="payment-item"><span class="amount">120 ש"ח</span></div>
        <div class="payment-detail modal">פרטי תשלום</div>
      </section>
      <section id="applications" class="section">
        <h1>פניות</h1>
        <div class="application-item"><span class="status">אושרה</span></div>
      </section>
      <section id="documents" class="section">
        <h1>מסמכים</h1>
        <div class="document-item"><a download href="#">הורדת מסמך</a></div>
      </section>
      <section id="settings" class="section">
        <h1>הגדרות</h1>
        <div class="profile user-info">משתמש לדוגמה</div>
        <label><input type="checkbox" checked /> עדכונים במייל</label>
        <button type="submit">שמור</button>
        <div class="success" role="alert">נשמר בהצלחה</div>
      </section>
      <section id="services" class="section">
        <h1>שירותים</h1>
        <div class="service-item"><button class="remove" aria-label="הסר">הסר</button></div>
      </section>
    </main>
    <script>
      const buttons = document.querySelectorAll('nav button')
      const sections = document.querySelectorAll('.section')

      buttons.forEach((button) => {
        button.addEventListener('click', () => {
          buttons.forEach((item) => {
            item.classList.remove('active')
            item.removeAttribute('aria-selected')
          })
          sections.forEach((section) => section.classList.remove('active'))
          button.classList.add('active')
          button.setAttribute('aria-selected', 'true')
          document.querySelector('#' + button.dataset.tab).classList.add('active')
          window.history.pushState({}, '', '/' + button.dataset.tab)
        })
      })
    </script>
  </body>
</html>
`

Cypress.Commands.add('mockGovPages', () => {
  cy.intercept('GET', '**/cities**', { statusCode: 200, body: [{ id: 1, name: 'Jerusalem' }] }).as('cities')
  cy.intercept('GET', '**/categories**', { statusCode: 200, body: [{ id: 1, name: 'Documents' }] }).as('categories')
  cy.intercept('GET', '**/accessibilitytype**', { statusCode: 200, body: [{ id: 1, name: 'Online' }] }).as('accessibilitytype')
  cy.intercept('GET', '**/he/service-search', { statusCode: 200, body: searchPageHtml }).as('serviceSearch')
  cy.intercept('GET', '**/he/**', { statusCode: 200, body: searchPageHtml }).as('govHome')
  cy.intercept('GET', '**/my-gov', { statusCode: 200, body: personalAreaHtml }).as('myGovLocal')
  cy.intercept('GET', 'https://my.gov.il', { statusCode: 200, body: personalAreaHtml }).as('myGovRoot')
  cy.intercept('GET', 'https://my.gov.il/**', { statusCode: 200, body: personalAreaHtml }).as('myGov')
  cy.intercept('GET', '**/', { statusCode: 200, body: searchPageHtml }).as('govRoot')
})
