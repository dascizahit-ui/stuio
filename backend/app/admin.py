"""SQLAdmin tabanlı yönetim paneli ve giriş doğrulaması."""
from __future__ import annotations

from sqladmin import BaseView, ModelView, expose
from sqladmin.authentication import AuthenticationBackend
from starlette.requests import Request
from starlette.responses import HTMLResponse

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
from .security import hash_password, verify_password


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


def _page(title: str, body: str) -> str:
    """Basit, panel temasına yakın standalone HTML sayfası."""
    return f"""<!DOCTYPE html><html lang="tr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} — Zette Yönetim</title>
<style>
  body {{ margin:0; font-family:-apple-system,Segoe UI,Roboto,sans-serif; background:#0f172a; color:#e2e8f0; }}
  .top {{ background:#1e293b; padding:16px 24px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #334155; }}
  .top a {{ color:#38bdf8; text-decoration:none; font-size:14px; }}
  .top b {{ font-size:16px; }}
  .wrap {{ max-width:880px; margin:32px auto; padding:0 20px; }}
  h1 {{ font-size:22px; margin:0 0 20px; }}
  .cards {{ display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:16px; margin-bottom:28px; }}
  .card {{ background:#1e293b; border:1px solid #334155; border-radius:12px; padding:20px; }}
  .card .n {{ font-size:32px; font-weight:700; color:#38bdf8; }}
  .card .l {{ font-size:13px; color:#94a3b8; margin-top:4px; }}
  .card.alert .n {{ color:#f59e0b; }}
  table {{ width:100%; border-collapse:collapse; background:#1e293b; border-radius:12px; overflow:hidden; }}
  th,td {{ padding:12px 14px; text-align:left; font-size:14px; border-bottom:1px solid #334155; }}
  th {{ background:#273449; color:#94a3b8; font-weight:600; }}
  form {{ background:#1e293b; border:1px solid #334155; border-radius:12px; padding:24px; max-width:420px; }}
  label {{ display:block; font-size:13px; color:#94a3b8; margin:14px 0 6px; }}
  input {{ width:100%; padding:11px 13px; border-radius:8px; border:1px solid #334155; background:#0f172a; color:#e2e8f0; font-size:14px; box-sizing:border-box; }}
  button {{ margin-top:20px; width:100%; padding:12px; border:none; border-radius:8px; background:#38bdf8; color:#0f172a; font-weight:700; font-size:14px; cursor:pointer; }}
  .msg {{ padding:12px 14px; border-radius:8px; margin-bottom:16px; font-size:14px; }}
  .msg.ok {{ background:rgba(34,197,94,.15); color:#86efac; border:1px solid rgba(34,197,94,.4); }}
  .msg.err {{ background:rgba(239,68,68,.15); color:#fca5a5; border:1px solid rgba(239,68,68,.4); }}
</style></head><body>
<div class="top"><b>Zette Yönetim</b><a href="/admin">← Panele dön</a></div>
<div class="wrap">{body}</div></body></html>"""


class DashboardView(BaseView):
    name = "Genel Bakış"
    icon = "fa-solid fa-gauge-high"

    @expose("/dashboard", methods=["GET"])
    async def dashboard(self, request: Request):
        db = SessionLocal()
        try:
            total_msg = db.query(ContactMessage).count()
            unread = db.query(ContactMessage).filter(ContactMessage.is_read == False).count()  # noqa: E712
            works = db.query(Work).count()
            templates = db.query(Template).count()
            sectors = db.query(Sector).count()
            recent = (
                db.query(ContactMessage)
                .order_by(ContactMessage.created_at.desc())
                .limit(8)
                .all()
            )
        finally:
            db.close()

        rows = "".join(
            f"<tr><td>{(m.name or '-')}</td><td>{(m.phone or '-')}</td>"
            f"<td>{(m.sector or '-')}</td><td>{m.created_at:%d.%m.%Y %H:%M}</td>"
            f"<td>{'Okundu' if m.is_read else '<b style=color:#f59e0b>Yeni</b>'}</td></tr>"
            for m in recent
        ) or "<tr><td colspan='5' style='color:#94a3b8'>Henüz mesaj yok.</td></tr>"

        body = f"""
        <h1>Genel Bakış</h1>
        <div class="cards">
          <div class="card alert"><div class="n">{unread}</div><div class="l">Okunmamış Mesaj</div></div>
          <div class="card"><div class="n">{total_msg}</div><div class="l">Toplam Mesaj</div></div>
          <div class="card"><div class="n">{works}</div><div class="l">Yaptığımız İş</div></div>
          <div class="card"><div class="n">{templates}</div><div class="l">Şablon</div></div>
          <div class="card"><div class="n">{sectors}</div><div class="l">Sektör</div></div>
        </div>
        <h1 style="font-size:17px">Son Mesajlar</h1>
        <table><tr><th>Ad</th><th>Telefon</th><th>Alan</th><th>Tarih</th><th>Durum</th></tr>{rows}</table>
        """
        return HTMLResponse(_page("Genel Bakış", body))


class ChangePasswordView(BaseView):
    name = "Şifre Değiştir"
    icon = "fa-solid fa-key"

    @expose("/change-password", methods=["GET", "POST"])
    async def change_password(self, request: Request):
        username = request.session.get("admin_user")
        msg = ""
        if request.method == "POST":
            form = await request.form()
            old = form.get("old_password") or ""
            new1 = form.get("new_password") or ""
            new2 = form.get("new_password2") or ""
            db = SessionLocal()
            try:
                user = db.query(AdminUser).filter(AdminUser.username == username).first()
                if not user or not verify_password(old, user.password_hash):
                    msg = '<div class="msg err">Mevcut şifre hatalı.</div>'
                elif len(new1) < 6:
                    msg = '<div class="msg err">Yeni şifre en az 6 karakter olmalı.</div>'
                elif new1 != new2:
                    msg = '<div class="msg err">Yeni şifreler eşleşmiyor.</div>'
                else:
                    user.password_hash = hash_password(new1)
                    db.commit()
                    msg = '<div class="msg ok">Şifreniz başarıyla güncellendi.</div>'
            finally:
                db.close()
        body = f"""
        <h1>Şifre Değiştir</h1>
        {msg}
        <form method="post">
          <label>Mevcut Şifre</label>
          <input type="password" name="old_password" required>
          <label>Yeni Şifre (en az 6 karakter)</label>
          <input type="password" name="new_password" required>
          <label>Yeni Şifre (tekrar)</label>
          <input type="password" name="new_password2" required>
          <button type="submit">Şifreyi Güncelle</button>
        </form>
        """
        return HTMLResponse(_page("Şifre Değiştir", body))


ALL_VIEWS = [
    DashboardView,
    SiteSettingAdmin,
    SectorAdmin,
    TemplateAdmin,
    WorkAdmin,
    SocialLinkAdmin,
    FAQAdmin,
    ContactMessageAdmin,
    AdminUserAdmin,
    ChangePasswordView,
]
