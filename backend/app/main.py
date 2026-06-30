"""Zette Studio — FastAPI backend + SQLAdmin yönetim paneli."""
from __future__ import annotations

import os
import time
from collections import defaultdict

from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from sqladmin import Admin
from sqlalchemy.orm import Session

from .admin import ALL_VIEWS, AdminAuth
from .database import engine, get_db, init_db
from .models import FAQ, ContactMessage, Sector, SiteSetting, SocialLink, Template, Work
from .schemas import ContactIn, FAQOut, SectorOut, SocialLinkOut, TemplateOut, WorkOut

SECRET_KEY = os.getenv("SECRET_KEY", "change-this-secret-in-production")

# Üretimde docs/openapi kapalı (ENABLE_DOCS=1 ile açılabilir)
_docs_enabled = os.getenv("ENABLE_DOCS", "0") == "1"

app = FastAPI(
    title="Zette Studio API",
    version="1.0.0",
    docs_url="/api/docs" if _docs_enabled else None,
    redoc_url=None,
    openapi_url="/api/openapi.json" if _docs_enabled else None,
)

# Sadece kendi alan adlarımıza izin ver
ALLOWED_ORIGINS = [
    "https://zettestduio.com",
    "https://www.zettestduio.com",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# ───── Basit IP tabanlı rate limit (iletişim formu için) ─────
_RATE: dict[str, list[float]] = defaultdict(list)
_RATE_WINDOW = 60.0      # saniye
_RATE_MAX = 4            # bu pencerede izin verilen mesaj sayısı


def _client_ip(request: Request) -> str:
    # Cloudflare → nginx → uvicorn zinciri; gerçek IP forward header'larında
    fwd = request.headers.get("cf-connecting-ip") or request.headers.get("x-forwarded-for")
    if fwd:
        return fwd.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def _rate_ok(ip: str) -> bool:
    now = time.time()
    hits = [t for t in _RATE[ip] if now - t < _RATE_WINDOW]
    hits.append(now)
    _RATE[ip] = hits
    return len(hits) <= _RATE_MAX


@app.on_event("startup")
def _startup() -> None:
    init_db()


# ───────────────── SQLAdmin ─────────────────
admin = Admin(
    app,
    engine,
    title="Zette Studio Yönetim",
    base_url="/admin",
    authentication_backend=AdminAuth(secret_key=SECRET_KEY),
)
for view in ALL_VIEWS:
    admin.add_view(view)


# ───────────────── Public API ─────────────────
@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/settings")
def get_settings(db: Session = Depends(get_db)) -> dict:
    rows = db.query(SiteSetting).all()
    return {r.key: r.value for r in rows}


@app.get("/api/social", response_model=list[SocialLinkOut])
def get_social(db: Session = Depends(get_db)):
    return (
        db.query(SocialLink)
        .filter(SocialLink.is_active == True)  # noqa: E712
        .order_by(SocialLink.sort_order)
        .all()
    )


@app.get("/api/sectors", response_model=list[SectorOut])
def get_sectors(db: Session = Depends(get_db)):
    return db.query(Sector).order_by(Sector.sort_order).all()


@app.get("/api/templates", response_model=list[TemplateOut])
def get_templates(sector: str | None = None, db: Session = Depends(get_db)):
    q = db.query(Template).filter(Template.is_active == True)  # noqa: E712
    if sector:
        q = q.filter(Template.sector_slug == sector)
    return q.order_by(Template.sort_order).all()


@app.get("/api/faq", response_model=list[FAQOut])
def get_faq(db: Session = Depends(get_db)):
    return (
        db.query(FAQ)
        .filter(FAQ.is_active == True)  # noqa: E712
        .order_by(FAQ.sort_order)
        .all()
    )


@app.get("/api/works", response_model=list[WorkOut])
def get_works(db: Session = Depends(get_db)):
    return (
        db.query(Work)
        .filter(Work.is_active == True)  # noqa: E712
        .order_by(Work.sort_order)
        .all()
    )


@app.post("/api/contact")
def post_contact(payload: ContactIn, request: Request, db: Session = Depends(get_db)):
    # Honeypot: gizli "website" alanı doluysa bot kabul et (sessizce başarı dön, kaydetme)
    if (payload.website or "").strip():
        return {"ok": True, "message": "Mesajınız alındı."}

    # Rate limit
    if not _rate_ok(_client_ip(request)):
        raise HTTPException(status_code=429, detail="Çok fazla istek. Lütfen biraz sonra tekrar deneyin.")

    if not (payload.name or payload.phone or payload.email):
        raise HTTPException(status_code=400, detail="En az bir iletişim bilgisi girin.")
    msg = ContactMessage(
        name=payload.name.strip()[:160],
        phone=payload.phone.strip()[:60],
        email=payload.email.strip()[:160],
        sector=payload.sector.strip()[:120],
        message=payload.message.strip()[:4000],
    )
    db.add(msg)
    db.commit()
    return {"ok": True, "message": "Mesajınız alındı. En kısa sürede dönüş yapacağız."}
