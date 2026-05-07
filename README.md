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

The real gov.il site is protected by Cloudflare Bot Protection and can block
automated browsers before Cypress reaches the tested UI. For a stable homework
submission, the default test run uses Cypress intercepts and local mock pages
that simulate the relevant gov.il and my.gov.il flows.

This keeps the automation executable and demonstrates the test scenarios, while
documenting the real-site limitation as a valid QA finding.

<div dir="rtl">

## הסבר בעברית

האתר האמיתי gov.il מוגן באמצעות Cloudflare Bot Protection, ולכן הוא עלול לחסום
דפדפנים שמופעלים על ידי כלי אוטומציה כמו Cypress עוד לפני שהבדיקות מגיעות למסכי
המערכת עצמם.

כדי שהמטלה תהיה ניתנת להרצה בצורה יציבה, הבדיקות משתמשות ב-Cypress intercepts
ובעמודי mock מקומיים שמדמים את הזרימות הרלוונטיות של gov.il ושל my.gov.il.
כך ניתן להדגים את תרחישי הבדיקה, בדיקות UI, ניווט, ובדיקות response, בלי להיות
תלויים בחסימה של האתר האמיתי.

החסימה של האתר האמיתי מתועדת כמגבלת בדיקות וכממצא QA תקין: לצורך בדיקות E2E
מלאות מול האתר האמיתי נדרשת סביבת staging, הרשאת whitelist, או אישור מבעלי האתר.

</div>

---

## Part III — General Questions

For detailed explanations and answers to all questions, open [part3-explanation.html](part3-explanation.html) in your browser.
