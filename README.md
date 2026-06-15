# אימון טיימר

אפליקציית אימונים (PWA) - טיימרים, מנוחות בין סטים/תרגילים, תמונות תרגילים ורדיו גלגלצ.

## איך מעלים את זה ל-GitHub Pages

1. צרו ריפו חדש ב-GitHub (Public).
2. העלו את **כל הקבצים מהתיקייה הזו** (לא את התיקייה עצמה) לתוך הריפו - את `index.html`, `manifest.json`, `service-worker.js`, `.nojekyll` וכל קובצי ה-`icon`.
   - הדרך הקלה: בעמוד הריפו לחצו "Add file" → "Upload files", וגררו את כל הקבצים.
3. עברו ל-**Settings → Pages**.
4. תחת "Build and deployment", בחרו:
   - Source: **Deploy from a branch**
   - Branch: **main** (או master), תיקייה: **/ (root)**
5. שמרו. אחרי דקה-שתיים האתר יהיה זמין בכתובת:
   `https://<שם-המשתמש-שלך>.github.io/<שם-הריפו>/`

## איצור APK עם PWABuilder

1. גשו ל-https://www.pwabuilder.com
2. הדביקו את הכתובת מ-GitHub Pages ולחצו Start.
3. לחצו על "Package for Stores" → Android → הורידו את קובץ ה-APK.

## הערות

- כל הנתונים (תוכניות האימון שלך) נשמרים מקומית בדפדפן (localStorage) - הם לא נשלחים לשום שרת.
- הרדיו (גלגלצ) וכן תמונות התרגילים נטענים משירותים חיצוניים (bynetcdn, GitHub) ודורשים אינטרנט.
