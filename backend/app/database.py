"""Veritabanı bağlantısı ve oturum yönetimi."""
from __future__ import annotations

import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Veritabanı URL'i: varsayılan SQLite (kolay kurulum). İstenirse .env ile Postgres'e geçilebilir.
# Örnek Postgres: postgresql+psycopg2://user:pass@localhost:5432/zette
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./zette.db")

_connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=_connect_args, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()


def get_db():
    """FastAPI dependency: istek başına bir oturum."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db() -> None:
    """Tabloları oluştur (yoksa)."""
    from . import models  # noqa: F401 - modellerin kaydı için import şart
    Base.metadata.create_all(bind=engine)
