"""Public API için Pydantic şemaları."""
from __future__ import annotations

from pydantic import BaseModel, Field


class ContactIn(BaseModel):
    name: str = Field(default="", max_length=160)
    phone: str = Field(default="", max_length=60)
    email: str = Field(default="", max_length=160)
    sector: str = Field(default="", max_length=120)
    message: str = Field(default="", max_length=4000)
    website: str = Field(default="", max_length=200)  # honeypot — gerçek kullanıcı boş bırakır


class SocialLinkOut(BaseModel):
    title: str
    subtitle: str
    url: str
    icon: str
    is_primary: bool

    class Config:
        from_attributes = True


class SectorOut(BaseModel):
    name: str
    slug: str
    description: str
    page_url: str
    template_count: int
    pills: str
    is_live: bool

    class Config:
        from_attributes = True


class TemplateOut(BaseModel):
    sector_slug: str
    title: str
    description: str
    url: str
    tag: str

    class Config:
        from_attributes = True


class FAQOut(BaseModel):
    question: str
    answer: str

    class Config:
        from_attributes = True


class WorkOut(BaseModel):
    title: str
    category: str
    description: str
    url: str
    image_url: str

    class Config:
        from_attributes = True
