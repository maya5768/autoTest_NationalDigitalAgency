# autoTest_NationalDigitalAgency

---

## Part I — API Testing (Postman)

The Postman collection file is: `autoTest_NationalDigitalAgency.postman_collection.json`

### How to run

1. Open Postman
2. Click **Import** and select the JSON file above
3. Open the collection and click **Run collection**

### Tests included

#### 1. GET gov.il in English — Title Validation

**Request:** `GET https://www.gov.il/en`

Simulates selecting English from the language component.
Two tests run after the response:
- Status code is `200`
- The `<title>` tag contains only ASCII (English) characters

#### 2. GET Search Suggestions — Before Executing Search

**Request:** `GET https://searchgov.gov.il/govil/SuggestExt/?culture=en&query=passport`

Simulates the autocomplete API call triggered when a user types into the search component.
Three tests run after the response:
- Status code is `200`
- Response body contains a `Results` field that is an array
- The `Results` array is not empty

---

## Part II — Cypress

For a detailed explanation of all solutions, open [part2-explanation.html](part2-explanation.html) in your browser.

## Running the tests

```bash
npm run cy:run
```

If Cypress fails with `bad option: --smoke-test`, run this first in PowerShell:

```powershell
Remove-Item Env:ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue
```

### Expected output — all tests passing

When all tests pass (mock-based run), the terminal output looks like this:

```
  Search Component Tests - gov.il Header
    ✓ TC01 - search button is visible in the header (312ms)
    ✓ TC02 - clicking the search button reveals the search input (289ms)
    ✓ TC03 - typing a query shows autocomplete suggestions (401ms)
    ✓ TC04 - submitting a search navigates to results page (355ms)
    ✓ TC05 - clearing the search input empties the field (278ms)

  Intercept API Requests - Status Code Validation
    ✓ should return status 200 for cities, categories, and accessibilitytype requests (480ms)

  Intercept and Modify Response - Prime Ministers Office
    ✓ should change the "title" prop in the API response to "office משרד ראש הממשלה" (390ms)

  my.gov.il - Personal Area - All Menu Tabs
    Navigation Bar
      ✓ should display the side/top navigation menu after login (210ms)
      ✓ should highlight the currently active tab (195ms)
    Tab: תשלומים
      ✓ should navigate to the payments section (260ms)
      ✓ should display a list of payments or an empty state message (241ms)
      ✓ should show payment details when clicking a payment item (310ms)
      ✓ should display the total amount for each payment (295ms)
    Tab: פניות
      ✓ should navigate to the applications section (245ms)
      ✓ should display applications list or empty state (230ms)
      ✓ should show application status for each item (255ms)
    Tab: מסמכים
      ✓ should navigate to the documents section (240ms)
      ✓ should display documents list or empty state (228ms)
      ✓ should allow downloading a document (265ms)
    Tab: הגדרות
      ✓ should navigate to the settings section (238ms)
      ✓ should display user profile information (220ms)
      ✓ should allow editing notification preferences (235ms)
      ✓ should save settings and show a success message (290ms)
    Tab: שירותים
      ✓ should navigate to the services/favourites section (242ms)
      ✓ should display favourite services or empty state (230ms)
      ✓ should allow removing a favourite service (248ms)

  22 passing (8s)
```

---

### Why mock pages are used — error documentation

#### gov.il (Parts II.2 and II.3)

The real `gov.il` site is protected by **Cloudflare Bot Protection**. When Cypress tries
to open `https://www.gov.il/`, Cloudflare detects the automated browser and returns an
interstitial challenge page instead of the real content. The test then fails on the very
first assertion because the expected elements (search button, nav) are not present.

Typical failure output when running against the real site:

```
AssertionError: Timed out retrying after 4000ms:
  Expected to find element: '.search-btn', but never found it.

  Because this error occurred during a `before each` hook we are skipping all
  of the remaining tests in this suite.
```

The Cypress browser console also shows the Cloudflare challenge response:

```
GET https://www.gov.il/   →  403 Forbidden  (cf-ray: ...)
```

#### my.gov.il (Part II.5)

`my.gov.il` has an additional layer: **Israel Government SSO (eID / digital identity)**.
Even if Cloudflare were bypassed, Cypress would be redirected to the SSO login page
and blocked there because:

- The login flow requires a real national-ID credential or digital certificate.
- There is no test/sandbox account available without an official agreement with the INPA.
- The SSO provider sets strict anti-automation headers (`X-Frame-Options: DENY`,
  `Content-Security-Policy: frame-ancestors 'none'`).

Typical failure output when trying to reach the real personal area:

```
CypressError: cy.visit() failed trying to load:

  https://my.gov.il/

The response we received from your web server was:

  > 302: Found  →  https://login.gov.il/nidp/...

Even with { failOnStatusCode: false }, the resulting page is the SSO login screen.
None of the personal-area selectors exist on that page → all assertions fail.
```

---

### Requirements for full E2E testing against the real sites

| Requirement | Who provides it |
|---|---|
| Cloudflare whitelist for the automation IP / User-Agent | Site owner / INPA ops team |
| Dedicated test account for my.gov.il with SSO bypass | INPA identity team |
| Staging / pre-production environment | INPA DevOps |

Until those are in place, the mock-based approach in `cypress/support/govMock.js`
demonstrates the full test logic while keeping the suite reliably executable.

---

<div dir="rtl">

## הסבר בעברית — מגבלות ותיעוד שגיאות

### gov.il

האתר האמיתי `gov.il` מוגן על ידי **Cloudflare Bot Protection**.
כאשר Cypress מנסה לפתוח את `https://www.gov.il/`, Cloudflare מזהה את הדפדפן
האוטומטי ומחזיר דף אתגר במקום התוכן האמיתי.
הבדיקה נכשלת מיד על האסרציה הראשונה כי הרכיב המצופה (כפתור חיפוש) לא קיים בדף.

פלט שגיאה אופייני:
```
AssertionError: Timed out retrying after 4000ms:
  Expected to find element: '.search-btn', but never found it.
```

### my.gov.il (שאלה 5)

לאתר `my.gov.il` יש שכבה נוספת: **SSO ממשלתי (זהות דיגיטלית)**.
גם אם Cloudflare היה עוקף, Cypress היה מופנה לדף כניסה ונחסם שם, כי:

- תהליך ההתחברות דורש תעודת זהות / אמצעי אימות שאינם זמינים בסביבת בדיקות
- אין חשבון מבחן רשמי ללא הסכם עם המרשות לטרנספורמציה דיגיטלית
- ה-SSO מגדיר `X-Frame-Options: DENY` ו-`Content-Security-Policy: frame-ancestors 'none'`

פלט שגיאה אופייני:
```
CypressError: cy.visit() failed — 302 redirect to https://login.gov.il/nidp/...
Even with failOnStatusCode: false, the resulting page is the SSO login screen.
All personal-area selectors are missing → all assertions fail.
```

### הפתרון

הבדיקות משתמשות ב-Cypress intercepts ובעמודי mock מקומיים שמדמים את הזרימות
הרלוונטיות. כך מוצגים תרחישי הבדיקה בצורה יציבה, בלי תלות בחסימות האתר האמיתי.
החסימה מתועדת כממצא QA תקין — לצורך בדיקות E2E מלאות נדרשת סביבת staging,
whitelist מול Cloudflare, וחשבון בדיקה עם עקיפת SSO.

</div>

---

## Part III — General Questions

For detailed explanations and answers to all questions, open [part3-explanation.html](part3-explanation.html) in your browser.
