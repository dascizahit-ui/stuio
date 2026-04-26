# Studio — Site Kullanım Kılavuzu

Selam! Sitenle ilgili her şey bu klasörde. Aşağıda **hangi dosyada ne var**, **iletişim bilgilerini nereden değiştireceksin**, ve en önemlisi **yeni sektör/şablon nasıl eklenir** anlatıyorum.

---

## 1. Klasör yapısı

```
outputs/
├── index.html              ← Ana satış sayfası (insanların ilk gördüğü)
├── README.md               ← Bu dosya
└── sablonlar/
    ├── cafe-aroma.html               ← Aroma Café şablonu
    ├── restoran-menu.html            ← Modern menü şablonu
    ├── restoran-menu-premium.html    ← Dölapi premium menü
    └── restoran-orta-paket.html      ← Anadolu Sofra şablonu
```

`index.html` ana sayfa. Şablonlar `sablonlar/` klasörünün içinde — `index.html` oradan link veriyor.

---

## 2. İletişim bilgilerini değiştir (yapman gereken ilk şey)

`index.html`'i bir text editör (VS Code, Notepad++ veya Notepad bile olur) ile aç. Aşağıdaki yerleri **Ctrl+F** (bul) ile arayıp değiştir:

| Aranacak | Ne ile değiştir |
|---|---|
| `+90 5XX XXX XX XX` | Gerçek telefon numaran (2 yerde geçer) |
| `selam@studio.com` | Gerçek e-posta adresin (2 yerde geçer) |
| `İstanbul, TR` | Gerçek lokasyon (2 yerde geçer) |
| `studio` (logo'da) | Firma ismin (3 yerde: nav, footer, title) |
| `Studio` (footer copyright) | Firma ismin |

Sosyal medya linkleri için footer'daki `<a href="#">Instagram</a>` gibi satırları bul, `#` yerine kendi linkini koy.

WhatsApp butonu için `<a href="#" class="btn btn-primary">WhatsApp'tan yaz</a>` satırını ara, `#` yerine `https://wa.me/905XXXXXXXXX` yaz (numarana göre).

---

## 3. Yeni sektör eklemek (Estetik, Diş, Emlak, Avukat, Galeri, Mimar, Eğitim)

Şu an aktif olan tek sektör **Restoran & Cafe**. Diğerleri "Yakında" rozetiyle gözüküyor. Bir sektör için şablonun hazır olunca onu **canlı** hale getir.

### Adım 1: Sektör için şablon HTML'lerini hazırla

Yeni şablonunu (örneğin estetik salonu için) `sablonlar/` klasörüne kaydet. İsim verirken Türkçe karakter ve boşluk **kullanma** — örnek:

```
sablonlar/
├── estetik-luxe.html              ← İyi
├── estetik salonu güzellik.html   ← KÖTÜ (boşluk + Türkçe karakter)
```

İyi isim örnekleri:
- `estetik-luxe.html`, `estetik-modern.html`
- `dis-klinigi-beyaz.html`, `dis-modern.html`
- `emlak-portfoy.html`, `emlak-luxury.html`
- `avukat-kurumsal.html`, `avukat-klasik.html`
- `galeri-otomobil.html`
- `mimar-portfoy.html`
- `egitim-kurs.html`

### Adım 2: `index.html`'de o sektör kartını "canlı" yap

`index.html`'i aç, "Yakında" yazan kartlardan değiştirmek istediğini bul. Mesela **Estetik & Güzellik** kartı şu an böyle:

```html
<div class="sector-card soon">
  <div>
    <div class="sector-icon">
      <svg ...>...</svg>
    </div>
    <h3 class="sector-name">Estetik &amp; Güzellik</h3>
    <p class="sector-desc">Online randevu, hizmet kataloğu, öncesi/sonrası galerisi.</p>
  </div>
  <span class="badge-soon">Yakında</span>
</div>
```

Bunu şuna çevir (3 yerde değişiklik var):

```html
<a href="sablonlar/estetik-luxe.html" class="sector-card live" target="_blank">
  <div>
    <div class="sector-icon">
      <svg ...>...</svg>
    </div>
    <h3 class="sector-name">Estetik &amp; Güzellik</h3>
    <p class="sector-desc">Online randevu, hizmet kataloğu, öncesi/sonrası galerisi.</p>
  </div>
  <span class="sector-link">Şablonları gör →</span>
</a>
```

**3 değişiklik:**
1. `<div class="sector-card soon">` → `<a href="sablonlar/ESTETIK-DOSYAN.html" class="sector-card live" target="_blank">`
2. En sondaki `<span class="badge-soon">Yakında</span>` → `<span class="sector-link">Şablonları gör →</span>`
3. En son `</div>` → `</a>` (kapanış etiketini de değiştir!)

### Adım 3: Şablonu "Şablonlar" bölümüne ekle (opsiyonel ama önerilir)

`index.html`'de `<!-- TEMPLATES -->` bölümünü bul. Mevcut şablon kartlarından birini kopyala, yapıştır, içini değiştir:

```html
<a href="sablonlar/estetik-luxe.html" class="template-card s" target="_blank">
  <div class="template-preview" style="background: linear-gradient(135deg, #2a1830 0%, #150a18 100%);">
    <svg viewBox="0 0 700 440" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="700" height="440" fill="#1a0e1f"/>
      <text x="60" y="200" font-family="serif" font-size="56" fill="#f5ede0">Luxe</text>
      <text x="60" y="270" font-family="serif" font-style="italic" font-size="56" fill="#d4a3ff">Beauty.</text>
    </svg>
  </div>
  <div class="template-info">
    <div>
      <h3>Luxe Beauty</h3>
      <p>Estetik salonu, randevu sistemli</p>
    </div>
    <span class="template-tag">Estetik</span>
  </div>
</a>
```

**Notlar:**
- `class="template-card l"` = büyük kart (7 sütun), `class="template-card s"` = küçük kart (5 sütun). Grid 12 sütunlu, yan yana toplam 12 olmalı (`l + s` ya da `s + s + s` gibi).
- Önizleme SVG'si göstermelik; gerçek şablonun mini görselini istersen `<img>` etiketi de kullanabilirsin.

---

## 4. Yeni şablon eklemek (mevcut sektöre)

Aynı sektörde 2. veya 3. şablon eklemek istersen sadece **Adım 3**'ü tekrar et — yani `<!-- TEMPLATES -->` bölümüne yeni bir `<a class="template-card ...">` kartı kopyala.

Sektör kartı zaten `live` durumdaysa zaten linklenmiş olacak.

---

## 5. Mevcut metinleri / başlıkları değiştirmek

Hero'daki "İşine **özel** bir web sitesi." başlığı:
- `index.html`'de `<h1 class="hero-title">` ara.
- `<em>` tag'i içindekiler **yeşil renkli** olur. Cesur ol, vurgulamak istediğini değiştir.

İstatistikler (5-10 gün, 100% mobil...) `<!-- STATS -->` bölümünde. Sayıları olduğu gibi değiştirebilirsin.

SSS soruları `<!-- FAQ -->` bölümünde. Yeni soru eklemek için bir `<div class="faq-item">` bloğunu kopyala-yapıştır.

---

## 6. Renk değiştirmek (opsiyonel)

Sayfanın baş kısmında `:root` blokunda renkler tanımlı:

```css
--accent: #d4ff3e;       /* Asıl vurgu rengi (lime green) */
--accent-warm: #ff6b35;  /* İkincil vurgu (turuncu) */
--bg: #0d0d0f;           /* Sayfa arka planı */
```

`--accent` değerini değiştirirsen tüm vurgular bir anda değişir. Bazı öneriler:
- `#00d9a3` (mint yeşili)
- `#ff5d8f` (sıcak pembe)
- `#7dd3fc` (gökyüzü mavisi)
- `#fbbf24` (altın sarısı)

---

## 7. Yayına alma

Site tamamen statik (sunucu/database yok). Şu seçenekler var:

1. **Netlify** (en kolay): netlify.com'a kayıt ol, `outputs/` klasörünü drag-drop bırak. Anında ücretsiz alan adı verir.
2. **Vercel**: aynı şekilde, vercel.com'a sürükle bırak.
3. **GitHub Pages**: ücretsiz, GitHub hesabı gerekiyor.
4. **Kendi hostingin**: cPanel/FTP ile `public_html` klasörüne tüm `outputs/` içeriğini at.

Domain bağlamak için (mesela `studio.com.tr`):
- Domain'i Natro/İsimTescil/Turhost gibi yerden satın al.
- DNS ayarlarından Netlify/Vercel'in verdiği adrese yönlendir (3 dakikalık iş, panellerde rehberi var).

---

## 8. Önemli notlar

- ✅ Tüm dosyalar **tek başına çalışıyor** — bir backend kurmana gerek yok.
- ✅ Mobil + masaüstü + tablet uyumlu.
- ✅ Tüm fontlar Google Fonts'tan yükleniyor (ücretsiz).
- ⚠️ `index.html` ve `sablonlar/` klasörü **birlikte** taşınmalı. Sadece index'i alırsan şablon linkleri kırılır.
- ⚠️ Türkçe karakter sorunlarından kaçınmak için dosya isimlerinde sadece `a-z, 0-9, -` kullan.

---

## Sektör listesi & şu anki durum

| Sektör | Durum | Şablon dosyası |
|---|---|---|
| Restoran & Cafe | ✅ Aktif | `cafe-aroma.html`, `restoran-menu.html`, `restoran-menu-premium.html`, `restoran-orta-paket.html` |
| Estetik & Güzellik | 🟡 Yakında | — |
| Diş Klinikleri | 🟡 Yakında | — |
| Emlakçılar | 🟡 Yakında | — |
| Avukatlar | 🟡 Yakında | — |
| Galericiler | 🟡 Yakında | — |
| Mimarlar | 🟡 Yakında | — |
| Eğitim & Kurslar | 🟡 Yakında | — |

Yeni şablon hazırladıkça yukarıdaki "Adım 1-2-3" akışını uygula, bir saatte siteye eklenmiş olur.

Kolay gelsin 🍀
