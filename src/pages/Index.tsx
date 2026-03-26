import { useState } from "react";
import Icon from "@/components/ui/icon";

const SHARK_HERO = "https://cdn.poehali.dev/projects/65bdf58c-8e17-4143-8f6d-38982ea6a074/files/eb8527bf-adca-4ce6-b70a-c556cf73e0f6.jpg";
const SHARK_DOCS = "https://cdn.poehali.dev/projects/65bdf58c-8e17-4143-8f6d-38982ea6a074/files/ac176628-e20a-4011-b8f2-f3dc0c69e2d4.jpg";
const SHARK_TARIFF = "https://cdn.poehali.dev/projects/65bdf58c-8e17-4143-8f6d-38982ea6a074/files/9629f54f-1657-4a0e-a758-bf9a600943c2.jpg";

const PHONE = "+7 927 004 69 09";
const EMAIL = "akula-business@yandex.ru";
const TELEGRAM = "t.me/nik0163";

function FeedbackModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Icon name="X" size={20} />
        </button>
        <div className="text-center mb-6">
          <div className="w-14 h-14 gradient-blue rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="MessageCircle" size={26} className="text-white" />
          </div>
          <h3 className="text-xl font-bold font-montserrat text-foreground">Обратная связь</h3>
          <p className="text-muted-foreground text-sm mt-1">Свяжемся в течение 15 минут</p>
        </div>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Ваше имя"
            className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
          <input
            type="tel"
            placeholder="Телефон"
            className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
          <textarea
            placeholder="Ваш вопрос (необязательно)"
            rows={3}
            className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
          />
          <button className="w-full gradient-blue text-white font-semibold font-montserrat py-3 rounded-xl hover:opacity-90 transition-opacity">
            Отправить заявку
          </button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-4">
          Нажимая кнопку, вы соглашаетесь с{" "}
          <a href="#privacy" className="text-primary underline">политикой конфиденциальности</a>
        </p>
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
        className={`gradient-blue text-white font-semibold font-montserrat px-6 py-3 rounded-xl hover:opacity-90 transition-all hover:scale-105 active:scale-100 shadow-md ${className}`}
      >
        {label}
      </button>
      {open && <FeedbackModal onClose={() => setOpen(false)} />}
    </>
  );
}

function CookieBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border shadow-lg py-4 px-6 flex flex-col sm:flex-row items-center gap-3">
      <div className="flex items-start gap-3 flex-1">
        <Icon name="Cookie" size={20} className="text-primary mt-0.5 shrink-0" />
        <p className="text-sm text-foreground">
          Мы используем файлы cookie для улучшения работы сайта. Продолжая использовать сайт, вы соглашаетесь с нашей{" "}
          <a href="#privacy" className="text-primary underline">политикой конфиденциальности</a>.
        </p>
      </div>
      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => setVisible(false)}
          className="gradient-blue text-white text-sm font-semibold px-5 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          Принять
        </button>
        <button
          onClick={() => setVisible(false)}
          className="text-sm text-muted-foreground px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
        >
          Отказаться
        </button>
      </div>
    </div>
  );
}

const navLinks = [
  { label: "Главная", href: "#home" },
  { label: "Услуги", href: "#services" },
  { label: "Тарифы", href: "#pricing" },
  { label: "О нас", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [feedback, setFeedback] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="#home" className="flex items-center gap-2 group">
              <div className="w-9 h-9 gradient-blue rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white text-lg">🦈</span>
              </div>
              <div>
                <span className="font-montserrat font-extrabold text-foreground text-base leading-tight block">АКУЛА</span>
                <span className="font-montserrat font-semibold text-primary text-xs leading-tight block tracking-wider">БИЗНЕСА</span>
              </div>
            </a>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors rounded-lg hover:bg-secondary"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href={`tel:${PHONE}`}
                className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                <Icon name="Phone" size={15} />
                {PHONE}
              </a>
              <button
                onClick={() => setFeedback(true)}
                className="hidden sm:block gradient-blue text-white text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-all hover:scale-105 shadow-sm"
              >
                Оставить заявку
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div className="lg:hidden border-t border-border py-3 space-y-1">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <div className="pt-2 flex flex-col gap-2">
                <a href={`tel:${PHONE}`} className="flex items-center gap-2 text-primary font-semibold px-3 py-2">
                  <Icon name="Phone" size={16} />
                  {PHONE}
                </a>
                <button
                  onClick={() => { setFeedback(true); setMobileOpen(false); }}
                  className="gradient-blue text-white font-semibold text-sm py-2.5 rounded-lg mx-3"
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

function HeroSection() {
  return (
    <section id="home" className="relative gradient-hero min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -left-20 w-80 h-80 bg-accent/8 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-7 animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-white/80 border border-primary/20 rounded-full px-4 py-2 text-sm font-medium text-primary shadow-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Работаем по всей России
            </div>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-black font-montserrat text-foreground leading-tight">
              Регистрация<br />
              бизнеса —{" "}
              <span className="text-gradient">ваш путь<br />к успеху</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              Помогаем открыть ИП и ООО с полным сопровождением. Без лишних хлопот, ошибок и потери времени.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <FeedbackButton label="Открыть бизнес бесплатно" className="text-base px-7 py-4 shadow-lg" />
              <a
                href="#about"
                className="flex items-center gap-2 bg-white text-foreground font-semibold font-montserrat px-6 py-3 rounded-xl border border-border hover:bg-secondary transition-all hover:scale-105 shadow-sm"
              >
                <Icon name="PlayCircle" size={18} className="text-primary" />
                Узнать подробнее
              </a>
            </div>

            <div className="flex flex-wrap gap-6 pt-2">
              {[
                { val: "7+", label: "лет опыта" },
                { val: "300+", label: "ООО открыто" },
                { val: "500+", label: "ИП открыто" },
              ].map(({ val, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-black font-montserrat text-primary">{val}</div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <div className="absolute inset-0 gradient-blue rounded-3xl blur-2xl opacity-20 scale-95" />
              <img
                src={SHARK_HERO}
                alt="Акула бизнеса"
                className="relative w-80 h-80 md:w-96 md:h-96 object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-card p-3 flex items-center gap-2.5 border border-border">
                <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center">
                  <Icon name="CheckCircle" size={20} className="text-green-600" />
                </div>
                <div>
                  <div className="text-xs font-bold font-montserrat text-foreground">Регистрация</div>
                  <div className="text-xs text-muted-foreground">Без отказов от ФНС</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-card p-3 flex items-center gap-2.5 border border-border">
                <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Icon name="Clock" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="text-xs font-bold font-montserrat text-foreground">3-5 дней</div>
                  <div className="text-xs text-muted-foreground">до открытия счёта</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const services = [
  { icon: "FileText", title: "Правильный выбор ОКВЭД", desc: "Подберём оптимальные виды деятельности для вашего бизнеса" },
  { icon: "Calculator", title: "Система налогообложения", desc: "Выберем выгодный режим налогов, чтобы вы платили меньше" },
  { icon: "Building2", title: "Юридический адрес", desc: "Решим вопрос с адресом для регистрации ООО" },
  { icon: "Landmark", title: "Открытие счёта в банке", desc: "Работаем с 7 ведущими банками России, подберём лучший вариант" },
  { icon: "Monitor", title: "Торговое оборудование", desc: "Подбор, установка и обслуживание онлайн-касс и ПО" },
  { icon: "ShieldCheck", title: "Честный знак и ЕГАИС", desc: "Подключим к системам маркировки и контроля алкоголя" },
];

const banks = ["Сбер", "Альфа банк", "ВТБ", "ПСБ", "Уралсиб", "Ак Барс", "Локо банк"];

function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-xs font-bold font-montserrat tracking-widest uppercase text-primary mb-3 block">Наши услуги</span>
          <h2 className="text-3xl md:text-4xl font-black font-montserrat text-foreground mb-4">
            Мы поможем вам на каждом шаге
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            От выбора формы собственности до открытия счёта и подключения кассы — берём всё на себя
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {services.map(({ icon, title, desc }, i) => (
            <div
              key={title}
              className="gradient-card rounded-2xl p-6 border border-border shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 group"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="w-11 h-11 gradient-blue rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon name={icon} size={22} fallback="Star" className="text-white" />
              </div>
              <h3 className="font-bold font-montserrat text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-secondary rounded-2xl p-8 border border-primary/10">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold font-montserrat text-foreground mb-2">Работаем с ключевыми банками России</h3>
            <p className="text-sm text-muted-foreground">Поможем выбрать оптимальный банк для вашего бизнеса</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {banks.map((bank) => (
              <div key={bank} className="bg-white rounded-xl px-5 py-2.5 text-sm font-semibold font-montserrat text-foreground border border-border shadow-sm hover:border-primary/30 transition-colors">
                {bank}
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

const tariffs = [
  {
    name: "Базовый",
    price: "Бесплатно",
    highlight: false,
    tag: null,
    image: SHARK_DOCS,
    features: [
      "Регистрация ИП или ООО",
      "Открытие расчётного счёта",
      "Выбор оптимального банка",
      "Консультация по налогам",
    ],
    cta: "Начать бесплатно",
  },
  {
    name: "Стандарт",
    price: "Договорная",
    highlight: true,
    tag: "Популярный",
    image: SHARK_TARIFF,
    features: [
      "Всё из тарифа Базовый",
      "Консультация по оборудованию",
      "Подбор онлайн-кассы (ФН, ОФД)",
      "Регистрация ККТ",
      "Обучение работе с кассой",
    ],
    cta: "Узнать цену",
  },
  {
    name: "Расширенный",
    price: "Договорная",
    highlight: false,
    tag: "Всё включено",
    image: SHARK_DOCS,
    features: [
      "Всё из тарифов Базовый и Стандарт",
      "Настройка ТО и ПО",
      "Честный знак и ЕГАИС",
      "Серверное и распределённое оборудование",
      "Выезд специалиста к клиенту",
    ],
    cta: "Получить КП",
  },
];

function PricingSection() {
  return (
    <section id="pricing" className="py-20 gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-xs font-bold font-montserrat tracking-widest uppercase text-primary mb-3 block">Тарифы</span>
          <h2 className="text-3xl md:text-4xl font-black font-montserrat text-foreground mb-4">
            Выберите подходящий формат
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            От бесплатной регистрации до полного сопровождения вашего бизнеса
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tariffs.map(({ name, price, highlight, tag, image, features, cta }) => (
            <div
              key={name}
              className={`relative rounded-2xl overflow-hidden border transition-all hover:-translate-y-1 ${highlight
                ? "border-primary shadow-2xl scale-105"
                : "border-border shadow-card hover:shadow-card-hover bg-white"
                }`}
            >
              {tag && (
                <div className={`absolute top-4 right-4 z-10 text-xs font-bold font-montserrat px-3 py-1 rounded-full ${highlight ? "bg-white text-primary" : "bg-primary/10 text-primary"}`}>
                  {tag}
                </div>
              )}

              <div className={`${highlight ? "gradient-blue" : "bg-muted"} relative overflow-hidden h-44`}>
                <img src={image} alt={name} className="w-full h-full object-cover opacity-80 mix-blend-multiply" />
                <div className="absolute inset-0 flex items-end p-5">
                  <div>
                    <div className={`text-sm font-medium ${highlight ? "text-white/80" : "text-foreground/60"}`}>{name}</div>
                    <div className={`text-2xl font-black font-montserrat ${highlight ? "text-white" : "text-foreground"}`}>{price}</div>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4 bg-white">
                <ul className="space-y-2.5">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                      <Icon name="CheckCircle" size={16} className="text-green-500 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <FeedbackButton
                  label={cta}
                  className="w-full text-center"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-sm text-muted-foreground">Не знаете что выбрать?</p>
          <FeedbackButton label="Получить бесплатную консультацию" className="mt-3" />
        </div>
      </div>
    </section>
  );
}

const steps = [
  { num: "1", title: "Оставьте заявку", desc: "На сайте — займёт 1 минуту" },
  { num: "2", title: "Бесплатная консультация", desc: "Созвонимся и ответим на все вопросы" },
  { num: "3", title: "Личная встреча", desc: "Собираем документы, всё объясним" },
  { num: "4", title: "Регистрация в ФНС", desc: "Подаём документы, следим за статусом" },
  { num: "5", title: "Открытие счёта", desc: "В оптимальном для вас банке" },
];

function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <span className="text-xs font-bold font-montserrat tracking-widest uppercase text-primary mb-3 block">О нас</span>
            <h2 className="text-3xl md:text-4xl font-black font-montserrat text-foreground mb-6">
              Как всё начиналось
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Меня зовут <strong className="text-foreground">Николай</strong>. Раньше я работал в IT, и ко мне часто приходили люди за электронной подписью, чтобы открыть фирму. Я увидел, что многим нужна не просто подпись, а помощь с самого начала.
              </p>
              <p>
                Так я начал открывать бизнес для других. Сейчас моя команда и я сделали уже:
              </p>
              <div className="grid grid-cols-3 gap-4 py-4">
                {[
                  { val: "300+", label: "ООО открыто" },
                  { val: "500+", label: "ИП открыто" },
                  { val: "200+", label: "только за 2025 год" },
                ].map(({ val, label }) => (
                  <div key={label} className="text-center bg-secondary rounded-xl p-4 border border-primary/10">
                    <div className="text-2xl font-black font-montserrat text-primary">{val}</div>
                    <div className="text-xs text-muted-foreground mt-1">{label}</div>
                  </div>
                ))}
              </div>
              <p>
                Мне нравится делать сложное — простым. В штате есть бухгалтеры, юристы и программисты.
              </p>
              <p className="text-sm bg-primary/5 border border-primary/15 rounded-xl p-4">
                <Icon name="Info" size={14} className="text-primary inline mr-1.5" />
                <strong className="text-foreground">Честно:</strong> банки платят мне за привлечённых клиентов. Это нормальная практика. Для вас — бесплатная консультация, для меня — бонус. Работаем открыто.
              </p>
            </div>
            <div className="mt-8">
              <FeedbackButton label="Познакомиться с Николаем" />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold font-montserrat text-foreground mb-6">5 шагов к открытию бизнеса</h3>
            <div className="space-y-3">
              {steps.map(({ num, title, desc }) => (
                <div key={num} className="flex items-start gap-4 bg-muted/50 rounded-xl p-4 border border-border hover:border-primary/20 transition-colors group">
                  <div className="w-10 h-10 gradient-blue rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <span className="text-white font-black font-montserrat text-sm">{num}</span>
                  </div>
                  <div>
                    <div className="font-semibold font-montserrat text-foreground">{title}</div>
                    <div className="text-sm text-muted-foreground">{desc}</div>
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

const reasons = [
  { icon: "Award", title: "7+ лет опыта", desc: "Сотни успешных регистраций, знаем все нюансы ФНС" },
  { icon: "UserCheck", title: "Индивидуальный подход", desc: "К каждому клиенту — персональное внимание" },
  { icon: "FileX", title: "Без ошибок в документах", desc: "Гарантируем правильное оформление с первого раза" },
  { icon: "Clock", title: "Экономия времени", desc: "Вы занимаетесь бизнесом, мы — бумагами" },
  { icon: "Briefcase", title: "Полный комплекс", desc: "Бухгалтеры, юристы и программисты в одном месте" },
  { icon: "Handshake", title: "Прозрачность", desc: "Работаем открыто, без скрытых платежей" },
];

function WhyUsSection() {
  return (
    <section className="py-20 gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-xs font-bold font-montserrat tracking-widest uppercase text-primary mb-3 block">Почему мы</span>
          <h2 className="text-3xl md:text-4xl font-black font-montserrat text-foreground mb-4">
            Почему выбирают нас
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {reasons.map(({ icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-6 border border-border shadow-card flex items-start gap-4 hover:shadow-card-hover transition-all hover:-translate-y-0.5">
              <div className="w-10 h-10 gradient-blue rounded-xl flex items-center justify-center shrink-0">
                <Icon name={icon} size={20} fallback="Star" className="text-white" />
              </div>
              <div>
                <h3 className="font-bold font-montserrat text-foreground mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <FeedbackButton label="Работать с нами" />
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    q: "Сколько времени занимает регистрация ИП?",
    a: "Регистрация ИП через ФНС занимает 3 рабочих дня после подачи документов. Мы подготовим все документы быстро, обычно встречаемся и подаём документы в течение 1-2 дней.",
  },
  {
    q: "Нужно ли мне самому ходить в налоговую?",
    a: "Нет — мы берём на себя все визиты в МФЦ и ФНС. Вам нужно только подписать документы при встрече с нами.",
  },
  {
    q: "Какую систему налогообложения выбрать?",
    a: "Это зависит от вашего вида деятельности и планируемого оборота. Мы проведём бесплатную консультацию и подберём оптимальный режим — УСН 6%, УСН 15%, патент или ОСНО.",
  },
  {
    q: "Нужен ли юридический адрес для ООО?",
    a: "Да, для ООО юридический адрес обязателен. Мы поможем решить этот вопрос — есть несколько вариантов оформления.",
  },
  {
    q: "Почему регистрация бесплатная?",
    a: "Мы зарабатываем на реферальных программах банков — они платят нам за привлечённых клиентов. Это означает, что для вас консультация и регистрация бесплатны, а вы получаете счёт в проверенном банке.",
  },
  {
    q: "Работаете ли вы в других городах?",
    a: "Да, работаем дистанционно по всей России. Документы можно передать курьером или по ЭДО. Выезд специалиста — в рамках тарифа Расширенный.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-14">
          <span className="text-xs font-bold font-montserrat tracking-widest uppercase text-primary mb-3 block">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-black font-montserrat text-foreground mb-4">
            Часто задаваемые вопросы
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map(({ q, a }, i) => (
            <div key={i} className="border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-muted/30 transition-colors"
              >
                <span className="font-semibold font-montserrat text-foreground pr-4">{q}</span>
                <Icon
                  name={open === i ? "ChevronUp" : "ChevronDown"}
                  size={18}
                  className="text-muted-foreground shrink-0 transition-transform"
                />
              </button>
              {open === i && (
                <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4 bg-muted/20">
                  {a}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <p className="text-muted-foreground text-sm mb-4">Не нашли ответ на свой вопрос?</p>
          <FeedbackButton label="Задать вопрос" />
        </div>
      </div>
    </section>
  );
}

function ContactsSection() {
  return (
    <section id="contacts" className="py-20 gradient-hero">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-14">
          <span className="text-xs font-bold font-montserrat tracking-widest uppercase text-primary mb-3 block">Контакты</span>
          <h2 className="text-3xl md:text-4xl font-black font-montserrat text-foreground mb-4">
            Свяжитесь с нами
          </h2>
          <p className="text-muted-foreground">Ответим в течение 15 минут в рабочее время</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {[
              { icon: "Phone", label: "Телефон", val: PHONE, href: `tel:${PHONE}` },
              { icon: "Mail", label: "Email", val: EMAIL, href: `mailto:${EMAIL}` },
              { icon: "Send", label: "Telegram", val: "@nik0163", href: `https://${TELEGRAM}` },
            ].map(({ icon, label, val, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-border shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all group"
              >
                <div className="w-11 h-11 gradient-blue rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Icon name={icon} size={20} fallback="Link" className="text-white" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                  <div className="font-semibold font-montserrat text-foreground">{val}</div>
                </div>
                <Icon name="ArrowRight" size={16} className="text-muted-foreground ml-auto group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-border shadow-card p-7">
            <h3 className="font-bold font-montserrat text-foreground mb-5">Оставьте заявку</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Ваше имя"
                className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              <input
                type="tel"
                placeholder="Телефон"
                className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              <select className="w-full border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
                <option value="">Что хотите открыть?</option>
                <option>ИП</option>
                <option>ООО</option>
                <option>Нужна консультация</option>
              </select>
              <textarea
                placeholder="Ваш вопрос (необязательно)"
                rows={3}
                className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
              />
              <button className="w-full gradient-blue text-white font-semibold font-montserrat py-3 rounded-xl hover:opacity-90 transition-opacity">
                Отправить заявку
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-xl">🦈</span>
              </div>
              <div>
                <div className="font-montserrat font-black text-lg text-white leading-tight">АКУЛА БИЗНЕСА</div>
                <div className="text-xs text-white/50">Регистрация ИП и ООО</div>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Ваш надёжный партнёр на пути к успешному бизнесу. Опыт 7+ лет, 800+ кейсов.
            </p>
          </div>

          <div>
            <h4 className="font-bold font-montserrat text-white mb-4">Разделы</h4>
            <div className="space-y-2">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} className="block text-sm text-white/60 hover:text-white transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold font-montserrat text-white mb-4">Контакты</h4>
            <div className="space-y-3">
              <a href={`tel:${PHONE}`} className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                <Icon name="Phone" size={14} className="text-primary" />
                {PHONE}
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                <Icon name="Mail" size={14} className="text-primary" />
                {EMAIL}
              </a>
              <a href={`https://${TELEGRAM}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                <Icon name="Send" size={14} className="text-primary" />
                @nik0163
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <div className="space-y-1 text-center sm:text-left">
            <div>ИП Кожухов Николай Михайлович</div>
            <div>ИНН 635006641870</div>
          </div>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-white/70 transition-colors">Политика конфиденциальности</a>
            <span>© 2025 Акула Бизнеса</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function PrivacySection() {
  return (
    <section id="privacy" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-2xl font-black font-montserrat text-foreground mb-6">Политика конфиденциальности и согласие на обработку данных</h2>
        <div className="text-muted-foreground space-y-4 text-sm leading-relaxed">
          <p>
            <strong className="text-foreground">Оператор:</strong> ИП Кожухов Николай Михайлович, ИНН 635006641870 (далее — «Компания»).
          </p>
          <p>
            Оставляя заявку на сайте или связываясь с нами любым способом, вы предоставляете согласие на обработку своих персональных данных (имя, номер телефона, адрес электронной почты) в целях: обратной связи, консультирования, предоставления услуг регистрации бизнеса.
          </p>
          <p>
            Мы обязуемся не передавать ваши данные третьим лицам без вашего согласия, за исключением случаев, предусмотренных законодательством РФ.
          </p>
          <p>
            <strong className="text-foreground">Использование файлов cookie:</strong> Сайт использует технические cookie-файлы для корректной работы и улучшения пользовательского опыта. Данные файлы не содержат персональной информации и не передаются третьим лицам.
          </p>
          <p>
            Вы вправе в любое время отозвать согласие на обработку данных, направив запрос на e-mail:{" "}
            <a href={`mailto:${EMAIL}`} className="text-primary">{EMAIL}</a>
          </p>
          <p>
            Основание: Федеральный закон № 152-ФЗ «О персональных данных» от 27.07.2006.
          </p>
        </div>
      </div>
    </section>
  );
}

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
        <PrivacySection />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
