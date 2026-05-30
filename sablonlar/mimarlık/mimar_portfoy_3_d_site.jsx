import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  ChevronRight,
  Layers3,
  MapPin,
  Menu,
  MousePointer2,
  X,
} from "lucide-react";

const projectData = [
  {
    id: 1,
    title: "Bosphorus House",
    category: "Dış Mekân",
    scope: "Mimari Tasarım",
    location: "İstanbul",
    year: "2026",
    area: "840 m²",
    cover:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90",
    detail:
      "Boğaz hattına bakan güçlü yatay kütleler, kontrollü açıklıklar ve doğal taş cephe diliyle sakin ama etkileyici bir konut yapısı.",
  },
  {
    id: 2,
    title: "Luma Residence Interior",
    category: "İç Mekân",
    scope: "İç Mimari",
    location: "Ankara",
    year: "2025",
    area: "320 m²",
    cover:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=90",
    detail:
      "Taş, ahşap, tekstil ve ışık katmanlarıyla kurulan sıcak, sessiz ve rafine bir yaşam atmosferi.",
  },
  {
    id: 3,
    title: "Mono Office",
    category: "Dış Mekân",
    scope: "Ofis Yapısı",
    location: "İzmir",
    year: "2025",
    area: "1.280 m²",
    cover:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=90",
    detail:
      "Kurumsal duruşu güçlü, yalın geometriye sahip, gün ışığı ve kullanıcı akışını merkeze alan çağdaş ofis yapısı.",
  },
  {
    id: 4,
    title: "Atelier Villa",
    category: "İç Mekân",
    scope: "Villa İç Mekânı",
    location: "Bodrum",
    year: "2024",
    area: "460 m²",
    cover:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=90",
    detail:
      "Akdeniz dokusunu çağdaş detaylarla buluşturan; dingin, ölçülü ve malzeme kalitesi yüksek bir iç mekân kurgusu.",
  },
  {
    id: 5,
    title: "Stone Retreat",
    category: "Dış Mekân",
    scope: "Butik Otel",
    location: "Kapadokya",
    year: "2024",
    area: "2.100 m²",
    cover:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1800&q=90",
    detail:
      "Topoğrafya, yerel taş ve gölgeli geçişler üzerinden kurulan; çevreyle sessizce bütünleşen butik konaklama yapısı.",
  },
];

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=90",
    label: "Salon / Malzeme Atmosferi",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1800&q=90",
    label: "Cephe / Gün Işığı",
  },
  {
    src: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1800&q=90",
    label: "Yaşam Alanı",
  },
  {
    src: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1800&q=90",
    label: "İç Mekân Detayı",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=90",
    label: "Dış Mekân Kompozisyonu",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=90",
    label: "Modern Konut",
  },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Projeler", "#projeler"],
    ["Galeri", "#galeri"],
    ["Yaklaşım", "#yaklasim"],
    ["İletişim", "#iletisim"],
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#11100d]/55 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 md:px-10">
          <a href="#" className="group flex items-center gap-3 text-white">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.06] transition group-hover:bg-white group-hover:text-black">
              <Building2 size={19} />
            </span>
            <span className="leading-none">
              <span className="block text-[11px] uppercase tracking-[0.42em] text-white/45">Studio</span>
              <span className="mt-1 block text-lg font-semibold tracking-[-0.03em]">Maison Arka</span>
            </span>
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {links.map(([label, href]) => (
              <a key={label} href={href} className="text-sm text-white/62 transition hover:text-white">
                {label}
              </a>
            ))}
          </nav>

          <a
            href="#iletisim"
            className="hidden rounded-full border border-white/15 bg-white px-5 py-2.5 text-sm font-medium text-[#15120e] transition hover:bg-[#d7c4a1] md:inline-flex"
          >
            Proje Görüşmesi
          </a>

          <button onClick={() => setOpen(true)} className="rounded-full border border-white/15 p-2.5 text-white md:hidden">
            <Menu size={21} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-[#11100d]/95 p-6 text-white backdrop-blur-2xl md:hidden"
          >
            <div className="flex justify-end">
              <button onClick={() => setOpen(false)} className="rounded-full border border-white/15 p-3">
                <X />
              </button>
            </div>
            <div className="mt-20 grid gap-7">
              {links.map(([label, href]) => (
                <a key={label} href={href} onClick={() => setOpen(false)} className="text-4xl font-semibold tracking-[-0.05em]">
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#11100d] text-white">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=90"
          alt="Premium mimari dış mekân"
          className="h-full w-full scale-[1.03] object-cover"
        />
        <div className="absolute inset-0 bg-[#11100d]/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#11100d]/90 via-[#11100d]/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#11100d] via-transparent to-[#11100d]/45" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-[1500px] items-end px-5 pb-16 pt-32 md:px-10 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="max-w-5xl"
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-sm text-white/70 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-[#d7c4a1]" />
            Interior · Exterior · Spatial Design
          </div>

          <h1 className="max-w-5xl text-[52px] font-semibold leading-[0.9] tracking-[-0.075em] md:text-[92px] lg:text-[118px]">
            Mekânsal şıklığı sessiz bir lükse dönüştüren mimarlık.
          </h1>

          <div className="mt-8 grid max-w-4xl gap-7 md:grid-cols-[1fr_.7fr] md:items-end">
            <p className="text-base leading-8 text-white/66 md:text-lg">
              Maison Arka; iç mekân, dış mekân ve seçilmiş konut projelerinde malzeme, ışık, oran ve atmosferi aynı tasarım dili içinde birleştirir.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <a href="#projeler" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-[#11100d] transition hover:bg-[#d7c4a1]">
                Seçilmiş Projeler <ChevronRight size={17} />
              </a>
              <a href="#galeri" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.07] px-6 py-3.5 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-white/12">
                Galeri
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-5 hidden items-center gap-3 text-xs uppercase tracking-[0.28em] text-white/42 md:left-10 md:flex">
        <MousePointer2 size={15} /> Scroll
      </div>

      <div className="absolute bottom-6 right-5 hidden max-w-sm rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 backdrop-blur-2xl md:right-10 md:block">
        <div className="text-sm uppercase tracking-[0.28em] text-white/38">Selected</div>
        <div className="mt-3 text-xl font-medium">Residential & Interior Projects</div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="bg-[#f2ece2] px-5 py-24 text-[#17130f] md:px-10">
      <div className="mx-auto grid max-w-[1500px] gap-10 md:grid-cols-[.75fr_1.25fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.38em] text-[#9b7f55]">Tasarım dili</p>
        </div>
        <div>
          <h2 className="max-w-5xl text-4xl font-semibold leading-[1.02] tracking-[-0.055em] md:text-6xl lg:text-7xl">
            Gösterişli efektler yerine; ışık, boşluk, malzeme ve oranla kurulan kalıcı bir atmosfer.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ["01", "Oran", "Plan, cephe ve iç mekân kararları aynı geometrik sakinlikle kurgulanır."],
              ["02", "Malzeme", "Taş, ahşap, cam, metal ve tekstil; yapay bir süs değil, mekânın karakteridir."],
              ["03", "Atmosfer", "Işık, gölge, geçiş ve dokular; kullanıcının mekânı hissetme biçimini belirler."],
            ].map(([no, title, text]) => (
              <div key={no} className="border-t border-black/12 pt-5">
                <div className="text-sm text-black/38">{no}</div>
                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.035em]">{title}</h3>
                <p className="mt-4 leading-7 text-black/58">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectShowcase() {
  const [filter, setFilter] = useState("Tümü");
  const [activeId, setActiveId] = useState(projectData[0].id);

  const filtered = useMemo(() => {
    if (filter === "Tümü") return projectData;
    return projectData.filter((project) => project.category === filter);
  }, [filter]);

  const activeProject = projectData.find((project) => project.id === activeId) || filtered[0];

  function changeFilter(nextFilter) {
    setFilter(nextFilter);
    const nextProject = nextFilter === "Tümü" ? projectData[0] : projectData.find((project) => project.category === nextFilter);
    if (nextProject) setActiveId(nextProject.id);
  }

  return (
    <section id="projeler" className="bg-[#11100d] px-5 py-24 text-white md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-12 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.38em] text-[#d7c4a1]">Seçilmiş projeler</p>
            <h2 className="max-w-5xl text-4xl font-semibold leading-[1.02] tracking-[-0.055em] md:text-6xl lg:text-7xl">
              İç mekân ve dış mekânı aynı mimari sakinlikle anlatan portföy.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {["Tümü", "İç Mekân", "Dış Mekân"].map((item) => (
              <button
                key={item}
                onClick={() => changeFilter(item)}
                className={cn(
                  "rounded-full px-5 py-2.5 text-sm font-medium transition",
                  filter === item
                    ? "bg-white text-[#11100d]"
                    : "border border-white/12 bg-white/[0.05] text-white/68 hover:bg-white/10 hover:text-white"
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-7 lg:grid-cols-[.86fr_1.14fr]">
          <div className="grid gap-4">
            {filtered.map((project) => (
              <button
                key={project.id}
                onClick={() => setActiveId(project.id)}
                className={cn(
                  "group rounded-[2rem] border p-5 text-left transition duration-300",
                  activeProject.id === project.id
                    ? "border-white/20 bg-white text-[#11100d]"
                    : "border-white/10 bg-white/[0.045] text-white hover:bg-white/[0.08]"
                )}
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="text-sm uppercase tracking-[0.25em] opacity-45">{project.category}</div>
                    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] md:text-3xl">{project.title}</h3>
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm opacity-58">
                      <span>{project.location}</span>
                      <span>{project.year}</span>
                      <span>{project.area}</span>
                    </div>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-current/15 transition group-hover:rotate-[-18deg]">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.article
              key={activeProject.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.42, ease: "easeOut" }}
              className="overflow-hidden rounded-[2.6rem] border border-white/10 bg-white/[0.04] shadow-2xl"
            >
              <div className="relative h-[690px] overflow-hidden">
                <img src={activeProject.cover} alt={activeProject.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute left-6 right-6 top-6 flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full border border-white/15 bg-black/25 px-4 py-2 text-sm text-white backdrop-blur-xl">{activeProject.scope}</span>
                  <span className="rounded-full border border-white/15 bg-black/25 px-4 py-2 text-sm text-white backdrop-blur-xl">{activeProject.category}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-xl">
                    <MapPin size={15} /> {activeProject.location}
                  </div>
                  <h3 className="max-w-3xl text-4xl font-semibold tracking-[-0.055em] text-white md:text-6xl">{activeProject.title}</h3>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-white/68">{activeProject.detail}</p>
                  <div className="mt-7 grid gap-3 rounded-[1.8rem] border border-white/10 bg-white/10 p-4 backdrop-blur-2xl sm:grid-cols-4">
                    {[
                      ["Lokasyon", activeProject.location],
                      ["Yıl", activeProject.year],
                      ["Alan", activeProject.area],
                      ["Kapsam", activeProject.scope],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <div className="text-[11px] uppercase tracking-[0.24em] text-white/38">{label}</div>
                        <div className="mt-2 text-sm font-medium text-white">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function SpatialGallery() {
  const [active, setActive] = useState(null);

  return (
    <section id="galeri" className="bg-[#f2ece2] px-5 py-24 text-[#17130f] md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-12 grid gap-8 md:grid-cols-[.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.38em] text-[#9b7f55]">Mekânsal arşiv</p>
            <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.055em] md:text-6xl lg:text-7xl">
              Görsel kalitesiyle konuşan, sakin bir galeri deneyimi.
            </h2>
          </div>
          <p className="max-w-xl justify-self-start text-base leading-8 text-black/58 md:justify-self-end">
            Grid yapısı, render veya fotoğrafları sadece listelemek yerine mekânlar arasında editoryal bir geçiş oluşturur. Görseller tam ekran açılır.
          </p>
        </div>

        <div className="grid auto-rows-[250px] grid-cols-1 gap-5 md:grid-cols-6">
          {galleryImages.map((item, index) => (
            <button
              key={item.src}
              onClick={() => setActive(item)}
              className={cn(
                "group relative overflow-hidden rounded-[2rem] bg-[#17130f] text-left shadow-sm",
                index === 0 && "md:col-span-3 md:row-span-2",
                index === 1 && "md:col-span-3",
                index === 2 && "md:col-span-2",
                index === 3 && "md:col-span-2",
                index === 4 && "md:col-span-2 md:row-span-2",
                index === 5 && "md:col-span-4"
              )}
            >
              <img src={item.src} alt={item.label} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent opacity-80" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white">
                <div>
                  <div className="text-xs uppercase tracking-[0.25em] text-white/45">Archive</div>
                  <div className="mt-2 text-lg font-medium">{item.label}</div>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 opacity-0 backdrop-blur-xl transition group-hover:opacity-100">
                  <ArrowUpRight size={17} />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] grid place-items-center bg-[#090806]/95 p-4 backdrop-blur-xl"
          >
            <button onClick={() => setActive(null)} className="absolute right-5 top-5 rounded-full border border-white/15 bg-white/10 p-3 text-white backdrop-blur-xl">
              <X />
            </button>
            <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }} className="w-full max-w-7xl">
              <img src={active.src} alt={active.label} className="max-h-[84vh] w-full rounded-[2rem] object-contain shadow-2xl" />
              <div className="mt-4 text-center text-white/68">{active.label}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Approach() {
  const services = [
    ["Mimari Tasarım", "Konut, ofis, butik otel ve özel yapı projelerinde konseptten uygulama detayına uzanan tasarım süreci."],
    ["İç Mimari", "Mobilya, malzeme, ışık, tekstil ve atmosfer kararlarını aynı bütün içinde ele alan mekân tasarımı."],
    ["3D Görselleştirme", "Projeyi abartılı efektlerle değil; doğru ışık, kamera ve malzeme diliyle ikna edici şekilde sunma."],
    ["Uygulama Danışmanlığı", "Şantiye koordinasyonu, detay çözümü, üretici iletişimi ve tasarım kalitesinin korunması."],
  ];

  return (
    <section id="yaklasim" className="bg-[#11100d] px-5 py-24 text-white md:px-10">
      <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[.92fr_1.08fr] lg:items-center">
        <div className="relative min-h-[700px] overflow-hidden rounded-[2.8rem] border border-white/10 bg-white/[0.04]">
          <img
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=90"
            alt="Mimarlık stüdyosu"
            className="absolute inset-0 h-full w-full object-cover opacity-88"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />
          <div className="absolute bottom-7 left-7 right-7 rounded-[2rem] border border-white/12 bg-white/10 p-6 backdrop-blur-2xl">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-[#11100d]">
                <Layers3 size={20} />
              </span>
              <div>
                <div className="text-xl font-semibold tracking-[-0.035em]">Bütüncül stüdyo yaklaşımı</div>
                <p className="mt-2 leading-7 text-white/62">Dış cepheden iç mekâna, malzemeden kullanıcı deneyimine kadar tek bir tasarım dili.</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.38em] text-[#d7c4a1]">Yaklaşım</p>
          <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.055em] md:text-6xl lg:text-7xl">
            İçeride atmosfer, dışarıda karakter.
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/62">
            Profesyonel mimarlık sitesi; çok fazla efektle değil, güven veren bir portföy diliyle çalışır. Bu tasarımda mekânı öne çıkaran büyük görseller, sakin animasyonlar, doğru kontrast ve güçlü boşluk kullanımı tercih edildi.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {services.map(([title, text]) => (
              <div key={title} className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 transition hover:bg-white/[0.085]">
                <h3 className="text-xl font-semibold tracking-[-0.035em]">{title}</h3>
                <p className="mt-4 leading-7 text-white/55">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="iletisim" className="bg-[#f2ece2] px-5 py-24 text-[#17130f] md:px-10">
      <div className="mx-auto max-w-[1500px] overflow-hidden rounded-[3rem] bg-[#17130f] text-white shadow-2xl">
        <div className="grid min-h-[620px] lg:grid-cols-[1.05fr_.95fr]">
          <div className="p-8 md:p-12 lg:p-16">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.38em] text-[#d7c4a1]">İletişim</p>
            <h2 className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.055em] md:text-6xl lg:text-7xl">
              Yeni projenizi sade, güçlü ve kalıcı bir mimari dile çevirelim.
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/62">
              Form alanı gerçek projede e-posta, CRM, WhatsApp veya randevu sistemiyle entegre edilebilir. Premium stüdyo hissi için kısa, net ve güven veren bir iletişim akışı kullanıldı.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {[
                ["E-posta", "hello@maisonarka.com"],
                ["Ofis", "İstanbul / Türkiye"],
                ["Uzmanlık", "Interior & Exterior"],
              ].map(([label, value]) => (
                <div key={label} className="border-t border-white/12 pt-5">
                  <div className="text-xs uppercase tracking-[0.25em] text-white/38">{label}</div>
                  <div className="mt-3 text-sm text-white/78">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 text-[#17130f] md:p-8 lg:p-10">
            <form className="flex h-full flex-col justify-center gap-4 rounded-[2.4rem] bg-[#f2ece2] p-5 md:p-8">
              <div className="mb-2 text-2xl font-semibold tracking-[-0.04em]">Proje bilgisi alın</div>
              <input className="rounded-2xl border border-black/10 bg-white px-5 py-4 outline-none transition focus:border-black/45" placeholder="Ad Soyad" />
              <input className="rounded-2xl border border-black/10 bg-white px-5 py-4 outline-none transition focus:border-black/45" placeholder="E-posta" />
              <select className="rounded-2xl border border-black/10 bg-white px-5 py-4 outline-none transition focus:border-black/45">
                <option>Proje türü</option>
                <option>İç Mekân</option>
                <option>Dış Mekân</option>
                <option>Konut</option>
                <option>Ofis / Ticari</option>
              </select>
              <textarea className="min-h-36 rounded-2xl border border-black/10 bg-white px-5 py-4 outline-none transition focus:border-black/45" placeholder="Projenizi kısaca anlatın" />
              <button type="button" className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#17130f] px-6 py-4 font-medium text-white transition hover:bg-[#9b7f55]">
                Mesaj Gönder <ArrowUpRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#11100d] px-5 py-8 text-white/46 md:px-10">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
        <div>Maison Arka — Architecture, Interior & Spatial Design</div>
        <div>© 2026 · Premium Architecture Portfolio</div>
      </div>
    </footer>
  );
}

export default function ArchitectPortfolioSite() {
  return (
    <main className="min-h-screen bg-[#11100d] font-sans selection:bg-[#d7c4a1] selection:text-[#11100d]">
      <Navigation />
      <Hero />
      <Manifesto />
      <ProjectShowcase />
      <SpatialGallery />
      <Approach />
      <Contact />
      <Footer />
    </main>
  );
}
