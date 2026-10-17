// middleware/logger.js

// Gelen her API isteğinin; HTTP metodunu, endpoint'ini ve zaman damgasını
// hem konsola hem de "logs/backend.log" dosyasına kayıt altına alır.

const fs = require('fs');
const path = require('path');

const logDosyaYolu = path.join(__dirname, '..', 'logs', 'backend.log');

// logs/ klasörü yoksa oluştur (ilk çalıştırmada da sorunsuz çalışsın diye)
const logKlasoru = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logKlasoru)) {
  fs.mkdirSync(logKlasoru);
}

const logger = (req, res, next) => {
  const baslangic = Date.now();

  // Yanıt tamamlanınca (finish) logu yaz — böylece status code da bilinir
  res.on('finish', () => {
    const sure = Date.now() - baslangic;
    const zamanDamgasi = new Date().toISOString();

    // Konsola renkli log (başarılı: yeşil, hata: kırmızı)
    const renk = res.statusCode < 400 ? '\x1b[32m' : '\x1b[31m';
    const sifir = '\x1b[0m';
    console.log(
      `${renk}[${res.statusCode}]${sifir}`,
      `${req.method.padEnd(7)} ${req.originalUrl.padEnd(35)}`,
      `${sure}ms`,
      `- ${zamanDamgasi}`
    );

    // Dosyaya düz metin log satırı ekle (appendFileSync — Gün2 dosya işlemleri konusu)
    const logSatiri = `[${zamanDamgasi}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${sure}ms)\n`;
    try {
      fs.appendFileSync(logDosyaYolu, logSatiri, 'utf8');
    } catch (err) {
      console.error('Log dosyasına yazılamadı:', err.message);
    }
  });

  next();
};

module.exports = logger;
