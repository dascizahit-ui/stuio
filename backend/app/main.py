"""Zette Studio — FastAPI backend + SQLAdmin yönetim paneli."""
from __future__ import annotations

import os

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqladmin import Admin
from sqlalchemy.orm import Session

from .admin import ALL_VIEWS, AdminAuth
from .database import engine, get_db, init_db
from .models import FAQ, ContactMessage, Sector, SiteSetting, SocialLink, Template
from .schemas import ContactIn, FAQOut, SectorOut, SocialLinkOut, TemplateOut

SECRET_KEY = os.getenv("SECRET_KEY", "change-this-secret-in-production")

app = FastAPI(title="Zette Studio API", version="1.0.0", docs_url="/api/docs", openapi_url="/api/openapi.json")

# Statik siteyle aynı origin'de çalışacak; yine de gevşek CORS (gerekirse kısılır)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


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


@app.post("/api/contact")
def post_contact(payload: ContactIn, db: Session = Depends(get_db)):
    if not (payload.name or payload.phone or payload.email):
        raise HTTPException(status_code=400, detail="En az bir iletişim bilgisi girin.")
    msg = ContactMessage(
        name=payload.name.strip(),
        phone=payload.phone.strip(),
        email=payload.email.strip(),
        sector=payload.sector.strip(),
        message=payload.message.strip(),
    )
    db.add(msg)
    db.commit()
    return {"ok": True, "message": "Mesajınız alındı. En kısa sürede dönüş yapacağız."}
