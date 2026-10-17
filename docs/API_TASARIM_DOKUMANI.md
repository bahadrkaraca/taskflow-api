# API Tasarım Dokümanı — TaskFlow

## 1. API Mimarisi

```
İstemci (Postman / Tarayıcı)
        │
        ▼
   Express.js Sunucusu (app.js)
        │
        ├── Global Middleware: express.json()
        ├── Global Middleware: logger (zorunlu — istek loglama)
        │
        ├── /tasks      → routes/tasks.js   → data/tasks.js
        └── /reports    → routes/reports.js → data/tasks.js  (isteğe bağlı)
```

## 2. Endpoint Listesi

### Zorunlu — Görev Yönetim Modülü

| # | Metod  | Endpoint      | Açıklama                    | Başarılı Kod | Hata Kodu |
|---|--------|---------------|-------------------------------|--------------|-----------|
| 1 | GET    | `/tasks`      | Tüm görevleri listeler         | 200          | —         |
| 2 | GET    | `/tasks/:id`  | Görev detayını getirir         | 200          | 404       |
| 3 | POST   | `/tasks`      | Yeni görev oluşturur           | 201          | 400       |
| 4 | PUT    | `/tasks/:id`  | Görevi günceller               | 200          | 404       |
| 5 | DELETE | `/tasks/:id`  | Görevi siler                   | 200          | 404       |

### İsteğe Bağlı — Bonus Endpointler (teslime dahil değildir)

| Metod | Endpoint                            | Açıklama                        |
|-------|--------------------------------------|-----------------------------------|
| GET   | `/tasks?status=completed`           | Duruma göre filtreleme            |
| GET   | `/tasks?priority=high`              | Önceliğe göre filtreleme          |
| GET   | `/tasks?sort=createdAt`             | Sıralama                          |
| GET   | `/tasks?page=1&limit=10`            | Sayfalama                         |
| GET   | `/tasks/search?keyword=backend`     | Anahtar kelime ile arama          |
| GET   | `/tasks/assignee/musa`              | Çalışana göre listeleme           |
| GET   | `/reports/summary`                  | Genel sistem özeti                |
| GET   | `/reports/completed`                | Tamamlanan görev sayısı           |
| GET   | `/reports/pending`                  | Bekleyen görev sayısı             |

## 3. İstek / Yanıt Formatı

Tüm yanıtlar JSON formatındadır ve ortak bir zarf (envelope) yapısı kullanır:

**Başarılı yanıt:**
```json
{
  "basarili": true,
  "data": { ... }
}
```

**Hatalı yanıt:**
```json
{
  "basarili": false,
  "hata": "Açıklayıcı hata mesajı"
}
```

## 4. Örnek İstek/Yanıtlar

### POST /tasks — İstek
```json
{
  "title": "API dökümantasyonunu yaz",
  "description": "Tüm endpointler için örnek istek/yanıt hazırla",
  "priority": "medium",
  "assignee": "ayse"
}
```

### POST /tasks — Yanıt (201 Created)
```json
{
  "basarili": true,
  "mesaj": "Görev oluşturuldu",
  "data": {
    "id": 6,
    "title": "API dökümantasyonunu yaz",
    "description": "Tüm endpointler için örnek istek/yanıt hazırla",
    "status": "pending",
    "priority": "medium",
    "assignee": "ayse",
    "createdAt": "2026-09-26T10:00:00.000Z",
    "updatedAt": "2026-09-26T10:00:00.000Z"
  }
}
```

### GET /tasks/999 — Yanıt (404 Not Found)
```json
{
  "basarili": false,
  "hata": "999 ID'li görev bulunamadı"
}
```

## 5. HTTP Durum Kodları

| Kod | Anlamı                | Kullanıldığı Durum                          |
|-----|------------------------|------------------------------------------------|
| 200 | OK                     | Başarılı GET, PUT, DELETE                       |
| 201 | Created                | Başarılı POST (yeni kayıt oluşturma)           |
| 400 | Bad Request            | Eksik/geçersiz veri (validation hatası)        |
| 404 | Not Found              | Bulunamayan görev veya route                    |
| 500 | Internal Server Error  | Beklenmeyen sunucu hatası                       |
