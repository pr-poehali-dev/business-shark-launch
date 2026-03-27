import { useState } from "react";
import Icon from "@/components/ui/icon";

const LEAD_URL = "https://functions.poehali.dev/9550900e-7add-4706-aae7-d00c99dd5413";

async function sendLead(data: { name: string; phone: string; subject?: string; message?: string }) {
  const res = await fetch(LEAD_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Ошибка отправки");
}

function useLeadForm(defaultSubject = "") {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState(defaultSubject);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await sendLead({ name, phone, subject, message });
      setStatus("ok");
      setName(""); setPhone(""); setMessage(""); setSubject(defaultSubject);
    } catch {
      setStatus("error");
    }
  };

  return { name, setName, phone, setPhone, message, setMessage, subject, setSubject, status, submit };
}

/* ─── Images ─────────────────────────────────────── */
const IMG_HERO = "https://cdn.poehali.dev/projects/65bdf58c-8e17-4143-8f6d-38982ea6a074/files/e3aa6448-ee60-434f-9452-670d3124f2bf.jpg";
const IMG_SIGN = "https://cdn.poehali.dev/projects/65bdf58c-8e17-4143-8f6d-38982ea6a074/files/576c3fc6-408a-4d1d-8360-e5db4a793bc7.jpg";
const IMG_DEAL = "https://cdn.poehali.dev/projects/65bdf58c-8e17-4143-8f6d-38982ea6a074/files/d4992b1d-d856-47e2-a01a-62ea12e7ca23.jpg";

/* ─── Contacts ────────────────────────────────────── */
const PHONE    = "+7 927 004 69 09";
const EMAIL    = "akula-business@yandex.ru";
const TELEGRAM = "t.me/nik0163";

/* ─── Banks ───────────────────────────────────────── */
const BANKS = [
  { name: "Сбер",      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Sber_Logo_2020.svg/320px-Sber_Logo_2020.svg.png",    color: "#21A038" },
  { name: "Альфа",     logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Alfa-Bank_logo_ru.svg/320px-Alfa-Bank_logo_ru.svg.png", color: "#EF3124" },
  { name: "ВТБ",       logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/VTB_Logo_2018.svg/320px-VTB_Logo_2018.svg.png",         color: "#009FDF" },
  { name: "ПСБ",       logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/PSB_logo_ru.svg/320px-PSB_logo_ru.svg.png",             color: "#005B9F" },
  { name: "Уралсиб",   logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Uralsib.svg/320px-Uralsib.svg.png",                     color: "#E31E24" },
  { name: "Ак Барс",   logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/AkBarsBank.svg/320px-AkBarsBank.svg.png",               color: "#006633" },
  { name: "Локо Банк", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Loko-Bank_logo.svg/320px-Loko-Bank_logo.svg.png",       color: "#003087" },
];

/* ═══════════════════════════════════════════════════
   MODAL
═══════════════════════════════════════════════════ */
function FeedbackModal({ onClose }: { onClose: () => void }) {
  const f = useLeadForm();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-border transition-colors">
          <Icon name="X" size={16} />
        </button>
        <div className="text-center mb-6">
          <div className="w-16 h-16 gradient-blue rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-glow">
            <span className="text-3xl">🦈</span>
          </div>
          <h3 className="text-xl font-bold text-foreground">Оставить заявку</h3>
          <p className="text-muted-foreground text-sm mt-1 font-golos">Свяжемся в течение 15 минут</p>
        </div>

        {f.status === "ok" ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-14 h-14 bg-accent/15 rounded-full flex items-center justify-center mx-auto">
              <Icon name="CheckCircle" size={32} className="text-accent" />
            </div>
            <p className="font-black text-foreground">Заявка отправлена!</p>
            <p className="text-sm text-muted-foreground font-golos">Свяжемся в течение 15 минут</p>
            <button onClick={onClose} className="mt-2 gradient-blue text-white font-bold px-6 py-2.5 rounded-2xl hover:opacity-90 transition-all">
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={f.submit} className="space-y-3">
            <input type="text" placeholder="Ваше имя" required value={f.name} onChange={(e) => f.setName(e.target.value)}
              className="w-full border border-border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all font-golos"
            />
            <input type="tel" placeholder="Телефон" required value={f.phone} onChange={(e) => f.setPhone(e.target.value)}
              className="w-full border border-border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all font-golos"
            />
            <textarea placeholder="Ваш вопрос (необязательно)" rows={3} value={f.message} onChange={(e) => f.setMessage(e.target.value)}
              className="w-full border border-border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none font-golos"
            />
            {f.status === "error" && <p className="text-sm text-red-500 font-golos">Ошибка отправки. Позвоните нам напрямую.</p>}
            <button type="submit" disabled={f.status === "loading"} className="w-full gradient-blue text-white font-bold py-3.5 rounded-2xl hover:opacity-90 transition-all hover:shadow-glow disabled:opacity-60">
              {f.status === "loading" ? "Отправляем..." : "Отправить заявку"}
            </button>
          </form>
        )}

        {f.status !== "ok" && (
          <p className="text-xs text-muted-foreground text-center mt-4 font-golos">
            Нажимая кнопку, вы соглашаетесь с{" "}
            <a href="#privacy" className="text-primary underline" onClick={onClose}>политикой конфиденциальности</a>
          </p>
        )}
      </div>
    </div>
  );
}

function FeedbackButton({ label = "Оставить заявку", className = "" }: { label?: string; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`gradient-blue text-white font-bold px-6 py-3 rounded-2xl hover:opacity-90 transition-all hover:scale-105 active:scale-100 shadow-md hover:shadow-glow ${className}`}
      >
        {label}
      </button>
      {open && <FeedbackModal onClose={() => setOpen(false)} />}
    </>
  );
}

/* ═══════════════════════════════════════════════════
   COOKIE BANNER
═══════════════════════════════════════════════════ */
function CookieBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-border shadow-xl py-4 px-6 flex flex-col sm:flex-row items-center gap-3">
      <div className="flex items-start gap-3 flex-1">
        <Icon name="Cookie" size={20} className="text-primary mt-0.5 shrink-0" />
        <p className="text-sm text-foreground font-golos">
          Мы используем файлы cookie.{" "}
          <a href="#privacy" className="text-primary underline">Политика конфиденциальности</a>
        </p>
      </div>
      <div className="flex gap-2 shrink-0">
        <button onClick={() => setVisible(false)} className="gradient-blue text-white text-sm font-bold px-5 py-2 rounded-xl hover:opacity-90">
          Принять
        </button>
        <button onClick={() => setVisible(false)} className="text-sm text-muted-foreground px-4 py-2 rounded-xl border border-border hover:bg-muted font-golos">
          Отказаться
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   HEADER
═══════════════════════════════════════════════════ */
const navLinks = [
  { label: "Главная",  href: "#home" },
  { label: "Услуги",   href: "#services" },
  { label: "Тарифы",   href: "#pricing" },
  { label: "О нас",    href: "#about" },
  { label: "FAQ",      href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [feedback, setFeedback] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-30 glass border-b border-white/40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="#home" className="flex items-center gap-2.5">
              <div className="w-9 h-9 gradient-blue rounded-xl flex items-center justify-center shadow-glow">
                <span className="text-lg">🦈</span>
              </div>
              <div className="leading-none">
                <div className="text-[13px] font-black text-foreground tracking-wide">АКУЛА</div>
                <div className="text-[11px] font-extrabold text-gradient tracking-widest">БИЗНЕСА</div>
              </div>
            </a>

            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href}
                  className="px-3 py-2 text-sm font-semibold text-foreground/70 hover:text-primary transition-colors rounded-xl hover:bg-secondary font-golos"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a href={`tel:${PHONE}`} className="hidden md:flex items-center gap-1.5 text-sm font-bold text-primary hover:opacity-80 transition-opacity">
                <Icon name="Phone" size={14} />{PHONE}
              </a>
              <button onClick={() => setFeedback(true)}
                className="hidden sm:block gradient-blue text-white text-sm font-bold px-4 py-2 rounded-xl hover:opacity-90 transition-all hover:scale-105 shadow-sm"
              >
                Заявка
              </button>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-xl hover:bg-muted transition-colors">
                <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div className="lg:hidden border-t border-border py-3 space-y-1">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm font-semibold text-foreground hover:text-primary hover:bg-secondary rounded-xl transition-colors font-golos"
                >
                  {l.label}
                </a>
              ))}
              <div className="pt-2 flex flex-col gap-2">
                <a href={`tel:${PHONE}`} className="flex items-center gap-2 text-primary font-bold px-3 py-2">
                  <Icon name="Phone" size={16} />{PHONE}
                </a>
                <button onClick={() => { setFeedback(true); setMobileOpen(false); }}
                  className="gradient-blue text-white font-bold text-sm py-2.5 rounded-xl mx-3"
                >
                  Оставить заявку
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
      {feedback && <FeedbackModal onClose={() => setFeedback(false)} />}
    </>
  );
}

/* ═══════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-grid">
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)" }} />

      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-7 animate-fade-up">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm font-bold text-primary shadow-sm">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Работаем по всей России
            </div>

            <h1 className="text-4xl md:text-5xl xl:text-[3.5rem] font-black text-foreground leading-[1.1]">
              Открой бизнес<br />
              <span className="text-gradient">без хлопот</span><br />
              и ошибок
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-md font-golos">
              Регистрация ИП и ООО под ключ. От выбора ОКВЭД до открытия счёта в банке — берём всё на себя.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <FeedbackButton label="🚀 Открыть бизнес бесплатно" className="text-base px-7 py-4 shadow-lg" />
              <a href="#about"
                className="flex items-center gap-2 glass text-foreground font-bold px-6 py-4 rounded-2xl border border-border hover:bg-white transition-all hover:scale-105 shadow-sm font-golos"
              >
                <Icon name="PlayCircle" size={18} className="text-primary" />
                Узнать подробнее
              </a>
            </div>

            <div className="flex flex-wrap gap-6 pt-2">
              {[
                { val: "7+",   label: "лет опыта" },
                { val: "300+", label: "ООО открыто" },
                { val: "500+", label: "ИП открыто" },
              ].map(({ val, label }) => (
                <div key={label}>
                  <div className="text-2xl font-black text-gradient">{val}</div>
                  <div className="text-xs text-muted-foreground font-golos">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end animate-fade-up animate-float" style={{ animationDelay: "0.15s" }}>
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl blur-3xl opacity-30"
                style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }} />
              <img
                src={IMG_HERO}
                alt="Акула бизнеса за ноутбуком"
                className="relative w-80 h-80 md:w-[420px] md:h-[420px] object-cover rounded-3xl shadow-2xl border border-white/30"
              />
              <div className="absolute -bottom-5 -left-5 glass rounded-2xl shadow-card-hover p-3 flex items-center gap-2.5 border border-white/50">
                <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
                  <Icon name="CheckCircle" size={22} className="text-accent" />
                </div>
                <div>
                  <div className="text-xs font-black text-foreground">Без отказов</div>
                  <div className="text-xs text-muted-foreground font-golos">от ФНС</div>
                </div>
              </div>
              <div className="absolute -top-5 -right-5 glass rounded-2xl shadow-card-hover p-3 flex items-center gap-2.5 border border-white/50">
                <div className="w-10 h-10 bg-primary/15 rounded-xl flex items-center justify-center">
                  <Icon name="Clock" size={22} className="text-primary" />
                </div>
                <div>
                  <div className="text-xs font-black text-foreground">3–5 дней</div>
                  <div className="text-xs text-muted-foreground font-golos">до открытия счёта</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SERVICES
═══════════════════════════════════════════════════ */
const services = [
  { icon: "FileText",    title: "Правильный выбор ОКВЭД",  desc: "Подберём оптимальные виды деятельности" },
  { icon: "Calculator", title: "Система налогообложения",  desc: "Выберем выгодный режим налогов" },
  { icon: "Building2",  title: "Юридический адрес",         desc: "Решим вопрос с адресом для ООО" },
  { icon: "Landmark",   title: "Открытие счёта в банке",   desc: "Работаем с 7 ведущими банками" },
  { icon: "Monitor",    title: "Торговое оборудование",     desc: "Подбор и обслуживание онлайн-касс" },
  { icon: "ShieldCheck",title: "Честный знак и ЕГАИС",     desc: "Подключим к системам маркировки" },
];

function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-xs font-black tracking-widest uppercase text-primary mb-3 block">Наши услуги</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Берём всё на себя</h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-golos">
            От выбора формы собственности до открытия счёта и подключения кассы
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {services.map(({ icon, title, desc }, i) => (
            <div key={title}
              className="gradient-card rounded-3xl p-6 border border-border shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1.5 group"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="w-12 h-12 gradient-blue rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-glow">
                <Icon name={icon} size={22} fallback="Star" className="text-white" />
              </div>
              <h3 className="font-black text-foreground mb-2 text-base">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-golos">{desc}</p>
            </div>
          ))}
        </div>

        {/* Банки с логотипами */}
        <div className="bg-gradient-to-br from-secondary to-white rounded-3xl p-8 border border-primary/10">
          <div className="text-center mb-8">
            <h3 className="text-xl font-black text-foreground mb-2">Работаем с банками-партнёрами</h3>
            <p className="text-sm text-muted-foreground font-golos">Откроем счёт в лучшем банке для вашего бизнеса</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-5">
            {BANKS.map(({ name, logo, color }) => (
              <div key={name} className="flex flex-col items-center gap-2 group cursor-default">
                <div className="w-24 h-14 bg-white rounded-2xl border border-border shadow-sm flex items-center justify-center px-3 py-2 group-hover:shadow-card-hover group-hover:border-primary/30 transition-all group-hover:scale-105">
                  <img
                    src={logo}
                    alt={name}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      const t = e.currentTarget as HTMLImageElement;
                      t.style.display = "none";
                      const p = t.parentElement;
                      if (p) {
                        const span = document.createElement("span");
                        span.style.cssText = `font-size:11px;font-weight:900;color:${color};text-align:center;line-height:1.2;font-family:Unbounded,sans-serif`;
                        span.textContent = name;
                        p.appendChild(span);
                      }
                    }}
                  />
                </div>
                <span className="text-xs font-bold text-muted-foreground">{name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <FeedbackButton label="Получить консультацию" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   PRICING
═══════════════════════════════════════════════════ */
const tariffs = [
  {
    name: "Базовый",      price: "Бесплатно",  highlight: false, tag: null,            emoji: "🎯",
    image: IMG_SIGN,
    features: ["Регистрация ИП или ООО", "Открытие расчётного счёта", "Выбор оптимального банка", "Консультация по налогам"],
    cta: "Начать бесплатно",
  },
  {
    name: "Стандарт",     price: "Договорная", highlight: true,  tag: "Популярный",    emoji: "⭐",
    image: IMG_HERO,
    features: ["Всё из тарифа Базовый", "Консультация по оборудованию", "Подбор онлайн-кассы (ФН, ОФД)", "Регистрация ККТ", "Обучение работе с кассой"],
    cta: "Узнать цену",
  },
  {
    name: "Расширенный",  price: "Договорная", highlight: false, tag: "Всё включено",  emoji: "🏆",
    image: IMG_DEAL,
    features: ["Всё из Базового и Стандарта", "Настройка ТО и ПО", "Честный знак и ЕГАИС", "Серверное оборудование", "Выезд специалиста"],
    cta: "Получить КП",
  },
];

function PricingSection() {
  return (
    <section id="pricing" className="py-20 gradient-hero bg-grid">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-xs font-black tracking-widest uppercase text-primary mb-3 block">Тарифы</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Выберите формат</h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-golos">От бесплатной регистрации до полного сопровождения</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tariffs.map(({ name, price, highlight, tag, emoji, image, features, cta }) => (
            <div key={name}
              className={`relative rounded-3xl overflow-hidden border transition-all hover:-translate-y-2 ${
                highlight
                  ? "border-primary shadow-2xl shadow-primary/25 scale-[1.03] z-10"
                  : "border-border shadow-card hover:shadow-card-hover bg-white"
              }`}
            >
              {tag && (
                <div className={`absolute top-4 right-4 z-10 text-xs font-black px-3 py-1 rounded-full ${
                  highlight ? "bg-white text-primary" : "gradient-blue text-white"
                }`}>
                  {tag}
                </div>
              )}
              <div className={`relative overflow-hidden h-48 ${highlight ? "gradient-dark" : "bg-muted"}`}>
                <img src={image} alt={name} className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
                <div className="absolute inset-0 flex items-end p-5">
                  <div>
                    <div className="text-3xl mb-1">{emoji}</div>
                    <div className={`text-sm font-bold font-golos ${highlight ? "text-white/70" : "text-foreground/60"}`}>{name}</div>
                    <div className={`text-2xl font-black ${highlight ? "text-white" : "text-foreground"}`}>{price}</div>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4 bg-white">
                <ul className="space-y-2.5">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-foreground font-golos">
                      <Icon name="CheckCircle" size={16} className="text-accent shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <FeedbackButton label={cta} className="w-full text-center" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-sm text-muted-foreground font-golos mb-3">Не знаете что выбрать?</p>
          <FeedbackButton label="Бесплатная консультация" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════════ */
const steps = [
  { num: "01", title: "Оставьте заявку",        desc: "На сайте — займёт 1 минуту" },
  { num: "02", title: "Бесплатная консультация", desc: "Созвонимся и ответим на все вопросы" },
  { num: "03", title: "Личная встреча",          desc: "Собираем документы, всё объясним" },
  { num: "04", title: "Регистрация в ФНС",       desc: "Подаём документы, следим за статусом" },
  { num: "05", title: "Открытие счёта",          desc: "В оптимальном для вас банке" },
];

function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <span className="text-xs font-black tracking-widest uppercase text-primary mb-3 block">О нас</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">Как всё начиналось</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed font-golos">
              <p>
                Меня зовут <strong className="text-foreground font-bold">Николай</strong>. Раньше я работал в IT,
                и ко мне часто приходили люди за электронной подписью, чтобы открыть фирму.
                Я увидел, что многим нужна не просто подпись, а помощь с самого начала.
              </p>
              <p>Так я начал открывать бизнес для других. Сейчас:</p>
              <div className="grid grid-cols-3 gap-4 py-4">
                {[{ val: "300+", label: "ООО открыто" }, { val: "500+", label: "ИП открыто" }, { val: "200+", label: "только за 2025" }].map(({ val, label }) => (
                  <div key={label} className="text-center bg-secondary rounded-2xl p-4 border border-primary/10">
                    <div className="text-2xl font-black text-gradient">{val}</div>
                    <div className="text-xs text-muted-foreground mt-1">{label}</div>
                  </div>
                ))}
              </div>
              <p>В штате: бухгалтеры, юристы и программисты.</p>
              <div className="flex items-start gap-3 bg-primary/5 border border-primary/15 rounded-2xl p-4">
                <Icon name="Info" size={16} className="text-primary shrink-0 mt-0.5" />
                <p className="text-sm">
                  <strong className="text-foreground">Честно:</strong> банки платят мне за привлечённых клиентов.
                  Для вас — бесплатная консультация, для меня — бонус.
                </p>
              </div>
            </div>
            <div className="mt-8 flex gap-4 flex-wrap">
              <FeedbackButton label="Познакомиться с Николаем" />
              <a href={`https://${TELEGRAM}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary font-bold text-sm border-2 border-primary px-5 py-3 rounded-2xl hover:bg-primary hover:text-white transition-all"
              >
                <Icon name="Send" size={16} />Telegram
              </a>
            </div>
          </div>

          <div>
            <div className="relative mb-8">
              <img src={IMG_DEAL} alt="Подписание договора" className="w-full h-64 object-cover rounded-3xl shadow-xl" />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-lg font-black">Бизнес под ключ!</div>
                <div className="text-sm font-golos opacity-80">от регистрации до первого клиента</div>
              </div>
            </div>
            <h3 className="text-xl font-black text-foreground mb-5">5 шагов к открытию</h3>
            <div className="space-y-3">
              {steps.map(({ num, title, desc }) => (
                <div key={num} className="flex items-start gap-4 rounded-2xl p-4 border border-border hover:border-primary/30 transition-colors group bg-white hover:shadow-card">
                  <div className="w-10 h-10 gradient-blue rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                    <span className="text-white font-black text-xs">{num}</span>
                  </div>
                  <div>
                    <div className="font-black text-foreground text-sm">{title}</div>
                    <div className="text-xs text-muted-foreground font-golos">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   WHY US — dark section
═══════════════════════════════════════════════════ */
const reasons = [
  { icon: "Award",     title: "7+ лет опыта",         desc: "Сотни успешных регистраций, знаем все нюансы ФНС" },
  { icon: "UserCheck", title: "Индивидуальный подход", desc: "К каждому клиенту — персональное внимание" },
  { icon: "FileX",     title: "Без ошибок",            desc: "Гарантируем правильное оформление с первого раза" },
  { icon: "Clock",     title: "Экономия времени",      desc: "Вы занимаетесь бизнесом, мы — бумагами" },
  { icon: "Briefcase", title: "Полный комплекс",       desc: "Бухгалтеры, юристы и программисты в одном месте" },
  { icon: "Handshake", title: "Прозрачность",          desc: "Работаем открыто, без скрытых платежей" },
];

function WhyUsSection() {
  return (
    <section className="py-20 gradient-dark noise">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-xs font-black tracking-widest uppercase text-cyan-400 mb-3 block">Почему мы</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Почему выбирают нас</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {reasons.map(({ icon, title, desc }) => (
            <div key={title} className="glass-dark rounded-2xl p-6 flex items-start gap-4 hover:border-primary/50 transition-all hover:-translate-y-1 group">
              <div className="w-11 h-11 gradient-blue rounded-xl flex items-center justify-center shrink-0 group-hover:shadow-glow transition-all">
                <Icon name={icon} size={20} fallback="Star" className="text-white" />
              </div>
              <div>
                <h3 className="font-black text-white mb-1">{title}</h3>
                <p className="text-sm text-white/60 font-golos">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden h-56 group">
            <img src={IMG_SIGN} alt="Документы" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5">
              <div className="text-white font-black">Документы без ошибок 📋</div>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden h-56 group">
            <img src={IMG_DEAL} alt="Сделка" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5">
              <div className="text-white font-black">Открываем счёт в банке 🏦</div>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <FeedbackButton label="Работать с нами" className="shadow-glow" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FAQ
═══════════════════════════════════════════════════ */
const faqs = [
  { q: "Сколько времени занимает регистрация ИП?", a: "Регистрация ИП через ФНС занимает 3 рабочих дня. Мы подготовим документы быстро — обычно встречаемся и подаём в течение 1–2 дней." },
  { q: "Нужно ли самому ходить в налоговую?", a: "Нет — мы берём на себя все визиты в МФЦ и ФНС. Вам нужно только подписать документы при встрече." },
  { q: "Какую систему налогообложения выбрать?", a: "Зависит от вида деятельности и оборота. Проведём консультацию и подберём оптимальный режим — УСН 6%, УСН 15%, патент или ОСНО." },
  { q: "Нужен ли юридический адрес для ООО?", a: "Да, обязателен. Помогаем решить этот вопрос — есть несколько вариантов оформления." },
  { q: "Почему регистрация бесплатная?", a: "Банки платят нам за привлечённых клиентов. Для вас — консультация и регистрация бесплатно, вы получаете счёт в проверенном банке." },
  { q: "Работаете ли в других городах?", a: "Да, дистанционно по всей России. Документы — курьером или по ЭДО. Выезд специалиста — по тарифу Расширенный." },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-14">
          <span className="text-xs font-black tracking-widest uppercase text-primary mb-3 block">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Частые вопросы</h2>
        </div>
        <div className="space-y-3">
          {faqs.map(({ q, a }, i) => (
            <div key={i} className={`rounded-2xl overflow-hidden border transition-all ${open === i ? "border-primary/40 shadow-card" : "border-border"}`}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-secondary/30 transition-colors"
              >
                <span className="font-black text-foreground pr-4 text-sm">{q}</span>
                <div className={`w-7 h-7 gradient-blue rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}>
                  <Icon name="ChevronDown" size={14} className="text-white" />
                </div>
              </button>
              {open === i && (
                <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4 bg-secondary/20 font-golos animate-fade-up">
                  {a}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <p className="text-muted-foreground text-sm mb-4 font-golos">Не нашли ответ?</p>
          <FeedbackButton label="Задать вопрос" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   CONTACTS
═══════════════════════════════════════════════════ */
function ContactsSection() {
  const f = useLeadForm();

  return (
    <section id="contacts" className="py-20 gradient-hero">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-14">
          <span className="text-xs font-black tracking-widest uppercase text-primary mb-3 block">Контакты</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Свяжитесь с нами</h2>
          <p className="text-muted-foreground font-golos">Ответим в течение 15 минут в рабочее время</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {[
              { icon: "Phone", label: "Телефон",  val: PHONE,      href: `tel:${PHONE}` },
              { icon: "Mail",  label: "Email",     val: EMAIL,      href: `mailto:${EMAIL}` },
              { icon: "Send",  label: "Telegram",  val: "@nik0163", href: `https://${TELEGRAM}` },
            ].map(({ icon, label, val, href }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-border shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all group"
              >
                <div className="w-11 h-11 gradient-blue rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                  <Icon name={icon} size={20} fallback="Link" className="text-white" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-golos">{label}</div>
                  <div className="font-black text-foreground">{val}</div>
                </div>
                <Icon name="ArrowRight" size={16} className="text-muted-foreground ml-auto group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
          <div className="bg-white rounded-3xl border border-border shadow-card p-7">
            <h3 className="font-black text-foreground mb-5">Оставьте заявку</h3>
            {f.status === "ok" ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 bg-accent/15 rounded-full flex items-center justify-center mx-auto">
                  <Icon name="CheckCircle" size={32} className="text-accent" />
                </div>
                <p className="font-black text-foreground">Заявка отправлена!</p>
                <p className="text-sm text-muted-foreground font-golos">Свяжемся в течение 15 минут</p>
              </div>
            ) : (
              <form onSubmit={f.submit} className="space-y-3">
              <input type="text" placeholder="Ваше имя" required value={f.name} onChange={(e) => f.setName(e.target.value)} className="w-full border border-border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all font-golos" />
              <input type="tel" placeholder="Телефон" required value={f.phone} onChange={(e) => f.setPhone(e.target.value)} className="w-full border border-border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all font-golos" />
              <select value={f.subject} onChange={(e) => f.setSubject(e.target.value)} className="w-full border border-border rounded-2xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all font-golos">
                <option value="">Что хотите открыть?</option>
                <option>ИП</option>
                <option>ООО</option>
                <option>Нужна консультация</option>
              </select>
              <textarea placeholder="Ваш вопрос (необязательно)" rows={3} value={f.message} onChange={(e) => f.setMessage(e.target.value)}
                className="w-full border border-border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none font-golos"
              />
              {f.status === "error" && <p className="text-sm text-red-500 font-golos">Ошибка. Позвоните нам напрямую.</p>}
              <button type="submit" disabled={f.status === "loading"} className="w-full gradient-blue text-white font-black py-3 rounded-2xl hover:opacity-90 transition-all hover:shadow-glow disabled:opacity-60">
                {f.status === "loading" ? "Отправляем..." : "Отправить заявку"}
              </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="gradient-dark text-white py-10 noise">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 gradient-blue rounded-xl flex items-center justify-center shadow-glow">
                <span className="text-xl">🦈</span>
              </div>
              <div>
                <div className="font-black text-lg leading-tight">АКУЛА БИЗНЕСА</div>
                <div className="text-xs text-white/50 font-golos">Регистрация ИП и ООО</div>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed font-golos">Ваш надёжный партнёр. Опыт 7+ лет, 800+ кейсов.</p>
          </div>
          <div>
            <h4 className="font-black text-white mb-4">Разделы</h4>
            <div className="space-y-2">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} className="block text-sm text-white/60 hover:text-white transition-colors font-golos">{l.label}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-black text-white mb-4">Контакты</h4>
            <div className="space-y-3">
              <a href={`tel:${PHONE}`} className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                <Icon name="Phone" size={14} className="text-cyan-400" />{PHONE}
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                <Icon name="Mail" size={14} className="text-cyan-400" />{EMAIL}
              </a>
              <a href={`https://${TELEGRAM}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                <Icon name="Send" size={14} className="text-cyan-400" />@nik0163
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <div className="font-golos">ИП Кожухов Николай Михайлович · ИНН 635006641870</div>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-white/70 transition-colors">Политика конфиденциальности</a>
            <span>© 2025 Акула Бизнеса</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════
   PRIVACY — сворачиваемая
═══════════════════════════════════════════════════ */
function PrivacySection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <section id="privacy" className="py-8 bg-muted/40 border-t border-border">
      <div className="container mx-auto px-4 max-w-3xl">
        <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between py-2 group">
          <h2 className="text-sm font-black text-foreground group-hover:text-primary transition-colors">
            Политика конфиденциальности
          </h2>
          <div className={`w-7 h-7 gradient-blue rounded-full flex items-center justify-center transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}>
            <Icon name="ChevronDown" size={14} className="text-white" />
          </div>
        </button>
        {expanded && (
          <div className="text-muted-foreground space-y-3 text-sm leading-relaxed font-golos pt-4 pb-2 border-t border-border mt-2 animate-fade-up">
            <p><strong className="text-foreground">Оператор:</strong> ИП Кожухов Николай Михайлович, ИНН 635006641870.</p>
            <p>Оставляя заявку, вы даёте согласие на обработку персональных данных (имя, телефон, email) в целях консультирования и оказания услуг.</p>
            <p>Мы не передаём данные третьим лицам без вашего согласия, за исключением случаев, предусмотренных законодательством РФ.</p>
            <p><strong className="text-foreground">Файлы cookie:</strong> используем технические cookie для корректной работы сайта. Данные не передаются третьим лицам.</p>
            <p>Отозвать согласие: <a href={`mailto:${EMAIL}`} className="text-primary">{EMAIL}</a></p>
            <p>Основание: ФЗ № 152-ФЗ «О персональных данных» от 27.07.2006.</p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE ROOT
═══════════════════════════════════════════════════ */
export default function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <PricingSection />
        <AboutSection />
        <WhyUsSection />
        <FAQSection />
        <ContactsSection />
      </main>
      <Footer />
      <PrivacySection />
      <CookieBanner />
    </div>
  );
}