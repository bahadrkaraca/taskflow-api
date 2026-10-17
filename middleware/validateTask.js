// middleware/validateTask.js

// title, description, priority, assignee alanlarını doğrular.
// Geçersiz/eksik veri gönderildiğinde 400 Bad Request + açıklayıcı hata döner.

const GECERLI_ONCELIKLER = ['low', 'medium', 'high'];
const GECERLI_DURUMLAR = ['pending', 'in-progress', 'completed'];

const validateTask = (req, res, next) => {
  const { title, description, priority, assignee, status } = req.body;
  const hatalar = [];

  // title zorunlu
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    hatalar.push('title alanı zorunludur ve boş olamaz');
  }

  // description zorunlu
  if (!description || typeof description !== 'string' || description.trim().length === 0) {
    hatalar.push('description alanı zorunludur ve boş olamaz');
  }

  // priority zorunlu ve geçerli bir değer olmalı
  if (!priority) {
    hatalar.push('priority alanı zorunludur (low, medium, high)');
  } else if (!GECERLI_ONCELIKLER.includes(priority)) {
    hatalar.push(`priority değeri geçersiz. Geçerli değerler: ${GECERLI_ONCELIKLER.join(', ')}`);
  }

  // assignee zorunlu
  if (!assignee || typeof assignee !== 'string' || assignee.trim().length === 0) {
    hatalar.push('assignee alanı zorunludur ve boş olamaz');
  }

  // status opsiyonel ama gönderildiyse geçerli olmalı
  if (status && !GECERLI_DURUMLAR.includes(status)) {
    hatalar.push(`status değeri geçersiz. Geçerli değerler: ${GECERLI_DURUMLAR.join(', ')}`);
  }

  if (hatalar.length > 0) {
    return res.status(400).json({
      basarili: false,
      hata: 'Doğrulama hatası',
      detaylar: hatalar
    });
  }

  next();
};

module.exports = validateTask;
