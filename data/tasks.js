// data/tasks.js
// Görevlerin tutulduğu bellek içi (in-memory) veri deposu.
// Gerçek bir projede burası veritabanından (MongoDB, PostgreSQL vb.) gelir.
// Bu proje kapsamında (5 günlük eğitim) veriler sunucu ayakta olduğu sürece
// bellekte (RAM) tutulur; sunucu yeniden başlatıldığında sıfırlanır.

let tasks = [
  {
    id: 1,
    title: "Proje mimarisini tasarla",
    description: "TaskFlow API için klasör yapısı ve endpoint listesi hazırlanacak",
    status: "completed",
    priority: "high",
    assignee: "musa",
    createdAt: "2026-09-20T09:00:00.000Z",
    updatedAt: "2026-09-20T14:30:00.000Z"
  },
  {
    id: 2,
    title: "Express sunucusunu kur",
    description: "Node.js + Express ile temel sunucu ve routing altyapısı oluşturulacak",
    status: "completed",
    priority: "high",
    assignee: "ayse",
    createdAt: "2026-09-21T09:00:00.000Z",
    updatedAt: "2026-09-21T16:00:00.000Z"
  },
  {
    id: 3,
    title: "Görev CRUD endpointlerini yaz",
    description: "Ekleme, listeleme, detay, güncelleme ve silme işlemleri geliştirilecek",
    status: "in-progress",
    priority: "medium",
    assignee: "musa",
    createdAt: "2026-09-22T09:00:00.000Z",
    updatedAt: "2026-09-23T11:15:00.000Z"
  },
  {
    id: 4,
    title: "Logger middleware ekle",
    description: "Gelen tüm isteklerin method, endpoint ve zaman damgasıyla loglanması sağlanacak",
    status: "pending",
    priority: "medium",
    assignee: "mehmet",
    createdAt: "2026-09-23T09:00:00.000Z",
    updatedAt: "2026-09-23T09:00:00.000Z"
  },
  {
    id: 5,
    title: "Postman ile testleri tamamla",
    description: "Tüm CRUD uçları Postman üzerinden test edilip ekran görüntüsü alınacak",
    status: "pending",
    priority: "low",
    assignee: "mehmet",
    createdAt: "2026-09-24T09:00:00.000Z",
    updatedAt: "2026-09-24T09:00:00.000Z"
  }
];

module.exports = tasks;
