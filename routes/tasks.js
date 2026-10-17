// routes/tasks.js — TaskFlow Görev Yönetim Modülü
// Görev Ekleme, Listeleme, Detay, Güncelleme, Silme
// Filtreleme, Arama, Sayfalama, Sıralama, Kullanıcı bazlı listeleme, Validation middleware

const express = require('express');
const router = express.Router();
const tasks = require('../data/tasks');
const validateTask = require('../middleware/validateTask');

let sonrakiId = tasks.length + 1;

router.get('/', (req, res) => {
  let sonuc = [...tasks];
  const { status, priority, sort, page, limit } = req.query;

  //duruma göre filtreleme
  if (status) {
    sonuc = sonuc.filter(t => t.status === status);
  }

  //önceliğe göre filtreleme
  if (priority) {
    sonuc = sonuc.filter(t => t.priority === priority);
  }

  //sıralama
  if (sort === 'createdAt') {
    sonuc = sonuc.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  const toplamAdet = sonuc.length;

  //sayfalama
  if (page || limit) {
    const sayfa = Number(page)  || 1;
    const adet = Number(limit) || 10;
    const baslangic = (sayfa - 1) * adet;
    sonuc = sonuc.slice(baslangic, baslangic + adet);

    return res.json({
      basarili: true,
      adet: sonuc.length,
      toplamAdet,
      sayfa,
      limit: adet,
      data: sonuc
    });
  }

  res.json({
    basarili: true,
    adet: toplamAdet,
    data: sonuc
  });
});


router.get('/search', (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({
      basarili: false,
      hata: 'keyword query parametresi zorunludur. Örnek: /tasks/search?keyword=backend'
    });
  }

  const anahtar = keyword.toLowerCase();
  const bulunanlar = tasks.filter(t =>
    t.title.toLowerCase().includes(anahtar) ||
    t.description.toLowerCase().includes(anahtar)
  );

  res.json({
    basarili: true,
    adet: bulunanlar.length,
    data: bulunanlar
  });
});


router.get('/assignee/:isim', (req, res) => {
  const isim = req.params.isim.toLowerCase();
  const bulunanlar = tasks.filter(t => t.assignee.toLowerCase() === isim);

  res.json({
    basarili: true,
    adet: bulunanlar.length,
    data: bulunanlar
  });
});


router.get('/:id', (req, res) => {
  const id  = Number(req.params.id);
  const gorev = tasks.find(t => t.id === id);

  if (!gorev) {
    return res.status(404).json({
      basarili: false,
      hata: `${id} ID'li görev bulunamadı`
    });
  }

  res.json({ basarili: true, data: gorev });
});


router.post('/', validateTask, (req, res) => {
  const { title, description, priority, assignee, status } = req.body;

  const simdi = new Date().toISOString();

  const yeniGorev = {
    id: sonrakiId++,
    title,
    description,
    status: status || 'pending',
    priority,
    assignee,
    createdAt: simdi,
    updatedAt: simdi
  };

  tasks.push(yeniGorev);

  res.status(201).json({
    basarili: true,
    mesaj: 'Görev oluşturuldu',
    data: yeniGorev
  });
});


router.put('/:id', validateTask, (req, res) => {
  const id  = Number(req.params.id);
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({
      basarili: false,
      hata: `${id} ID'li görev bulunamadı`
    });
  }

  const eskiKayit  = tasks[index];
  const guncelleme = req.body;

  tasks[index] = {
    ...eskiKayit,
    ...guncelleme,
    id: eskiKayit.id,
    createdAt: eskiKayit.createdAt,
    updatedAt: new Date().toISOString()
  };

  res.json({
    basarili: true,
    mesaj: 'Görev güncellendi',
    onceki: eskiKayit,
    guncel: tasks[index]
  });
});

// DELETE /tasks/:id
// Görevi sistemden kaldırır.

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({
      basarili: false,
      hata: `${id} ID'li görev bulunamadı`
    });
  }

  const silinenGorev = tasks.splice(index, 1)[0];

  res.json({
    basarili: true,
    mesaj: 'Görev silindi',
    silinen: silinenGorev
  });
});

module.exports = router;
