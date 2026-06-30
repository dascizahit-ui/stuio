"""SQLAdmin tabanlı yönetim paneli ve giriş doğrulaması."""
from __future__ import annotations

from sqladmin import ModelView
from sqladmin.authentication import AuthenticationBackend
from starlette.requests import Request

from .database import SessionLocal
from .models import (
    AdminUser,
    ContactMessage,
    FAQ,
    Sector,
    SiteSetting,
    SocialLink,
    Template,
    Work,
)
from .security import verify_password


class AdminAuth(AuthenticationBackend):
    """Basit kullanıcı adı/şifre ile oturum tabanlı giriş."""

    async def login(self, request: Request) -> bool:
        form = await request.form()
        username = (form.get("username") or "").strip()
        password = form.get("password") or ""
        db = SessionLocal()
        try:
            user = (
                db.query(AdminUser)
                .filter(AdminUser.username == username, AdminUser.is_active == True)  # noqa: E712
                .first()
            )
            if user and verify_password(password, user.password_hash):
                request.session.update({"admin_user": user.username})
                return True
        finally:
            db.close()
        return False

    async def logout(self, request: Request) -> bool:
        request.session.clear()
        return True

    async def authenticate(self, request: Request) -> bool:
        return bool(request.session.get("admin_user"))


# ───────────────── ModelView'lar ─────────────────

class SiteSettingAdmin(ModelView, model=SiteSetting):
    name = "Site Ayarı"
    name_plural = "Site Ayarları"
    icon = "fa-solid fa-gear"
    column_list = [SiteSetting.label, SiteSetting.key, SiteSetting.value, SiteSetting.updated_at]
    column_searchable_list = [SiteSetting.key, SiteSetting.label]
    column_sortable_list = [SiteSetting.key]
    form_columns = [SiteSetting.label, SiteSetting.key, SiteSetting.value]
    can_delete = False
    column_labels = {
        SiteSetting.label: "Açıklama",
        SiteSetting.key: "Anahtar",
        SiteSetting.value: "Değer",
        SiteSetting.updated_at: "Güncellenme",
    }


class SectorAdmin(ModelView, model=Sector):
    name = "Sektör"
    name_plural = "Sektörler"
    icon = "fa-solid fa-grip"
    column_list = [Sector.sort_order, Sector.name, Sector.slug, Sector.template_count, Sector.is_live]
    column_sortable_list = [Sector.sort_order, Sector.name]
    column_searchable_list = [Sector.name, Sector.slug]
    form_columns = [
        Sector.name, Sector.slug, Sector.description, Sector.page_url,
        Sector.template_count, Sector.pills, Sector.is_live, Sector.sort_order,
    ]
    column_labels = {
        Sector.name: "Ad", Sector.slug: "Kısa Ad", Sector.description: "Açıklama",
        Sector.page_url: "Sayfa Linki", Sector.template_count: "Şablon Sayısı",
        Sector.pills: "Etiketler (virgülle)", Sector.is_live: "Yayında",
        Sector.sort_order: "Sıra",
    }


class TemplateAdmin(ModelView, model=Template):
    name = "Şablon"
    name_plural = "Şablonlar"
    icon = "fa-solid fa-layer-group"
    column_list = [Template.sort_order, Template.title, Template.sector_slug, Template.tag, Template.is_active]
    column_sortable_list = [Template.sort_order, Template.title]
    column_searchable_list = [Template.title, Template.sector_slug]
    form_columns = [
        Template.sector_slug, Template.title, Template.description,
        Template.url, Template.tag, Template.is_active, Template.sort_order,
    ]
    column_labels = {
        Template.sector_slug: "Sektör (kısa ad)", Template.title: "Başlık",
        Template.description: "Açıklama", Template.url: "Link", Template.tag: "Etiket",
        Template.is_active: "Aktif", Template.sort_order: "Sıra",
    }


class SocialLinkAdmin(ModelView, model=SocialLink):
    name = "Sosyal Bağlantı"
    name_plural = "Sosyal Bağlantılar"
    icon = "fa-solid fa-share-nodes"
    column_list = [SocialLink.sort_order, SocialLink.title, SocialLink.icon, SocialLink.url, SocialLink.is_active]
    column_sortable_list = [SocialLink.sort_order]
    form_columns = [
        SocialLink.title, SocialLink.subtitle, SocialLink.url, SocialLink.icon,
        SocialLink.is_primary, SocialLink.is_active, SocialLink.sort_order,
    ]
    column_labels = {
        SocialLink.title: "Başlık", SocialLink.subtitle: "Alt Başlık", SocialLink.url: "URL",
        SocialLink.icon: "İkon (web/whatsapp/instagram/mail/phone)",
        SocialLink.is_primary: "Öne Çıkan", SocialLink.is_active: "Aktif", SocialLink.sort_order: "Sıra",
    }


class FAQAdmin(ModelView, model=FAQ):
    name = "SSS"
    name_plural = "Sık Sorulan Sorular"
    icon = "fa-solid fa-circle-question"
    column_list = [FAQ.sort_order, FAQ.question, FAQ.is_active]
    column_sortable_list = [FAQ.sort_order]
    column_searchable_list = [FAQ.question]
    form_columns = [FAQ.question, FAQ.answer, FAQ.is_active, FAQ.sort_order]
    column_labels = {
        FAQ.question: "Soru", FAQ.answer: "Cevap", FAQ.is_active: "Aktif", FAQ.sort_order: "Sıra",
    }


class ContactMessageAdmin(ModelView, model=ContactMessage):
    name = "Mesaj"
    name_plural = "İletişim Mesajları"
    icon = "fa-solid fa-envelope"
    column_list = [
        ContactMessage.created_at, ContactMessage.name, ContactMessage.phone,
        ContactMessage.email, ContactMessage.sector, ContactMessage.is_read,
    ]
    column_sortable_list = [ContactMessage.created_at, ContactMessage.is_read]
    column_searchable_list = [ContactMessage.name, ContactMessage.email, ContactMessage.phone]
    column_default_sort = ("created_at", True)
    can_create = False  # mesajlar sadece formdan gelir
    form_columns = [ContactMessage.is_read]
    column_labels = {
        ContactMessage.created_at: "Tarih", ContactMessage.name: "Ad Soyad",
        ContactMessage.phone: "Telefon", ContactMessage.email: "E-posta",
        ContactMessage.sector: "Sektör", ContactMessage.message: "Mesaj",
        ContactMessage.is_read: "Okundu",
    }


class AdminUserAdmin(ModelView, model=AdminUser):
    name = "Yönetici"
    name_plural = "Yöneticiler"
    icon = "fa-solid fa-user-shield"
    column_list = [AdminUser.username, AdminUser.is_active, AdminUser.created_at]
    form_columns = [AdminUser.username, AdminUser.is_active]
    can_edit = True
    column_labels = {
        AdminUser.username: "Kullanıcı Adı", AdminUser.is_active: "Aktif",
        AdminUser.created_at: "Oluşturulma",
    }


class WorkAdmin(ModelView, model=Work):
    name = "İş / Referans"
    name_plural = "Yaptığımız İşler"
    icon = "fa-solid fa-briefcase"
    column_list = [Work.sort_order, Work.title, Work.category, Work.url, Work.is_active]
    column_sortable_list = [Work.sort_order, Work.title]
    column_searchable_list = [Work.title, Work.category]
    form_columns = [
        Work.title, Work.category, Work.description, Work.url,
        Work.image_url, Work.is_active, Work.sort_order,
    ]
    column_labels = {
        Work.title: "Proje / Müşteri Adı", Work.category: "Kategori",
        Work.description: "Açıklama", Work.url: "Site Linki",
        Work.image_url: "Görsel URL (opsiyonel)", Work.is_active: "Aktif",
        Work.sort_order: "Sıra",
    }


ALL_VIEWS = [
    SiteSettingAdmin,
    SectorAdmin,
    TemplateAdmin,
    WorkAdmin,
    SocialLinkAdmin,
    FAQAdmin,
    ContactMessageAdmin,
    AdminUserAdmin,
]
