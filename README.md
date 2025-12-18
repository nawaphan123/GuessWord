# 📘 Vocabulary Flashcard App (Angular + Google Sheets)

โปรเจคนี้คือ **เว็บแอป Flashcard สำหรับฝึกคำศัพท์ภาษาอังกฤษ–ไทย** พัฒนาโดยใช้ **Angular (Standalone Component)** และใช้ **Google Sheets เป็นคลังคำศัพท์** ผ่าน **Google Apps Script (Web API)** พร้อมระบบเสียงอ่าน (Speech Synthesis)

---

## ✨ Features

- 📇 แสดงคำศัพท์แบบ **Flashcard (Flip Card)**
- 🔊 อ่านเสียงคำศัพท์ภาษาอังกฤษด้วย **Web Speech API**
- ⏳ ปรับความเร็วเสียงอ่านได้
- 🔀 สุ่มลำดับคำศัพท์ (Shuffle)
- ⬅️➡️ ปุ่ม Previous / Next พร้อม animation
- ☁️ ดึงข้อมูลคำศัพท์จาก **Google Sheets** แบบ real-time
- 🧩 ใช้ **Angular Standalone Component** (ไม่ใช้ NgModule)

---

## 🛠️ Tech Stack

- **Frontend**: Angular (Standalone, Angular 15+)
- **Backend / API**: Google Apps Script (Web App)
- **Database**: Google Sheets
- **Speech**: Web Speech API (SpeechSynthesis)

---

## 📂 โครงสร้าง Google Sheets

สร้าง Google Sheet ที่มีอย่างน้อย **2 คอลัมน์**:

| Column A (Word) | Column B (Translation) |
| --------------- | ---------------------- |
| Hello           | สวัสดี                 |
| Government      | รัฐบาล                 |
| Equality        | ความเท่าเทียม          |

> แถวแรกสามารถเป็น header ได้ (ระบบจะข้ามให้)

---

## 🌐 Google Apps Script (API)

### ตัวอย่างโค้ด `doGet()`

```javascript
function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

  const data = sheet.getDataRange().getValues();
  data.shift(); // remove header

  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}
```

### ขั้นตอน Deploy

1. Extensions → Apps Script
2. Deploy → New deployment
3. Type: **Web app**
4. Execute as: **Me**
5. Who has access: **Anyone**
6. Copy URL ไปใช้ใน Angular

---

## ⚙️ Angular Setup

### 1️⃣ เปิดใช้งาน HttpClient (`app.config.ts`)

```ts
import { provideHttpClient } from '@angular/common/http';

export const appConfig = {
  providers: [provideHttpClient()],
};
```

---

### 2️⃣ Standalone Component

```ts
@Component({
  selector: 'app-word-card-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './word-card-page.html',
  styleUrl: './word-card-page.css'
})
```

---

### 3️⃣ โหลดคำศัพท์จาก Google Sheets

```ts
ngOnInit() {
  this.http.get<[string, string][]>(API_URL)
    .subscribe(data => {
      this.word = this.shuffle([...data]);
      this.wordIndex = 0;
    });
}
```

---

## 🔊 Speech Synthesis (เสียงอ่าน)

```ts
opensound() {
  const utterance = new SpeechSynthesisUtterance(
    this.word[this.wordIndex][0]
  );

  utterance.lang = 'en-US';
  utterance.rate = 0.6;   // ความเร็วเสียง
  utterance.pitch = 1;

  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}
```

---

## 🧠 UX Logic (Flip ก่อนเปลี่ยนคำ)

- การ์ดจะ **พลิกกลับด้านหน้า** ก่อน
- รอ animation (0.8s)
- จากนั้นจึงเปลี่ยนคำศัพท์

```ts
if (this.isFlipped) {
  this.isFlipped = false;
  setTimeout(() => this.moveNext(), 800);
}
```

---

## 🚀 Run Project

```bash
npm install
ng serve
```

เปิดเบราว์เซอร์ที่:

```
http://localhost:4200
```

---

## 🧩 Possible Improvements

- 🎚️ Slider ปรับความเร็วเสียง
- 📱 Responsive สำหรับมือถือ
- 🧠 Spaced Repetition (แบบ Anki)
- 💾 Offline Cache (LocalStorage)
- 🗂️ แยกคำศัพท์ตามหมวด / Sheet

---

## 📜 License

MIT License

---

## 🙌 Acknowledgements

- Angular Team
- Google Apps Script
- Web Speech API

---

> 📌 โปรเจคนี้เหมาะสำหรับผู้ที่ต้องการฝึกภาษา หรือเป็นตัวอย่างการเชื่อม **Angular + Google Sheets** แบบง่ายและใช้งานจริง

## ตัวอย่าง
https://guessword007.netlify.app/
