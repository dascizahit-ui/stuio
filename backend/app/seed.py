"""Başlangıç verisi: admin kullanıcı + mevcut site içerikleri.

Kullanım:
    python -m app.seed
Ortam değişkenleri (opsiyonel):
    ADMIN_USERNAME (varsayılan: admin)
    ADMIN_PASSWORD (varsayılan: rastgele üretilir ve ekrana yazılır)
"""
from __future__ import annotations

import os
import secrets

from .database import SessionLocal, init_db
from .models import (
    AdminUser,
    FAQ,
    Sector,
    SiteSetting,
    SocialLink,
)
from .security import hash_password


def seed_admin(db) -> None:
    username = os.getenv("ADMIN_USERNAME", "admin")
    if db.query(AdminUser).filter(AdminUser.username == username).first():
        print(f"[=] Admin '{username}' zaten var, atlandı.")
        return
    password = os.getenv("ADMIN_PASSWORD") or secrets.token_urlsafe(10)
    db.add(AdminUser(username=username, password_hash=hash_password(password), is_active=True))
    db.commit()
    print("=" * 48)
    print("  ADMIN GİRİŞ BİLGİLERİ (bir kez gösterilir)")
    print(f"  Kullanıcı : {username}")
    print(f"  Şifre     : {password}")
    print("=" * 48)


def seed_settings(db) -> None:
    defaults = {
        "phone": ("Telefon", "+90 551 024 69 30"),
        "phone_raw": ("Telefon (link için)", "+905510246930"),
        "email": ("E-posta", "zettestudia@gmail.com"),
        "whatsapp": ("WhatsApp linki", "https://wa.me/905510246930"),
        "instagram": ("Instagram linki", "https://www.instagram.com/zettestudio"),
        "location": ("Lokasyon", "İstanbul, TR"),
        "site_url": ("Web sitesi", "https://zettestduio.com"),
    }
    for key, (label, value) in defaults.items():
        if not db.query(SiteSetting).filter(SiteSetting.key == key).first():
            db.add(SiteSetting(key=key, label=label, value=value))
    db.commit()
    print("[+] Site ayarları yüklendi.")


def seed_social(db) -> None:
    if db.query(SocialLink).count() > 0:
        print("[=] Sosyal bağlantılar mevcut, atlandı.")
        return
    links = [
        ("Web Sitemiz", "Şablonları ve hizmetleri keşfet", "https://zettestduio.com", "web", True),
        ("WhatsApp", "Hemen yazın, hızlı dönüş", "https://wa.me/905510246930", "whatsapp", False),
        ("Instagram", "@zettestudio", "https://www.instagram.com/zettestudio", "instagram", False),
        ("E-posta", "zettestudia@gmail.com", "mailto:zettestudia@gmail.com", "mail", False),
        ("Telefon", "+90 551 024 69 30", "tel:+905510246930", "phone", False),
    ]
    for i, (title, sub, url, icon, primary) in enumerate(links):
        db.add(SocialLink(title=title, subtitle=sub, url=url, icon=icon,
                          is_primary=primary, is_active=True, sort_order=i))
    db.commit()
    print("[+] Sosyal bağlantılar yüklendi.")


def seed_sectors(db) -> None:
    if db.query(Sector).count() > 0:
        print("[=] Sektörler mevcut, atlandı.")
        return
    rows = [
        ("Restoran & Cafe", "restoran", "Menü, rezervasyon, galeri ve iletişim akışı tek yerde.", "restoran.html", 5, "Menü,Rezervasyon,Galeri", True),
        ("Estetik & Güzellik", "estetik", "Online randevu, hizmet kataloğu, öncesi/sonrası galerisi.", "estetik.html", 2, "Randevu,Galeri", True),
        ("Diş Klinikleri", "dis", "Tedavi sayfaları, doktor kadrosu, hızlı randevu sistemi.", "dis-klinigi.html", 2, "Randevu,Tedaviler", True),
        ("Emlakçılar", "emlak", "İlan listeleri, harita, filtreli arama, danışman profilleri.", "emlak.html", 2, "Harita,Filtre", True),
        ("Avukatlar", "avukat", "Uzmanlık alanları, makale yayını, ekip profilleri ve form.", "avukat.html", 2, "Makaleler,Form", True),
        ("Galericiler", "galeri", "Stok kataloğu, fiyat filtreleri, takas/finansman çağrısı.", "galeri.html", 2, "Stok,Filtre", True),
        ("Mimarlar", "mimarlik", "Proje portföyü, tam ekran galeri, basında biz.", "mimarlik.html", 2, "Portföy,Galeri", True),
        ("Eğitim & Kurslar", "kurs", "Kurs takvimi, öğretmen kadrosu, online kayıt.", "kurs.html", 2, "LGS/YKS,Kayıt", True),
    ]
    for i, (name, slug, desc, url, count, pills, live) in enumerate(rows):
        db.add(Sector(name=name, slug=slug, description=desc, page_url=url,
                      template_count=count, pills=pills, is_live=live, sort_order=i))
    db.commit()
    print("[+] Sektörler yüklendi.")


def seed_faq(db) -> None:
    if db.query(FAQ).count() > 0:
        print("[=] SSS mevcut, atlandı.")
        return
    rows = [
        ("Logom yoksa destek alabilir miyim?", "Evet. Mevcut bir logonuz yoksa, web sitenizde kullanılabilecek sade ve temiz bir logo çalışması hazırlayabiliriz."),
        ("Yayından sonra güncelleme yapılabilir mi?", "Evet. Telefon, adres, fiyat, metin ve görsel gibi küçük güncellemelerde ilk yıl destek sağlıyoruz."),
        ("Domain ve hosting fiyata dahil mi?", "Hayır. Domain, hosting ve kurumsal e-posta ücretleri web sitesi tasarım fiyatına dahil değildir."),
        ("Site kaç dilde hazırlanabilir?", "Web sitenizi 3 dile kadar ücretsiz hazırlayabiliriz. Sonraki diller küçük bir ek ücretle eklenir."),
        ("Ödeme nasıl yapılıyor?", "Ödeme genellikle %50 başlangıçta, %50 site tesliminde alınır."),
    ]
    for i, (q, a) in enumerate(rows):
        db.add(FAQ(question=q, answer=a, is_active=True, sort_order=i))
    db.commit()
    print("[+] SSS yüklendi.")


def main() -> None:
    init_db()
    db = SessionLocal()
    try:
        seed_admin(db)
        seed_settings(db)
        seed_social(db)
        seed_sectors(db)
        seed_faq(db)
        print("\nTamamlandı. Panel: /admin")
    finally:
        db.close()


if __name__ == "__main__":
    main()
