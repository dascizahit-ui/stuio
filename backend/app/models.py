"""Veritabanı modelleri — Zette Studio site yönetimi."""
from __future__ import annotations

from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Integer, String, Text

from .database import Base


class AdminUser(Base):
    """Admin paneline giriş yapan kullanıcılar."""
    __tablename__ = "admin_users"

    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    def __str__(self) -> str:
        return self.username


class SiteSetting(Base):
    """Site geneli ayarlar — anahtar/değer (telefon, e-posta, whatsapp, instagram, adres...)."""
    __tablename__ = "site_settings"

    id = Column(Integer, primary_key=True)
    key = Column(String(80), unique=True, nullable=False, index=True)
    value = Column(Text, nullable=False, default="")
    label = Column(String(160), nullable=False, default="")  # admin panelinde okunabilir ad
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __str__(self) -> str:
        return f"{self.label or self.key}"


class Sector(Base):
    """Ana sayfadaki sektör kartları."""
    __tablename__ = "sectors"

    id = Column(Integer, primary_key=True)
    name = Column(String(120), nullable=False)            # Örn: "Restoran & Cafe"
    slug = Column(String(120), nullable=False, default="")  # Örn: "restoran"
    description = Column(Text, nullable=False, default="")
    page_url = Column(String(200), nullable=False, default="")  # Örn: "restoran.html"
    template_count = Column(Integer, default=0, nullable=False)
    pills = Column(String(200), nullable=False, default="")  # virgülle ayrılmış etiketler
    is_live = Column(Boolean, default=True, nullable=False)   # canlı / yakında
    sort_order = Column(Integer, default=0, nullable=False)

    def __str__(self) -> str:
        return self.name


class Template(Base):
    """Sektörlere ait şablon vitrini kayıtları."""
    __tablename__ = "templates"

    id = Column(Integer, primary_key=True)
    sector_slug = Column(String(120), nullable=False, default="", index=True)
    title = Column(String(160), nullable=False)
    description = Column(Text, nullable=False, default="")
    url = Column(String(255), nullable=False, default="")
    tag = Column(String(60), nullable=False, default="")
    is_active = Column(Boolean, default=True, nullable=False)
    sort_order = Column(Integer, default=0, nullable=False)

    def __str__(self) -> str:
        return self.title


class SocialLink(Base):
    """Sosyal sayfadaki (link-in-bio) bağlantılar."""
    __tablename__ = "social_links"

    id = Column(Integer, primary_key=True)
    title = Column(String(120), nullable=False)
    subtitle = Column(String(200), nullable=False, default="")
    url = Column(String(255), nullable=False)
    icon = Column(String(40), nullable=False, default="web")  # web/whatsapp/instagram/mail/phone
    is_primary = Column(Boolean, default=False, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    sort_order = Column(Integer, default=0, nullable=False)

    def __str__(self) -> str:
        return self.title


class FAQ(Base):
    """Sıkça sorulan sorular."""
    __tablename__ = "faqs"

    id = Column(Integer, primary_key=True)
    question = Column(String(255), nullable=False)
    answer = Column(Text, nullable=False, default="")
    is_active = Column(Boolean, default=True, nullable=False)
    sort_order = Column(Integer, default=0, nullable=False)

    def __str__(self) -> str:
        return self.question


class ContactMessage(Base):
    """İletişim formundan gelen mesajlar / teklif talepleri."""
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True)
    name = Column(String(160), nullable=False, default="")
    phone = Column(String(60), nullable=False, default="")
    email = Column(String(160), nullable=False, default="")
    sector = Column(String(120), nullable=False, default="")
    message = Column(Text, nullable=False, default="")
    is_read = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    def __str__(self) -> str:
        return f"{self.name} ({self.created_at:%d.%m.%Y})"
