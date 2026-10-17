# TaskFlow API

Görev ve Proje Yönetim Sistemi — REST API

Node.js ile Backend Programlama eğitimi kapsamında geliştirilmiş bitirme projesidir. Bir yazılım şirketinin ekip içindeki görevlerini, projelerini ve çalışan sorumluluklarını takip etmesini sağlayan REST API'dir.

## Kullanılan Teknolojiler

- **Node.js** — çalışma ortamı
- **Express.js 5** — sunucu ve routing
- Veriler bellek içinde (in-memory array) tutulur — veritabanı kullanılmamıştır

## Kurulum

### 1. Depoyu klonlayın

```bash
git clone <repo-url>
cd taskflow-api
```

### 2. Bağımlılıkları kurun

```bash
npm install
```

### 3. Sunucuyu çalıştırın

```bash
npm start
```

veya doğrudan:

```bash
node app.js
```

Sunucu ayağa kalktığında terminalde şu mesajı göreceksiniz:

```
✅ TaskFlow API çalışıyor: http://localhost:3000
📋 Görevler:  http://localhost:3000/tasks
📊 Raporlar:  http://localhost:3000/reports/summary
```

Varsayılan port **3000**'dir. Farklı bir port kullanmak isterseniz `PORT` ortam değişkenini ayarlayabilirsiniz:

```bash
PORT=4000 node app.js
```

## Proje Klasör Yapısı

```
taskflow-api/
├── app.js                  # Ana uygulama dosyası (sunucu giriş noktası)
├── package.json
├── data/
│   └── tasks.js            # Görevlerin tutulduğu bellek içi veri deposu
├── routes/
│   ├── tasks.js             # Görev Yönetim Modülü (CRUD + bonus özellikler)
│   └── reports.js           # (İsteğe bağlı) Raporlama servisleri
├── middleware/
│   ├── logger.js            # ZORUNLU: İstek loglama middleware'i
│   └── validateTask.js      # (İsteğe bağlı) Veri doğrulama middleware'i
├── docs/
│   ├── PROJE_TANITIM_DOKUMANI.md
│   └── API_TASARIM_DOKUMANI.md
├── postman/
│   └── TaskFlow.postman_collection.json
└── logs/
    └── backend.log          # Logger middleware'inin ürettiği log dosyası
```

## API Endpointleri

### Zorunlu — Görev Yönetim Modülü (CRUD)

| Metod  | Endpoint          | Açıklama                     |
|--------|-------------------|-------------------------------|
| GET    | `/tasks`          | Tüm görevleri listeler        |
| GET    | `/tasks/:id`      | Belirli bir görevin detayı    |
| POST   | `/tasks`          | Yeni görev oluşturur          |
| PUT    | `/tasks/:id`      | Görevi günceller              |
| DELETE | `/tasks/:id`      | Görevi siler                  |

**Örnek POST/PUT body:**

```json
{
  "title": "Yeni görev başlığı",
  "description": "Görev açıklaması",
  "priority": "high",
  "assignee": "musa",
  "status": "pending"
}
```

Alanlar:
- `title` (string, zorunlu)
- `description` (string, zorunlu)
- `priority` (`low` | `medium` | `high`, zorunlu)
- `assignee` (string, zorunlu — görevin atandığı çalışan)
- `status` (`pending` | `in-progress` | `completed`, opsiyonel — belirtilmezse `pending`)

### İsteğe Bağlı — Bonus Özellikler (teslime dahil değildir)

| Metod | Endpoint                              | Açıklama                        |
|-------|----------------------------------------|----------------------------------|
| GET   | `/tasks?status=completed`              | Duruma göre filtreleme           |
| GET   | `/tasks?priority=high`                 | Önceliğe göre filtreleme         |
| GET   | `/tasks?sort=createdAt`                | Oluşturulma tarihine göre sırala |
| GET   | `/tasks?page=1&limit=10`               | Sayfalama                        |
| GET   | `/tasks/search?keyword=backend`        | Başlık/açıklamada anahtar kelime arama |
| GET   | `/tasks/assignee/musa`                 | Çalışana göre listeleme          |
| GET   | `/reports/summary`                     | Genel sistem özeti               |
| GET   | `/reports/completed`                   | Tamamlanan görev sayısı          |
| GET   | `/reports/pending`                     | Bekleyen görev sayısı            |

> Not: POST ve PUT isteklerinde `validateTask` middleware'i devreye girer; `title`, `description`, `priority`, `assignee` alanlarından biri eksik veya geçersizse `400 Bad Request` ve açıklayıcı bir hata mesajı döner.

## Middleware

- **logger.js** (zorunlu): Gelen her isteğin HTTP metodunu, endpoint'ini, durum kodunu ve süresini hem konsola hem de `logs/backend.log` dosyasına kaydeder.
- **validateTask.js** (isteğe bağlı): `POST` ve `PUT /tasks` isteklerinde gövde verisini doğrular.

## Postman ile Test

`postman/TaskFlow.postman_collection.json` dosyasını Postman'e import ederek tüm endpointleri hazır istekler olarak test edebilirsiniz:

1. Postman'i açın → **Import** → dosyayı seçin
2. Koleksiyon içindeki istekleri sırayla çalıştırın (önce GET, sonra POST, PUT, DELETE)
3. Her isteğin başarılı yanıt döndüğünü ekran görüntüsü alarak kaydedin (teslim için gereklidir)

## Değerlendirme Notu

Bu proje TaskFlow proje yönergesindeki **zorunlu** kapsamı (İhtiyaç Analizi, Backend Altyapısı, CRUD + Logger Middleware, Test) eksiksiz karşılayacak şekilde hazırlanmıştır. Filtreleme, arama, sayfalama, validation middleware ve raporlama servisleri **isteğe bağlı bonus** olarak eklenmiştir ve yönergeye göre teslim/değerlendirmeye dahil değildir.
