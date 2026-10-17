# Proje Tanıtım Dokümanı — TaskFlow API

## 1. Projenin Amacı

Bu proje, Node.js ile Backend Programlama eğitimi kapsamında edinilen bilgi ve becerilerin uygulamalı olarak gösterilmesi amacıyla geliştirilmiştir. Katılımcı olarak, gerçek hayatta kullanılabilecek bir **Görev ve Proje Yönetim Sistemi API'si** tasarlanmış ve geliştirilmiştir. Sistem tamamen REST API mantığında geliştirilmiştir.

## 2. Senaryo

Bir yazılım şirketi, ekip içerisindeki görevleri, projeleri ve çalışanların sorumluluklarını takip etmek istemektedir. Geliştirilen **TaskFlow** sistemi; görevlerin oluşturulmasını, çalışanlara atanmasını, durumlarının takip edilmesini ve önceliklendirilmesini desteklemektedir. Ek olarak (isteğe bağlı bonus kapsamında) görev filtreleme ve temel raporlama süreçleri de eklenmiştir.

## 3. Sistemin Temel Özellikleri

- **Görev Oluşturma** — Başlık, açıklama, öncelik ve atanan çalışan bilgisiyle yeni görev eklenebilir.
- **Görev Listeleme** — Sistemdeki tüm görevler listelenebilir.
- **Görev Detayı** — ID ile belirli bir görevin tüm bilgilerine ulaşılabilir.
- **Görev Güncelleme** — Mevcut bir görevin bilgileri (durum, öncelik, açıklama vb.) güncellenebilir.
- **Görev Silme** — Görev sistemden kaldırılabilir.
- **Loglama** — Sisteme gelen tüm istekler (method, endpoint, zaman damgası, süre) hem konsola hem de bir log dosyasına kaydedilir.

### Bonus Özellikler (isteğe bağlı, teslime dahil değildir)

- Duruma / önceliğe göre filtreleme, anahtar kelime ile arama, sayfalama ve sıralama
- Çalışan bazlı görev listeleme
- Veri doğrulama (validation) middleware'i
- Tamamlanan/bekleyen görev sayısı ve genel sistem özeti raporları

## 4. Kullanılan Teknolojiler

| Teknoloji     | Kullanım Amacı                              |
|---------------|-----------------------------------------------|
| Node.js       | Sunucu tarafı çalışma ortamı                  |
| Express.js    | HTTP sunucusu, routing ve middleware yönetimi |
| JSON          | Veri alışverişi formatı                       |
| Postman       | API test aracı                                |

Veriler, proje kapsamının bir veritabanı içermemesi nedeniyle **bellek içinde (in-memory)** bir JavaScript dizisi olarak tutulmaktadır.

## 5. Veri Modeli (Görev / Task)

| Alan          | Tip     | Açıklama                                            |
|---------------|---------|------------------------------------------------------|
| `id`          | Number  | Görevin benzersiz kimliği (otomatik atanır)          |
| `title`       | String  | Görev başlığı (zorunlu)                              |
| `description` | String  | Görev açıklaması (zorunlu)                           |
| `status`      | String  | `pending` / `in-progress` / `completed`              |
| `priority`    | String  | `low` / `medium` / `high` (zorunlu)                  |
| `assignee`    | String  | Görevin atandığı çalışanın adı (zorunlu)             |
| `createdAt`   | String  | Görevin oluşturulma zamanı (ISO 8601)                |
| `updatedAt`   | String  | Görevin son güncellenme zamanı (ISO 8601)            |

## 6. Sonuç

TaskFlow API, öngörülen 5 günlük eğitim kapsamındaki tüm zorunlu gereksinimleri (Node.js/Express altyapısı, tam CRUD işlemleri, temel logger middleware, Postman testleri) karşılayacak şekilde geliştirilmiş; ayrıca isteğe bağlı ileri seviye pratiklerle (filtreleme, doğrulama, raporlama) desteklenmiştir.
