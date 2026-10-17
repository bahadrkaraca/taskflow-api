// routes/reports.js

const express = require('express');
const router = express.Router();
const tasks = require('../data/tasks');

// GET /reports/completed — tamamlanan görev sayısı
router.get('/completed', (req, res) => {
  const tamamlananlar = tasks.filter(t => t.status === 'completed');
  res.json({
    basarili: true,
    adet: tamamlananlar.length,
    data: tamamlananlar
  });
});

// GET /reports/pending — bekleyen görev sayısı
router.get('/pending', (req, res) => {
  const bekleyenler = tasks.filter(t => t.status === 'pending');
  res.json({
    basarili: true,
    adet: bekleyenler.length,
    data: bekleyenler
  });
});

// GET /reports/summary — genel sistem özeti
router.get('/summary', (req, res) => {
  const ozet = {
    toplamGorev: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    oncelikDagilimi: {
      low: tasks.filter(t => t.priority === 'low').length,
      medium: tasks.filter(t => t.priority === 'medium').length,
      high: tasks.filter(t => t.priority === 'high').length
    },
    calisanBazliDagilim: tasks.reduce((acc, t) => {
      acc[t.assignee] = (acc[t.assignee] || 0) + 1;
      return acc;
    }, {})
  };

  res.json({ basarili: true, data: ozet });
});

module.exports = router;
