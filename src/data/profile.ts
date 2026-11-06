// Todo el contenido de la página vive aquí. Para actualizar la web, edita este archivo.

export const profile = {
  name: "Timoteo Rodríguez Cortez",
  firstName: "Timoteo",
  lastName: "Rodríguez Cortez",
  initials: "TR",
  // Coloca tu foto en /public (por ejemplo public/foto.jpg) y escribe aquí "foto.jpg".
  photo: "foto.jpg",
  roles: [
    "Analista de Sistemas",
    "Desarrollador Full Stack",
    "DevOps Engineer",
    "Integrador de IA",
    "Arquitecto de Software",
  ],
  tagline:
    "Más de 10 años construyendo software para banca, seguros, telecomunicaciones y turismo. Hoy diseño plataformas SaaS con microservicios, despliegue automatizado e inteligencia artificial aplicada a negocio.",
  location: "Lima, Perú",
  email: "rodrigues_trc_13@hotmail.com",
  phone: "+51 988 574 051",
  whatsapp: "https://wa.me/51988574051",
  linkedin: "https://www.linkedin.com/in/timoteo-rodriguez-cortez-9614a4113/",
  github: "https://github.com/eltimoteyo",
  cv: "cv/CV-Timoteo-Rodriguez-Cortez.pdf",
  heroStack: ["Java", "Spring Boot", "Go", "Kubernetes", "Azure", "IA generativa"],
};

export const stats = [
  { value: 10, suffix: "+", label: "años construyendo software" },
  { value: 6, suffix: "", label: "clientes corporativos en banca, seguros y telecom" },
  { value: 10, suffix: "+", label: "microservicios en Go en un solo producto" },
  { value: 6, suffix: "", label: "proveedores de IA integrados" },
];

export const companies = [
  "BCP",
  "Interbank",
  "Scotiabank",
  "La Positiva Seguros",
  "Claro",
  "Movistar",
  "Tata Consultancy Services",
  "NTT Data",
  "Grupo Costamar",
  "Colegio de Arquitectos del Perú",
];

export const about = {
  paragraphs: [
    "Empecé instalando servidores y sistemas en estaciones de servicio de todo el país. Desde entonces he pasado por el desarrollo full stack, los microservicios y el DevOps, y hoy diseño plataformas completas: arquitectura, código, despliegue, monitoreo e inteligencia artificial.",
    "En Tata Consultancy Services trabajé para BCP con microservicios reactivos en Java Spring Boot, desplegados en Kubernetes sobre Azure, y actualmente desarrollo como full stack para La Positiva Seguros.",
    "Desde 2019 construyo mis propios productos SaaS: un ERP con punto de venta para pymes, plataformas de reservas, streaming y notificaciones, además de proyectos para clientes. En todos integro IA generativa donde aporta valor real.",
  ],
  facts: [
    { icon: "MapPin", label: "Ubicación", value: "Lima, Perú" },
    { icon: "Briefcase", label: "Actualmente", value: "IT Analyst en TCS · Fundador" },
    { icon: "GraduationCap", label: "Estudiando", value: "Administración de TI · UTEL" },
    { icon: "Languages", label: "Idiomas", value: "Español nativo · Inglés básico-intermedio" },
  ],
  terminal: [
    { cmd: "whoami", out: ["timoteo — analista de sistemas · full stack · devops · ia"] },
    { cmd: "cat experiencia.txt", out: ["10+ años · banca · seguros · telecom · turismo"] },
    {
      cmd: "kubectl get pods -n carrera",
      out: [
        "NAME              READY   STATUS",
        "java-spring-boot  1/1     Running",
        "go-microservicios 1/1     Running",
        "k8s-azure         1/1     Running",
        "agentes-ia        1/1     Running",
      ],
    },
    { cmd: "./siguiente-reto.sh", out: ["▸ buscando problemas interesantes que resolver…"] },
  ],
};

export type Job = {
  company: string;
  role: string;
  period: string;
  location?: string;
  badge?: string;
  summary?: string;
  highlights: string[];
  clients?: { name: string; period: string; highlights: string[] }[];
  tags: string[];
};

export const experience: Job[] = [
  {
    company: "Productos SaaS propios y consultoría",
    role: "Fundador y Arquitecto de Software",
    period: "2019 — Actualidad",
    location: "Lima · Remoto",
    badge: "Fundador",
    summary:
      "Diseño, construyo y despliego productos SaaS multi-tenant de punta a punta: arquitectura, backend, frontend, móvil, DevOps e IA.",
    highlights: [
      "ERP y POS SaaS para pymes peruanas (facturación electrónica SUNAT, CRM, restaurantes, inventario y pagos) con más de 10 microservicios en Go (Go-Kit, gRPC/Protobuf) detrás de un API Gateway.",
      "Comunicación por eventos con NATS JetStream y patrón Outbox; servicios en Python (FastAPI); clientes en Angular 20 (PWA), React 19 y Android (Kotlin).",
      "Capa de IA: gateway central con un modelo asignado por tarea y fallback entre Claude, OpenAI, Gemini, Groq, OpenRouter y Ollama.",
      "Agentes de IA con aprobación humana, guardrails, memoria y tope de consumo; microservicio de visión que extrae medidas desde imágenes.",
      "Integraciones con WhatsApp (API de Meta y WAHA), Instagram y Meta Lead Ads para atención y captación de clientes.",
      "CI/CD con GitHub Actions, imágenes en Docker Hub y despliegue automatizado a VPS Linux; Nginx, Caddy, Prometheus y Grafana.",
      "Seguridad con JWT RS256 y JWKS, y control de acceso por roles (RBAC).",
      "Plataformas propias de reservas (con asistente sobre la API de Claude), notificaciones push, streaming de video y clases en vivo.",
      "Proyectos para clientes: mesa de ayuda corporativa, CRM inmobiliario, agregador de open banking y e-commerce multi-tenant.",
      "Desarrollo asistido por agentes de IA (Claude Code) con guías y convenciones por repositorio.",
    ],
    tags: ["Go", "gRPC", "NATS", "FastAPI", "Angular", "React", "Next.js", "Docker", "GitHub Actions", "Claude API", "OpenAI"],
  },
  {
    company: "Tata Consultancy Services",
    role: "IT Analyst",
    period: "2022 — Actualidad",
    location: "Lima",
    summary: "Consultor en proyectos para clientes del sector financiero y asegurador.",
    highlights: [],
    clients: [
      {
        name: "La Positiva Seguros",
        period: "2024 — Actualidad",
        highlights: ["Desarrollo full stack de los sistemas de la aseguradora: servicios backend en Java y aplicaciones frontend web."],
      },
      {
        name: "BCP — Banco de Crédito del Perú",
        period: "2022 — 2024",
        highlights: [
          "Microservicios reactivos con Java Spring Boot, integrados con Kafka, Redis y Elasticsearch.",
          "Despliegue en Kubernetes sobre Azure: configuración de pods y pipelines de despliegue continuo con Jenkins para desarrollo, pruebas y producción.",
          "Aprovisionamiento de entornos de desarrollo en Azure, con permisos, certificados y secretos.",
          "Publicación y gestión de APIs en Azure API Management y diseño de contratos para canales internos y externos.",
          "Documentación de la arquitectura de aplicación y de los procesos de diseño e implementación de APIs.",
        ],
      },
    ],
    tags: ["Java", "Spring Boot", "Programación reactiva", "Kubernetes", "Azure", "Jenkins", "Kafka", "Redis", "Elasticsearch", "APIM"],
  },
  {
    company: "NTT Data (antes Everis)",
    role: "Desarrollador Web",
    period: "2019 — 2021",
    location: "Lima",
    highlights: [
      "Generador de proyectos para el programa de arquitectura y gobierno de Interbank (backend en Java Spring Boot, frontend en Angular).",
      "Librería de Web Components en Stencil, reutilizada en Angular y React, para el sistema de pedidos y reclamos de Interbank.",
      "CRM de ventas de Claro sobre arquitectura de micro frontends.",
      "Web de ventas de Movistar en Angular (línea nueva, portabilidad y migración) y sistema de retención de clientes.",
    ],
    tags: ["Angular", "React", "Stencil", "Spring Boot", "Micro frontends"],
  },
  {
    company: "Grupo Costamar — CTM Tours",
    role: "Analista Desarrollador Full Stack",
    period: "2017 — 2019",
    location: "Lima",
    highlights: [
      "Motor de búsqueda centralizado de vuelos, hoteles y autos integrando APIs de proveedores (PHP, Laravel, MongoDB).",
      "Cotizador entre agencias cliente y mayorista con Vue.js, Node.js y Web API con autenticación por token.",
      "Integración de métodos de pago (Spring Boot y Angular), notificaciones push web (Node.js, Service Workers) e intranet en .NET y SQL Server.",
    ],
    tags: ["Laravel", "MongoDB", "Vue.js", "Node.js", "Spring Boot", "Angular", ".NET"],
  },
  {
    company: "Software Enterprise Services",
    role: "Ingeniero de Software (Analista Programador / QA)",
    period: "2016 — 2017",
    location: "Lima · Cliente: Scotiabank Perú",
    highlights: [
      "Desarrollo de requerimientos para los sistemas de Scotiabank Perú bajo estándares internacionales de calidad de software.",
      "Gestión de pruebas con los líderes de aplicación del banco.",
    ],
    tags: ["AS400", "Bantotal", "COBOL", "RPG", "GeneXus", ".NET", "SQL Server", "Oracle", "Jira"],
  },
  {
    company: "Colegio de Arquitectos del Perú — Lima",
    role: "Analista Programador",
    period: "2015 — 2016",
    location: "Lima",
    highlights: [
      "ERP administrativo que centraliza los procesos de todas las áreas.",
      "Intranet de autoatención para que los arquitectos consulten sus proyectos y actualicen sus datos.",
      "App Android con servicios web para dictámenes municipales y visitas de obra.",
      "Rediseño del sitio web basado en estudios de experiencia de usuario.",
    ],
    tags: ["C#", ".NET", "Java Android", "SQL Server", "UX"],
  },
  {
    company: "RC Ingenieros S.A.C.",
    role: "Soporte Técnico",
    period: "Jun — Sep 2014",
    location: "Perú",
    highlights: ["Instalación, configuración y soporte de servidores y sistemas de abastecimiento de GNV en estaciones de servicio de todo el país."],
    tags: ["Servidores", "Redes", "Soporte"],
  },
];

export type Accent = "cyan" | "emerald" | "violet" | "amber" | "rose" | "sky";
export type ProjectCategory = "producto" | "ia" | "cliente" | "corporativo";

export type Project = {
  id: string;
  title: string;
  kicker: string;
  category: ProjectCategory;
  context: string;
  summary: string;
  details: string[];
  stack: string[];
  accent: Accent;
  icon: string;
  featured?: boolean;
};

export const projectCategories: { id: ProjectCategory | "todos"; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "producto", label: "Productos SaaS" },
  { id: "ia", label: "Inteligencia artificial" },
  { id: "cliente", label: "Para clientes" },
  { id: "corporativo", label: "Corporativos" },
];

export const projects: Project[] = [
  {
    id: "erp",
    title: "ERP y POS SaaS para pymes",
    kicker: "Producto propio · Microservicios",
    category: "producto",
    context: "Producto propio · Fundador y arquitecto",
    featured: true,
    accent: "cyan",
    icon: "Boxes",
    summary:
      "Plataforma multi-tenant para negocios peruanos: facturación electrónica SUNAT, punto de venta, CRM, restaurantes, inventario, compras y pagos, con una capa de IA integrada.",
    details: [
      "Más de 10 microservicios en Go (Go-Kit, gRPC/Protobuf) detrás de un API Gateway en Gin.",
      "Arquitectura orientada a eventos con NATS JetStream, patrón Outbox y consumidores durables.",
      "Servicios en Python (FastAPI) para visión con IA y optimización de cortes.",
      "PWA en Angular 20 (PrimeNG, Tailwind 4), apps en React 19 y app Android en Kotlin que detecta pagos por Yape.",
      "Agente de impresión en Go conectado por WebSocket para tickets y comandas.",
      "Integraciones con WhatsApp (API de Meta y WAHA), Instagram y Meta Lead Ads.",
      "CI/CD con GitHub Actions (builds por servicio), imágenes en Docker Hub y despliegue automatizado a VPS.",
      "Monitoreo con Prometheus y Grafana; JWT RS256 con JWKS y control de acceso por roles.",
    ],
    stack: ["Go", "gRPC", "NATS JetStream", "FastAPI", "Angular 20", "React 19", "Kotlin", "MySQL", "Docker", "GitHub Actions", "Prometheus", "Grafana"],
  },
  {
    id: "ai-gateway",
    title: "Gateway de IA multi-proveedor",
    kicker: "IA generativa · Enrutamiento",
    category: "ia",
    context: "Parte del ERP · Diseño propio",
    featured: true,
    accent: "violet",
    icon: "Network",
    summary:
      "Un punto central que asigna el mejor modelo a cada tarea y cambia de proveedor automáticamente si uno falla, controlando costos y disponibilidad.",
    details: [
      "Configuración central con un modelo por tarea: visión, agentes, chat, resúmenes.",
      "Fallback automático entre Claude (Anthropic), OpenAI, Gemini, Groq, OpenRouter y Ollama.",
      "Ollama para tareas que requieren procesamiento local.",
      "Registro de consumo y límites por uso para evitar sorpresas en la factura.",
    ],
    stack: ["Claude API", "OpenAI", "Gemini", "Groq", "OpenRouter", "Ollama", "Python", "Go"],
  },
  {
    id: "agents",
    title: "Agentes de IA con aprobación humana",
    kicker: "IA generativa · Agentes",
    category: "ia",
    context: "Parte del ERP · Diseño propio",
    accent: "violet",
    icon: "Bot",
    summary:
      "Agentes que analizan casos (por ejemplo, cobranza) y proponen acciones que una persona aprueba antes de ejecutarse.",
    details: [
      "El agente propone decisiones; una persona las aprueba o rechaza (human-in-the-loop).",
      "Guardrails para limitar lo que el agente puede hacer.",
      "Memoria por caso para mantener el contexto entre conversaciones.",
      "Tope de consumo para controlar el gasto en modelos.",
    ],
    stack: ["Agentes", "Tool use", "Claude API", "Guardrails", "Microservicios"],
  },
  {
    id: "vision",
    title: "Visión con IA: medidas desde fotos",
    kicker: "IA generativa · Visión",
    category: "ia",
    context: "Parte del ERP · Microservicio",
    accent: "sky",
    icon: "Eye",
    summary:
      "Microservicio que lee medidas directamente desde imágenes usando modelos de visión, con enrutamiento entre varios proveedores.",
    details: [
      "Extracción de datos estructurados desde fotos.",
      "Enrutamiento entre proveedores con fallback para mayor disponibilidad.",
      "Expuesto como microservicio dentro de la arquitectura del ERP.",
    ],
    stack: ["FastAPI", "Python", "Claude", "Gemini", "OpenAI", "Docker"],
  },
  {
    id: "ai-dev",
    title: "Ingeniería de software con agentes",
    kicker: "IA generativa · Productividad",
    category: "ia",
    context: "Forma de trabajo",
    accent: "emerald",
    icon: "Sparkles",
    summary:
      "Programo a diario con agentes de IA como Claude Code, con guías y convenciones por repositorio para mantener la calidad.",
    details: [
      "Guías por repositorio (CLAUDE.md, AGENTS.md) con arquitectura, convenciones y comandos.",
      "Agentes que implementan, revisan y documentan bajo esas reglas.",
      "Más velocidad sin perder consistencia entre servicios.",
    ],
    stack: ["Claude Code", "Agentes de IA", "Git", "CI"],
  },
  {
    id: "booking",
    title: "Marketplace de reservas con asistente IA",
    kicker: "Producto propio · Next.js",
    category: "producto",
    context: "Producto propio",
    accent: "emerald",
    icon: "CalendarCheck",
    summary:
      "Plataforma para reservar servicios con notificaciones push y un asistente conversacional que usa herramientas y responde en streaming.",
    details: [
      "Next.js 16 con Supabase: PostgreSQL con Row Level Security y Realtime.",
      "PWA con notificaciones push.",
      "Versión 2 como monolito modular, con asistente sobre la API de Claude (tool use y streaming).",
      "Despliegue con Docker y Nginx en VPS, y en Vercel.",
    ],
    stack: ["Next.js 16", "Supabase", "PostgreSQL", "Claude API", "PWA", "Docker"],
  },
  {
    id: "push",
    title: "Plataforma de notificaciones push",
    kicker: "Producto propio · Orientado a eventos",
    category: "producto",
    context: "Producto propio",
    accent: "amber",
    icon: "Bell",
    summary:
      "Servicio de notificaciones web push para varios proyectos, con API y workers en Go y mensajería por eventos.",
    details: [
      "API y workers en Go (chi, pgx) sobre PostgreSQL 16.",
      "Mensajería por eventos con NATS JetStream.",
      "Panel en Next.js con NextAuth y SDK en JavaScript para integrar cualquier web.",
      "Docker Compose, Caddy y CI con GitHub Actions (pruebas e imágenes).",
    ],
    stack: ["Go", "PostgreSQL", "NATS JetStream", "Next.js", "Caddy", "GitHub Actions"],
  },
  {
    id: "streaming",
    title: "Plataforma de streaming de microdramas",
    kicker: "Producto propio · Video",
    category: "producto",
    context: "Producto propio",
    accent: "rose",
    icon: "Clapperboard",
    summary:
      "Streaming de series cortas para varias productoras, con app móvil, suscripciones y paneles de administración.",
    details: [
      "API en Go (Gin) y PostgreSQL, multi-tenant por productora.",
      "App Flutter (Riverpod, AdMob, FCM) y paneles web en React.",
      "Firebase Auth, video con Bunny Stream y suscripciones con RevenueCat.",
      "Docker, Caddy y Nginx.",
    ],
    stack: ["Go", "Gin", "PostgreSQL", "Flutter", "React", "Firebase", "Bunny Stream", "RevenueCat"],
  },
  {
    id: "live",
    title: "Plataforma de clases en vivo",
    kicker: "Producto propio · Tiempo real",
    category: "producto",
    context: "Producto propio",
    accent: "sky",
    icon: "Radio",
    summary: "Clases en vivo con video en tiempo real, cliente web y aplicación de escritorio.",
    details: [
      "Backend en Go (Fiber) con PostgreSQL.",
      "Video en tiempo real con LiveKit (WebRTC).",
      "Cliente web en Next.js y aplicación de escritorio con Electron.",
    ],
    stack: ["Go", "Fiber", "LiveKit", "WebRTC", "Next.js", "Electron", "Docker"],
  },
  {
    id: "helpdesk",
    title: "Mesa de ayuda corporativa",
    kicker: "Cliente · Monorepo",
    category: "cliente",
    context: "Proyecto para cliente",
    accent: "cyan",
    icon: "LifeBuoy",
    summary: "Sistema de tickets y soporte para una empresa, con un módulo de IA integrado.",
    details: [
      "Monorepo con pnpm y Turborepo.",
      "Next.js 16, NestJS 11 y Prisma 7 sobre PostgreSQL.",
      "Gateway de IA con Anthropic y OpenRouter.",
      "API en Railway y web en Vercel; Docker y Nginx.",
    ],
    stack: ["Next.js 16", "NestJS 11", "Prisma", "PostgreSQL", "Turborepo", "Anthropic"],
  },
  {
    id: "crm",
    title: "CRM inmobiliario",
    kicker: "Cliente · Go",
    category: "cliente",
    context: "Proyecto para cliente",
    accent: "emerald",
    icon: "Building2",
    summary: "CRM para una inmobiliaria distribuido como un solo binario, fácil de instalar en cualquier servidor.",
    details: [
      "Un único binario en Go (Gin, GORM, goose) con el frontend React embebido.",
      "Compatible con SQLite, MySQL y PostgreSQL.",
      "CI con GitHub Actions que prueba las tres bases de datos.",
      "Módulo de WhatsApp; despliegue con Docker, Nginx y systemd.",
    ],
    stack: ["Go", "Gin", "GORM", "React", "SQLite", "MySQL", "PostgreSQL"],
  },
  {
    id: "openbanking",
    title: "Agregador de open banking",
    kicker: "Fintech · Arquitectura hexagonal",
    category: "cliente",
    context: "Proyecto fintech",
    accent: "amber",
    icon: "Landmark",
    summary: "API que centraliza movimientos bancarios de distintas entidades y los entrega en tiempo real.",
    details: [
      "FastAPI con arquitectura hexagonal (puertos y adaptadores).",
      "PostgreSQL, Redis Pub/Sub y workers con RabbitMQ.",
      "Streaming de eventos al cliente con Server-Sent Events.",
      "Migraciones con Alembic y Docker Compose.",
    ],
    stack: ["FastAPI", "Python", "PostgreSQL", "Redis", "RabbitMQ", "SSE"],
  },
  {
    id: "ecommerce",
    title: "E-commerce SaaS multi-tenant",
    kicker: "Cliente · Dominios personalizados",
    category: "cliente",
    context: "Proyecto para cliente",
    accent: "rose",
    icon: "Store",
    summary: "Tiendas en línea para varios negocios desde una sola plataforma, cada una con su propio dominio.",
    details: [
      "Next.js con Firebase / Firestore.",
      "Multi-tenant con dominios personalizados.",
      "CI/CD con GitHub Actions, Docker y despliegue a VPS con verificación de salud.",
    ],
    stack: ["Next.js", "Firebase", "Firestore", "Docker", "GitHub Actions", "Nginx"],
  },
  {
    id: "territory",
    title: "App de gestión territorial offline",
    kicker: "PWA · Mapas",
    category: "cliente",
    context: "Web y Android",
    accent: "sky",
    icon: "Map",
    summary: "Aplicación centrada en mapas que funciona sin conexión, con versión web y versión Android.",
    details: [
      "PWA offline-first en React 19 y Vite con MapLibre.",
      "Firebase / Firestore con pruebas de reglas de seguridad y emuladores.",
      "Versión Android en Kotlin con Jetpack Compose y Crashlytics.",
    ],
    stack: ["React 19", "MapLibre", "Firebase", "Vitest", "Kotlin", "Jetpack Compose"],
  },
  {
    id: "bcp",
    title: "Microservicios reactivos en Kubernetes",
    kicker: "BCP · vía TCS",
    category: "corporativo",
    context: "Cliente: BCP · Tata Consultancy Services",
    featured: true,
    accent: "cyan",
    icon: "Container",
    summary:
      "Microservicios bancarios con Java Spring Boot reactivo, desplegados en Kubernetes sobre Azure con despliegue continuo.",
    details: [
      "Programación reactiva con Spring Boot, integrando Kafka, Redis y Elasticsearch.",
      "Configuración de pods y despliegue continuo con Jenkins en desarrollo, pruebas y producción.",
      "Aprovisionamiento de entornos en Azure con permisos, certificados y secretos.",
      "APIs publicadas en Azure API Management con contratos para canales internos y externos.",
    ],
    stack: ["Java", "Spring Boot", "Kafka", "Redis", "Elasticsearch", "Kubernetes", "Azure", "Jenkins", "APIM"],
  },
  {
    id: "positiva",
    title: "Sistemas de seguros full stack",
    kicker: "La Positiva · vía TCS",
    category: "corporativo",
    context: "Cliente: La Positiva Seguros · Tata Consultancy Services",
    accent: "emerald",
    icon: "ShieldCheck",
    summary: "Desarrollo full stack de los sistemas de la aseguradora: servicios backend en Java y aplicaciones frontend web.",
    details: ["Backend en Java.", "Aplicaciones frontend web.", "Trabajo en equipo ágil dentro de TCS."],
    stack: ["Java", "Frontend web", "Scrum"],
  },
  {
    id: "interbank-gen",
    title: "Generador de proyectos de arquitectura",
    kicker: "Interbank · vía NTT Data",
    category: "corporativo",
    context: "Cliente: Interbank · NTT Data",
    accent: "violet",
    icon: "Workflow",
    summary: "Herramienta del programa de arquitectura y gobierno de Interbank para crear proyectos con los estándares del banco.",
    details: ["Backend en Java Spring Boot.", "Frontend en Angular.", "Parte del programa de gobierno de arquitectura."],
    stack: ["Spring Boot", "Angular", "Java"],
  },
  {
    id: "interbank-wc",
    title: "Librería de Web Components",
    kicker: "Interbank · vía NTT Data",
    category: "corporativo",
    context: "Cliente: Interbank · NTT Data",
    accent: "amber",
    icon: "Puzzle",
    summary: "Componentes web reutilizables en Stencil para el sistema de pedidos y reclamos, usados en Angular y React.",
    details: ["Componentes construidos con Stencil.", "Reutilizados en proyectos Angular y React."],
    stack: ["Stencil", "Web Components", "Angular", "React"],
  },
  {
    id: "claro",
    title: "CRM de ventas con micro frontends",
    kicker: "Claro · vía NTT Data",
    category: "corporativo",
    context: "Cliente: Claro · NTT Data",
    accent: "rose",
    icon: "LayoutGrid",
    summary: "Nueva versión del sistema de ventas de Claro construida sobre una arquitectura de micro frontends.",
    details: ["Arquitectura de micro frontends.", "Nueva versión del CRM de ventas."],
    stack: ["Micro frontends", "Angular", "JavaScript"],
  },
  {
    id: "movistar",
    title: "Web de ventas y retención",
    kicker: "Movistar · vía NTT Data",
    category: "corporativo",
    context: "Cliente: Movistar · NTT Data",
    accent: "sky",
    icon: "Smartphone",
    summary: "Web de ventas con flujos de línea nueva, portabilidad y migración, y sistema de retención de clientes.",
    details: ["Flujos de línea nueva, portabilidad y migración.", "Sistema de retención de clientes.", "Construido en Angular."],
    stack: ["Angular", "TypeScript"],
  },
  {
    id: "costamar",
    title: "Motor de búsqueda de viajes",
    kicker: "Grupo Costamar",
    category: "corporativo",
    context: "Grupo Costamar — CTM Tours",
    accent: "cyan",
    icon: "Plane",
    summary: "Búsqueda centralizada de vuelos, hoteles y autos integrando APIs de proveedores, más cotizador B2B y pagos.",
    details: [
      "Motor de búsqueda con PHP, Laravel y MongoDB.",
      "Cotizador entre agencias con Vue.js, Node.js y autenticación por token.",
      "Métodos de pago con Spring Boot y Angular; notificaciones push web con Service Workers.",
    ],
    stack: ["Laravel", "MongoDB", "Vue.js", "Node.js", "Spring Boot", "Angular"],
  },
  {
    id: "cap",
    title: "ERP, intranet y app de obras",
    kicker: "Colegio de Arquitectos del Perú",
    category: "corporativo",
    context: "Colegio de Arquitectos del Perú — Lima",
    accent: "emerald",
    icon: "Hammer",
    summary: "ERP administrativo, intranet de autoatención para arquitectos y app Android para dictámenes y visitas de obra.",
    details: [
      "ERP que centraliza los procesos de todas las áreas.",
      "Intranet para consultar proyectos y actualizar datos.",
      "App Android con servicios web.",
      "Rediseño del sitio web con enfoque UX.",
    ],
    stack: [".NET", "C#", "Java Android", "SQL Server"],
  },
];

export const aiCapabilities = [
  {
    icon: "Network",
    title: "Gateway multi-modelo",
    text: "Asigno el modelo ideal a cada tarea y cambio de proveedor automáticamente si uno falla.",
  },
  {
    icon: "Bot",
    title: "Agentes con aprobación humana",
    text: "Los agentes proponen, una persona aprueba. Con guardrails, memoria y tope de consumo.",
  },
  {
    icon: "Eye",
    title: "Visión por computadora",
    text: "Extraigo datos estructurados desde imágenes, como medidas desde una foto.",
  },
  {
    icon: "MessageCircle",
    title: "Asistentes y WhatsApp",
    text: "Asistentes conversacionales con herramientas y streaming, conectados a WhatsApp e Instagram.",
  },
];

export const aiProviders = ["Claude", "OpenAI", "Gemini", "Groq", "OpenRouter", "Ollama"];

export const pipeline = [
  { icon: "GitBranch", title: "git push", text: "Cambio en main" },
  { icon: "Cpu", title: "Build", text: "Go · Java · Node" },
  { icon: "FlaskConical", title: "Tests", text: "Pruebas automatizadas" },
  { icon: "Container", title: "Imagen", text: "Docker" },
  { icon: "Package", title: "Registro", text: "Docker Hub" },
  { icon: "Rocket", title: "Deploy", text: "Kubernetes · VPS" },
  { icon: "Gauge", title: "Monitoreo", text: "Prometheus · Grafana" },
];

export const devopsContexts = [
  {
    title: "En banca (BCP)",
    icon: "Landmark",
    items: ["Kubernetes sobre Azure", "Jenkins para despliegue continuo", "Azure API Management", "Secretos y certificados", "Kafka · Redis · Elasticsearch"],
  },
  {
    title: "En mis productos",
    icon: "Rocket",
    items: ["GitHub Actions con builds por servicio", "Docker Hub y despliegue a VPS", "Nginx y Caddy", "Prometheus y Grafana", "NATS JetStream"],
  },
];

export const architecturePatterns = [
  "Microservicios",
  "gRPC / Protobuf",
  "API Gateway",
  "Orientada a eventos",
  "Patrón Outbox",
  "SaaS multi-tenant",
  "Arquitectura hexagonal",
  "Monolito modular",
  "Micro frontends",
  "Programación reactiva",
];

export const skillGroups = [
  {
    icon: "Layers",
    title: "Arquitectura",
    accent: "cyan" as Accent,
    items: ["Microservicios", "gRPC", "API Gateway", "Azure API Management", "NATS JetStream", "Kafka", "RabbitMQ", "Outbox", "Multi-tenant", "Hexagonal", "Micro frontends"],
  },
  {
    icon: "Cloud",
    title: "DevOps y nube",
    accent: "emerald" as Accent,
    items: ["Kubernetes", "Azure", "Docker", "Jenkins", "GitHub Actions", "Bitbucket Pipelines", "SonarCloud", "Nginx", "Caddy", "Prometheus", "Grafana", "Linux", "Vercel", "Railway"],
  },
  {
    icon: "Sparkles",
    title: "IA generativa",
    accent: "violet" as Accent,
    items: ["Claude API", "OpenAI", "Gemini", "Groq", "OpenRouter", "Ollama", "Agentes", "Tool use", "Human-in-the-loop", "Visión", "Streaming", "Claude Code"],
  },
  {
    icon: "Server",
    title: "Backend",
    accent: "amber" as Accent,
    items: ["Java", "Spring Boot", "Programación reactiva", "Go", "Gin", "Fiber", "Go-Kit", "Python", "FastAPI", "Node.js", "NestJS", "C# .NET", "PHP / Laravel"],
  },
  {
    icon: "MonitorSmartphone",
    title: "Frontend y móvil",
    accent: "rose" as Accent,
    items: ["Angular", "React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS", "PWA", "Stencil", "Flutter", "Kotlin", "Electron"],
  },
  {
    icon: "Database",
    title: "Datos y seguridad",
    accent: "sky" as Accent,
    items: ["PostgreSQL", "MySQL", "SQL Server", "Oracle", "MongoDB", "Redis", "Elasticsearch", "SQLite", "Firestore", "Supabase", "Prisma", "JWT / JWKS", "RBAC", "RLS"],
  },
];

export const education = [
  {
    title: "Administración de Tecnologías de Información",
    place: "UTEL",
    status: "En curso",
    period: "Actualidad",
  },
  {
    title: "Ingeniería de Sistemas de Información y Gestión",
    place: "Universidad Científica del Sur",
    status: "Egresado",
    period: "",
  },
  {
    title: "Profesional Técnico en Computación e Informática, mención en Software y Sistemas",
    place: "Instituto SISE",
    status: "Titulado",
    period: "2012 — 2015",
  },
];

export const certifications = [
  { title: "Spring Boot", issuer: "JoeDayz Academy · 15 h", year: "2019", url: "" },
  { title: "Vue.js 2: Crea webapps modernas", issuer: "Udemy", year: "2018", url: "https://ude.my/UC-MKAB5LBU" },
  {
    title: "Fundamentos de Marketing Digital",
    issuer: "Google Actívate · IAB Europe · The Open University · 40 h",
    year: "2017",
    url: "https://learndigital.withgoogle.com/link/1nur091p2ww",
  },
];

export const otherCourses = ["Analítica Web", "Diseño UI"];

export const languages = [
  { name: "Español", level: "Nativo", value: 100 },
  { name: "Inglés", level: "Básico-intermedio", value: 45 },
];

export const navItems = [
  { id: "inicio", label: "Inicio" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "experiencia", label: "Experiencia" },
  { id: "proyectos", label: "Proyectos" },
  { id: "ia", label: "IA" },
  { id: "devops", label: "DevOps" },
  { id: "stack", label: "Stack" },
  { id: "formacion", label: "Formación" },
  { id: "contacto", label: "Contacto" },
];
