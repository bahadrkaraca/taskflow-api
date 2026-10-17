// app.js — TaskFlow: Görev ve Proje Yönetim Sistemi API'si
// Node.js + Express.js Bitirme Projesi

const express = require('express');
const logger = require('./middleware/logger');
const tasks = require('./routes/tasks');
const reports = require('./routes/reports'); // İsteğe bağlı — raporlama servisleri

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Global Middleware'ler ─────────────────────────
app.use(express.json());   // Gelen JSON body'lerin okunabilmesi için
app.use(logger);           // ZORUNLU: Her istek konsola ve logs/backend.log'a kaydedilir

// ─── Ana Sayfa (bilgilendirme amaçlı) ──────────────
app.get('/', (req, res) => {
  res.json({
    basarili: true,
    proje: 'TaskFlow API',
    aciklama: 'Görev ve Proje Yönetim Sistemi API\'si',
    endpointler: {
        'GET /tasks': 'Tüm görevleri listele',
        'GET /tasks/:id': 'Görev detayını getir',
        'POST /tasks': 'Yeni görev oluştur',
        'PUT /tasks/:id': 'Görevi güncelle',
        'DELETE /tasks/:id': 'Görevi sil',

        'GET /tasks?status=completed': 'Duruma göre filtrele',
        'GET /tasks?priority=high': 'Önceliğe göre filtrele',
        'GET /tasks?sort=createdAt': 'Oluşturulma tarihine göre sırala',
        'GET /tasks?page=1&limit=10': 'Sayfalama',
        'GET /tasks/search?keyword=...': 'Görev ara',
        'GET /tasks/assignee/:isim': 'Çalışana göre listele',
        'GET /reports/summary': 'Genel sistem özeti',
        'GET /reports/completed': 'Tamamlanan görev sayısı',
        'GET /reports/pending': 'Bekleyen görev sayısı'
    }
  })
});

// ─── Route'ları bağla ───
app.use('/tasks', tasks);
app.use('/reports', reports);

// ─── 404 — Bulunamayan route'lar için ────
app.use((req, res) => {
  res.status(404).json({
    basarili: false,
    hata: `${req.originalUrl} adresi bulunamadı`
  });
});

// ─── Genel Hata Yakalayıcı (4 parametre şart!) ─────
app.use((err, req, res, next) => {
  console.error('Hata:', err.message);
  res.status(err.status || 500).json({
    basarili: false,
    hata:     err.message || 'Sunucu hatası',
    durum:    err.status  || 500
  });
});

app.listen(PORT, () => {
  console.log(`✅ TaskFlow API çalışıyor: http://localhost:${PORT}`);
  console.log(`📋 Görevler:  http://localhost:${PORT}/tasks`);
  console.log(`📊 Raporlar:  http://localhost:${PORT}/reports/summary`);
});
