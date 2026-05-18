if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('pageshow', () => {
  if (!window.location.hash) window.scrollTo(0, 0);
});

// NAV SCROLL
const nav = document.querySelector('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
  nav.classList.toggle('scrolled', window.scrollY > 50);
}

// HAMBURGER
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ACTIVE NAV LINK
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
  const href = link.getAttribute('href');
  link.classList.remove('active');
  if (!href?.startsWith('#') && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
    link.classList.add('active');
  }
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    const target = id && document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => a.classList.remove('active'));
    document.querySelectorAll(`.nav-links a[href="${id}"], .mobile-menu a[href="${id}"]`).forEach(a => a.classList.add('active'));
  });
});

// FADE IN OBSERVER
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// MENU CATEGORY FILTER (homepage)
document.querySelectorAll('.menu-cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.menu-cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    document.querySelectorAll('.menu-dish').forEach(card => {
      if (cat === 'all' || card.dataset.cat === cat) {
        card.classList.remove('is-hidden');
        setTimeout(() => card.style.opacity = '1', 40);
      } else {
        card.style.opacity = '0';
        setTimeout(() => card.classList.add('is-hidden'), 240);
      }
    });
  });
});

// LANGUAGE SWITCHER
const translations = {
  tr: {
    'brand.sub': 'Fine Dining · İstanbul',
    'nav.home': 'Ana Sayfa',
    'nav.menu': 'Menü',
    'nav.about': 'Hakkımızda',
    'nav.contact': 'İletişim',
    'nav.reserve': 'Rezervasyon',
    'hero.badge': "1997'den Bu Yana · İstanbul",
    'hero.title1': 'Lezzetin',
    'hero.title2': 'Sanatı',
    'hero.tagline': 'Türk mutfağının zenginliği, modern yorumuyla buluşuyor',
    'hero.menuCta': 'Menüyü Keşfet',
    'hero.reserveCta': 'Masa Rezervasyonu',
    'hero.scroll': 'Keşfet',
    'features.local.title': 'Taze & Yerel',
    'features.local.text': 'Günlük taze, yerel üreticilerden malzeme',
    'features.chef.title': 'Usta Şef',
    'features.chef.text': '20 yıllık deneyimli mutfak ekibi',
    'features.wine.title': 'Seçkin Şaraplar',
    'features.wine.text': 'Geniş Türk ve dünya şarap koleksiyonu',
    'features.award.title': 'Ödüllü Mutfak',
    'features.award.text': 'Gastronomi ödülü sahibi restoran',
    'about.label': 'Hikayemiz',
    'about.title1': "İstanbul'un",
    'about.title2': 'Kalbinden',
    'about.title3': 'Sofraya',
    'about.p1': "1997 yılında küçük bir aile restoranı olarak yola çıkan Ember & Gold, bugün İstanbul'un en seçkin fine dining adresleri arasında yer alıyor. Osmanlı mutfağının köklü geleneğini, modern gastronominin yaratıcı teknikleriyle harmanlıyoruz.",
    'about.p2': 'Her tabak, bir hikaye; her lokma, bir anı. Sezonluk malzemeleri yerel çiftçilerden, deniz ürünlerini günlük Boğaz’dan temin ederek sofranıza tazeliği ve dürüstlüğü getiriyoruz.',
    'about.stat1': 'Yıllık Deneyim',
    'about.stat2': 'Menüde Çeşit',
    'about.stat3': 'Mutlu Misafir',
    'about.cta': 'Daha Fazla Bilgi',
    'menu.label': 'Lezzetlerimiz',
    'menu.title1': 'İmza',
    'menu.title2': 'Seçkiler',
    'menu.intro': 'Şefimizin menüsü kısa, net ve mevsime göre değişir. Her tabak önce malzemeyi, sonra tekniği konuşturur.',
    'menu.filter.all': 'Tümü',
    'menu.filter.starters': 'Başlangıçlar',
    'menu.filter.mains': 'Ana Yemekler',
    'menu.filter.desserts': 'Tatlılar',
    'menu.signature.kicker': 'Şef Tadım Menüsü',
    'menu.signature.title': 'Boğaz Akşamı',
    'menu.signature.text': 'Meze seçkisi, yavaş pişmiş kuzu, taze deniz ürünü ve fıstıklı finalden oluşan dört aşamalı deneyim.',
    'menu.signature.meta': 'Kişi başı · 4 servis',
    'menu.tag.starter': 'Başlangıç',
    'menu.tag.main': 'Ana Yemek',
    'menu.tag.dessert': 'Tatlı',
    'menu.dish1.title': 'Mevsim Mezeleri',
    'menu.dish1.text': 'Günlük taze sebze, otlar ve zeytinyağlılarla hazırlanan 8 çeşit seçki.',
    'menu.dish2.title': 'Kuzu Tandır',
    'menu.dish2.text': '12 saat düşük ısıda pişmiş kuzu, köz sebzeler ve baharatlı jus.',
    'menu.dish3.title': 'Levrek Izgara',
    'menu.dish3.text': 'Günlük levrek, kapari-limon sos ve enginar eşliğiyle servis edilir.',
    'menu.dish4.title': 'Fıstıklı Baklava',
    'menu.dish4.text': 'Antep fıstığı, ince hamur ve kaymakla hazırlanan sıcak final.',
    'menu.cta': 'Tüm Menüyü Görüntüle',
    'gallery.label': 'Atmosfer',
    'gallery.title1': 'Mekânımızdan',
    'gallery.title2': 'Kareler',
    'testimonials.label': 'Misafirlerimiz',
    'testimonials.title1': 'Onların',
    'testimonials.title2': 'Gözünden',
    'reservation.label': 'Rezervasyon',
    'reservation.title1': 'Masanızı',
    'reservation.title2': 'Ayırtın',
    'reservation.sub': 'Özel anlarınız için yerinizi şimdiden hazırlayalım',
    'reservation.name': 'Adınız Soyadınız',
    'reservation.time': 'Saat',
    'reservation.people': 'Kişi Sayısı',
    'reservation.person1': '1 Kişi',
    'reservation.person2': '2 Kişi',
    'reservation.person34': '3-4 Kişi',
    'reservation.person56': '5-6 Kişi',
    'reservation.person78': '7-8 Kişi',
    'reservation.person8': '8+ Kişi',
    'reservation.submit': 'Rezervasyon Yap',
    'footer.quote': '"Lezzet, sevgiyle pişirildiğinde<br>bir sanat eserine dönüşür."',
    'footer.pages': 'Sayfalar',
    'footer.hours': 'Çalışma Saatleri',
    'footer.contact': 'İletişim',
    'footer.rights': '© 2024 Ember & Gold. Tüm hakları saklıdır.',
    'footer.privacy': 'Gizlilik Politikası',
    'footer.terms': 'Kullanım Koşulları',
    'toast.reservation': '✓ Rezervasyonunuz alındı! Sizi arayacağız.',
    'toast.contact': '✓ Mesajınız iletildi. En kısa sürede dönüş yapacağız.'
  },
  en: {
    'brand.sub': 'Fine Dining · Istanbul',
    'nav.home': 'Home',
    'nav.menu': 'Menu',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.reserve': 'Reservation',
    'hero.badge': 'Since 1997 · Istanbul',
    'hero.title1': 'The Art',
    'hero.title2': 'of Taste',
    'hero.tagline': 'The richness of Turkish cuisine meets a modern interpretation',
    'hero.menuCta': 'Explore Menu',
    'hero.reserveCta': 'Book a Table',
    'hero.scroll': 'Explore',
    'features.local.title': 'Fresh & Local',
    'features.local.text': 'Daily ingredients from trusted local producers',
    'features.chef.title': 'Master Chef',
    'features.chef.text': 'A kitchen team with 20 years of experience',
    'features.wine.title': 'Curated Wines',
    'features.wine.text': 'A wide Turkish and international wine collection',
    'features.award.title': 'Awarded Cuisine',
    'features.award.text': 'A restaurant recognized for gastronomy',
    'about.label': 'Our Story',
    'about.title1': 'From the',
    'about.title2': 'Heart',
    'about.title3': 'of Istanbul',
    'about.p1': 'Founded in 1997 as a small family restaurant, Ember & Gold is now one of Istanbul’s distinguished fine dining addresses. We blend the deep tradition of Ottoman cuisine with modern gastronomic technique.',
    'about.p2': 'Every plate carries a story. Seasonal produce comes from local farmers, and seafood arrives fresh from the Bosphorus.',
    'about.stat1': 'Years of Experience',
    'about.stat2': 'Menu Varieties',
    'about.stat3': 'Happy Guests',
    'about.cta': 'Learn More',
    'menu.label': 'Our Flavors',
    'menu.title1': 'Signature',
    'menu.title2': 'Selections',
    'menu.intro': 'Our chef’s menu is focused, seasonal, and refined. Each plate lets the ingredient speak first, then the technique.',
    'menu.filter.all': 'All',
    'menu.filter.starters': 'Starters',
    'menu.filter.mains': 'Mains',
    'menu.filter.desserts': 'Desserts',
    'menu.signature.kicker': 'Chef Tasting Menu',
    'menu.signature.title': 'Bosphorus Evening',
    'menu.signature.text': 'A four-course experience with mezze, slow-cooked lamb, fresh seafood, and a pistachio finale.',
    'menu.signature.meta': 'Per person · 4 courses',
    'menu.tag.starter': 'Starter',
    'menu.tag.main': 'Main',
    'menu.tag.dessert': 'Dessert',
    'menu.dish1.title': 'Seasonal Mezze',
    'menu.dish1.text': 'Eight daily selections prepared with fresh vegetables, herbs, and olive oil.',
    'menu.dish2.title': 'Slow Lamb Tandır',
    'menu.dish2.text': 'Lamb cooked low for 12 hours with roasted vegetables and spiced jus.',
    'menu.dish3.title': 'Grilled Sea Bass',
    'menu.dish3.text': 'Daily sea bass with caper-lemon sauce and artichoke.',
    'menu.dish4.title': 'Pistachio Baklava',
    'menu.dish4.text': 'A warm finale with Antep pistachio, delicate pastry, and clotted cream.',
    'menu.cta': 'View Full Menu',
    'gallery.label': 'Atmosphere',
    'gallery.title1': 'Moments from',
    'gallery.title2': 'Our Space',
    'testimonials.label': 'Guests',
    'testimonials.title1': 'In Their',
    'testimonials.title2': 'Words',
    'reservation.label': 'Reservation',
    'reservation.title1': 'Reserve',
    'reservation.title2': 'Your Table',
    'reservation.sub': 'Let us prepare your table for a memorable evening',
    'reservation.name': 'Full Name',
    'reservation.time': 'Time',
    'reservation.people': 'Guests',
    'reservation.person1': '1 Guest',
    'reservation.person2': '2 Guests',
    'reservation.person34': '3-4 Guests',
    'reservation.person56': '5-6 Guests',
    'reservation.person78': '7-8 Guests',
    'reservation.person8': '8+ Guests',
    'reservation.submit': 'Book Now',
    'footer.quote': '"When flavor is cooked with care,<br>it becomes a work of art."',
    'footer.pages': 'Pages',
    'footer.hours': 'Opening Hours',
    'footer.contact': 'Contact',
    'footer.rights': '© 2024 Ember & Gold. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',
    'toast.reservation': '✓ Your reservation has been received. We will call you.',
    'toast.contact': '✓ Your message has been sent. We will get back to you shortly.'
  },
  ru: {
    'brand.sub': 'Fine Dining · Стамбул',
    'nav.home': 'Главная',
    'nav.menu': 'Меню',
    'nav.about': 'О нас',
    'nav.contact': 'Контакты',
    'nav.reserve': 'Бронь',
    'hero.badge': 'С 1997 года · Стамбул',
    'hero.title1': 'Искусство',
    'hero.title2': 'вкуса',
    'hero.tagline': 'Богатство турецкой кухни в современном прочтении',
    'hero.menuCta': 'Смотреть меню',
    'hero.reserveCta': 'Забронировать стол',
    'hero.scroll': 'Смотреть',
    'features.local.title': 'Свежее и местное',
    'features.local.text': 'Ежедневные продукты от местных производителей',
    'features.chef.title': 'Шеф-повар',
    'features.chef.text': 'Кухня с опытом более 20 лет',
    'features.wine.title': 'Избранные вина',
    'features.wine.text': 'Широкая коллекция турецких и мировых вин',
    'features.award.title': 'Отмеченная кухня',
    'features.award.text': 'Ресторан с гастрономическим признанием',
    'about.label': 'Наша история',
    'about.title1': 'Из сердца',
    'about.title2': 'Стамбула',
    'about.title3': 'к столу',
    'about.p1': 'Ember & Gold начался в 1997 году как небольшой семейный ресторан, а сегодня стал одним из изысканных адресов Стамбула. Мы соединяем традиции османской кухни с современной гастрономией.',
    'about.p2': 'Каждое блюдо рассказывает историю. Сезонные продукты мы берем у местных фермеров, а морепродукты ежедневно поступают с Босфора.',
    'about.stat1': 'Лет опыта',
    'about.stat2': 'Позиций в меню',
    'about.stat3': 'Довольных гостей',
    'about.cta': 'Подробнее',
    'menu.label': 'Наши вкусы',
    'menu.title1': 'Фирменные',
    'menu.title2': 'блюда',
    'menu.intro': 'Меню шефа лаконичное, сезонное и продуманное. Сначала говорит продукт, затем техника.',
    'menu.filter.all': 'Все',
    'menu.filter.starters': 'Закуски',
    'menu.filter.mains': 'Основные',
    'menu.filter.desserts': 'Десерты',
    'menu.signature.kicker': 'Дегустационное меню',
    'menu.signature.title': 'Вечер на Босфоре',
    'menu.signature.text': 'Четыре подачи: мезе, томленая баранина, свежая рыба и фисташковый финал.',
    'menu.signature.meta': 'На человека · 4 подачи',
    'menu.tag.starter': 'Закуска',
    'menu.tag.main': 'Основное',
    'menu.tag.dessert': 'Десерт',
    'menu.dish1.title': 'Сезонные мезе',
    'menu.dish1.text': 'Восемь свежих закусок с овощами, травами и оливковым маслом.',
    'menu.dish2.title': 'Баранина тандыр',
    'menu.dish2.text': 'Баранина, томленная 12 часов, с печеными овощами и пряным соусом.',
    'menu.dish3.title': 'Сибас на гриле',
    'menu.dish3.text': 'Свежий сибас с лимонно-каперсовым соусом и артишоком.',
    'menu.dish4.title': 'Фисташковая пахлава',
    'menu.dish4.text': 'Теплый десерт с фисташкой, тонким тестом и каймаком.',
    'menu.cta': 'Полное меню',
    'gallery.label': 'Атмосфера',
    'gallery.title1': 'Кадры',
    'gallery.title2': 'ресторана',
    'testimonials.label': 'Гости',
    'testimonials.title1': 'Их',
    'testimonials.title2': 'отзывы',
    'reservation.label': 'Бронирование',
    'reservation.title1': 'Забронируйте',
    'reservation.title2': 'стол',
    'reservation.sub': 'Мы подготовим ваш стол для особенного вечера',
    'reservation.name': 'Имя и фамилия',
    'reservation.time': 'Время',
    'reservation.people': 'Гости',
    'reservation.person1': '1 гость',
    'reservation.person2': '2 гостя',
    'reservation.person34': '3-4 гостя',
    'reservation.person56': '5-6 гостей',
    'reservation.person78': '7-8 гостей',
    'reservation.person8': '8+ гостей',
    'reservation.submit': 'Забронировать',
    'footer.quote': '"Когда вкус готовят с заботой,<br>он становится искусством."',
    'footer.pages': 'Страницы',
    'footer.hours': 'Часы работы',
    'footer.contact': 'Контакты',
    'footer.rights': '© 2024 Ember & Gold. Все права защищены.',
    'footer.privacy': 'Политика конфиденциальности',
    'footer.terms': 'Условия использования',
    'toast.reservation': '✓ Ваша бронь принята. Мы свяжемся с вами.',
    'toast.contact': '✓ Ваше сообщение отправлено. Мы скоро ответим.'
  }
};

let activeLang = localStorage.getItem('emberLang') || 'tr';
function translatePage(lang) {
  activeLang = translations[lang] ? lang : 'tr';
  localStorage.setItem('emberLang', activeLang);
  document.documentElement.lang = activeLang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const value = translations[activeLang][key];
    if (value) el.innerHTML = value;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    const value = translations[activeLang][key];
    if (value) el.setAttribute('placeholder', value);
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === activeLang);
  });
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => translatePage(btn.dataset.lang));
});
translatePage(activeLang);

// MENU PAGE TABS
document.querySelectorAll('.menu-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.menu-items-list').forEach(l => l.classList.remove('active'));
    tab.classList.add('active');
    const target = document.getElementById(tab.dataset.tab);
    if (target) target.classList.add('active');
  });
});

// RESERVATION FORM
const resForm = document.querySelector('.reservation-form');
if (resForm) {
  resForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast(translations[activeLang]['toast.reservation']);
    resForm.reset();
  });
}

// CONTACT FORM
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast(translations[activeLang]['toast.contact']);
    contactForm.reset();
  });
}

// TOAST
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// GALLERY LIGHTBOX
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (!img) return;
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:9999;
      display:flex;align-items:center;justify-content:center;cursor:pointer;
      animation:fadeInDown .3s ease;
    `;
    const bigImg = document.createElement('img');
    bigImg.src = img.src.replace('w=400', 'w=1200').replace('w=500', 'w=1200');
    bigImg.style.cssText = 'max-width:90vw;max-height:85vh;object-fit:contain;';
    const close = document.createElement('button');
    close.innerHTML = '✕';
    close.style.cssText = `
      position:absolute;top:25px;right:30px;background:none;border:none;
      color:#fff;font-size:1.5rem;cursor:pointer;opacity:.6;
    `;
    overlay.appendChild(bigImg);
    overlay.appendChild(close);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    const destroy = () => { overlay.remove(); document.body.style.overflow = ''; };
    overlay.addEventListener('click', destroy);
    close.addEventListener('click', destroy);
  });
});

// COUNTER ANIMATION
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current) + (el.dataset.suffix || '');
  }, 16);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
const statsSection = document.querySelector('.about-stats');
if (statsSection) counterObserver.observe(statsSection);
