# Zette Studio — Backend (FastAPI + SQLAdmin)

Zette Studio sitesinin içeriklerini (sektörler, şablonlar, sosyal bağlantılar,
site ayarları, SSS ve iletişim mesajları) yönetmek için basit bir yönetim paneli
ve public API.

## Özellikler

- **/admin** — SQLAdmin yönetim paneli (kullanıcı adı + şifre ile giriş)
- **/api/...** — sitenin tüketebileceği public uç noktalar
- SQLite ile sıfır kurulum (istenirse Postgres'e geçilebilir)

## Yerel kurulum

```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# Linux/Mac:
source .venv/bin/activate

pip install -r requirements.txt

# .env oluştur
copy .env.example .env        # Windows
# cp .env.example .env         # Linux/Mac

# Tabloları oluştur + başlangıç verisi + admin kullanıcı
python -m app.seed

# Çalıştır
uvicorn app.main:app --reload --port 8001
```

Açılır:

- Panel: http://127.0.0.1:8001/admin
- API doc: http://127.0.0.1:8001/api/docs

## API uç noktaları

| Method | Yol                              | Açıklama                          |
| ------ | -------------------------------- | --------------------------------- |
| GET    | `/api/health`                    | Sağlık kontrolü                   |
| GET    | `/api/settings`                  | Site ayarları (anahtar/değer)     |
| GET    | `/api/social`                    | Sosyal sayfa bağlantıları         |
| GET    | `/api/sectors`                   | Sektör kartları                   |
| GET    | `/api/templates?sector=restoran` | Şablonlar (sektöre göre filtreli) |
| GET    | `/api/faq`                       | Sık sorulan sorular               |
| POST   | `/api/contact`                   | İletişim formu mesajı kaydeder    |

## Yönetim panelinde neler var

- **Site Ayarları** — telefon, e-posta, WhatsApp, Instagram, lokasyon, site adresi
- **Sektörler** — ana sayfadaki sektör kartları
- **Şablonlar** — sektörlere ait şablon vitrini
- **Sosyal Bağlantılar** — sosyal (link-in-bio) sayfasındaki butonlar
- **SSS** — sık sorulan sorular
- **İletişim Mesajları** — formdan gelen talepler (okundu işaretleme)
- **Yöneticiler** — panel kullanıcıları

## Üretim (sunucu) notu

Uvicorn'u doğrudan açmak yerine systemd servis + nginx reverse proxy önerilir.
nginx tarafında `/admin` ve `/api` yolları bu uygulamaya (ör. 127.0.0.1:8001)
proxy'lenir; geri kalan statik site nginx tarafından sunulur.
