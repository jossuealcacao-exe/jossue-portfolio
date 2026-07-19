(() => {
  "use strict";

  const STORAGE_KEY = "jossue-portfolio-input-catalogue-v1";
  const STATUSES = [
    "Faltante",
    "Recibido",
    "Requiere revisión",
    "Verificado",
    "No aplica",
    "Confidencial",
    "Aprobado para publicar",
  ];
  const PRIORITIES = ["Crítica", "Alta", "Media", "Baja"];
  const RESOLVED_STATUSES = new Set([
    "Verificado",
    "No aplica",
    "Aprobado para publicar",
  ]);

  const DEFAULT_ITEMS = [
    {
      id: "brand-primary-logo",
      name: "Logotipo SVG",
      category: "Marca",
      priority: "Crítica",
      status: "Faltante",
      format: "SVG original; PNG de referencia con fondo transparente",
      destination: "_inputs/brand/",
      description: "Versión oficial del logotipo, con proporciones y área de seguridad intactas.",
      notes: "Incluir variantes autorizadas si existen. No reconstruir desde capturas.",
      sensitivity: "Público tras aprobación",
      updatedAt: "",
    },
    {
      id: "brand-logo-variants",
      name: "Variantes del logotipo",
      category: "Marca",
      priority: "Media",
      status: "Faltante",
      format: "SVG o PDF vectorial + guía PDF/MD",
      destination: "_inputs/brand/",
      description: "Versiones monocromáticas, negativas, compactas y reglas de uso disponibles.",
      notes: "Registrar solamente variantes existentes y aprobadas.",
      sensitivity: "Público tras aprobación",
      updatedAt: "",
    },
    {
      id: "brand-isotype",
      name: "Isotipo",
      category: "Marca",
      priority: "Alta",
      status: "Faltante",
      format: "SVG original + PNG de referencia",
      destination: "_inputs/brand/",
      description: "Símbolo de marca independiente del logotipo, si existe oficialmente.",
      notes: "No extraerlo ni reconstruirlo desde el logotipo sin un activo autorizado.",
      sensitivity: "Público tras aprobación",
      updatedAt: "",
    },
    {
      id: "brand-favicon",
      name: "Favicon",
      category: "Marca",
      priority: "Alta",
      status: "Faltante",
      format: "SVG y/o ICO/PNG en tamaños fuente autorizados",
      destination: "_inputs/brand/",
      description: "Activo oficial para pestañas, favoritos y superficies de navegador.",
      notes: "El favicon técnico actual no acredita que exista un favicon de marca aprobado.",
      sensitivity: "Público tras aprobación",
      updatedAt: "",
    },
    {
      id: "brand-zappicon",
      name: "Zappicon",
      category: "Marca",
      priority: "Alta",
      status: "Faltante",
      format: "Archivo vectorial original o especificación oficial",
      destination: "_inputs/brand/",
      description: "Activo Zappicon original solicitado para la identidad.",
      notes: "No disponible. No crear, reinterpretar ni sustituir por otro icono.",
      sensitivity: "Por definir",
      updatedAt: "",
    },
    {
      id: "brand-colour",
      name: "Paleta cromática autorizada",
      category: "Marca",
      priority: "Media",
      status: "Faltante",
      format: "PDF, ASE o MD con valores HEX/RGB/CMYK",
      destination: "_inputs/brand/",
      description: "Colores oficiales y restricciones de contraste o combinación.",
      notes: "La interfaz puede avanzar en monocromo mientras se valida la marca.",
      sensitivity: "Público tras aprobación",
      updatedAt: "",
    },
    {
      id: "brand-guidelines",
      name: "Guía de uso de marca",
      category: "Marca",
      priority: "Media",
      status: "Faltante",
      format: "PDF, DOCX o MD",
      destination: "_inputs/brand/",
      description: "Reglas visuales, verbales, de nomenclatura y ejemplos aprobados.",
      notes: "Separar reglas vigentes de referencias históricas.",
      sensitivity: "Interno",
      updatedAt: "",
    },
    {
      id: "brand-typography-references",
      name: "Tipografía y referencias visuales",
      category: "Marca",
      priority: "Media",
      status: "Faltante",
      format: "PDF/MD + nombres y fuentes de referencia",
      destination: "_inputs/brand/",
      description: "Tipografías de marca existentes y referencias visuales autorizadas.",
      notes: "Inter Tight y Source Sans 3 son una selección técnica provisional, no activos recibidos.",
      sensitivity: "Interno",
      updatedAt: "",
    },
    {
      id: "brand-licenses",
      name: "Licencias de marca y tipografía",
      category: "Marca",
      priority: "Crítica",
      status: "Faltante",
      format: "TXT/PDF/MD con licencia, procedencia y alcance",
      destination: "_inputs/brand/",
      description: "Licencias y permisos aplicables a logotipos, tipografías y referencias.",
      notes: "Conservar archivos OFL de fuentes abiertas y permisos específicos de activos propios o de terceros.",
      sensitivity: "Interno",
      updatedAt: "",
    },
    {
      id: "profile-cv",
      name: "CV en español",
      category: "Perfil",
      priority: "Crítica",
      status: "Faltante",
      format: "PDF + DOCX/MD editable",
      destination: "_inputs/cv/",
      description: "Trayectoria, experiencia, educación y habilidades con fechas verificables.",
      notes: "Preparar una copia pública sin dirección, teléfono ni identificadores sensibles.",
      sensitivity: "Confidencial",
      updatedAt: "",
    },
    {
      id: "profile-cv-en",
      name: "CV en inglés",
      category: "Perfil",
      priority: "Crítica",
      status: "Faltante",
      format: "PDF + DOCX/MD editable en inglés",
      destination: "_inputs/cv/",
      description: "Versión inglesa validada de trayectoria, experiencia, educación y habilidades.",
      notes: "No traducir automáticamente cargos, certificaciones o logros sin revisión.",
      sensitivity: "Confidencial",
      updatedAt: "",
    },
    {
      id: "profile-short-bio",
      name: "Biografía breve",
      category: "Perfil",
      priority: "Crítica",
      status: "Faltante",
      format: "TXT o MD; 40–80 palabras por idioma",
      destination: "_inputs/profile/",
      description: "Presentación breve en primera o tercera persona, según tono aprobado.",
      notes: "No inferir cargo, especialidad, ubicación ni disponibilidad.",
      sensitivity: "Público tras aprobación",
      updatedAt: "",
    },
    {
      id: "profile-long-bio",
      name: "Biografía extendida",
      category: "Perfil",
      priority: "Alta",
      status: "Faltante",
      format: "TXT o MD; 150–300 palabras por idioma",
      destination: "_inputs/profile/",
      description: "Narrativa profesional con enfoque, experiencia y motivación verificables.",
      notes: "Diferenciar hechos de posicionamiento aspiracional.",
      sensitivity: "Público tras aprobación",
      updatedAt: "",
    },
    {
      id: "profile-professional-title",
      name: "Cargo profesional",
      category: "Perfil",
      priority: "Crítica",
      status: "Faltante",
      format: "TXT/MD; redacción aprobada en español e inglés",
      destination: "_inputs/profile/",
      description: "Cargo o descriptor profesional exacto que puede presentarse públicamente.",
      notes: "El posicionamiento de servicios no sustituye la confirmación del cargo personal.",
      sensitivity: "Público tras aprobación",
      updatedAt: "",
    },
    {
      id: "profile-portrait",
      name: "Fotografía de perfil",
      category: "Perfil",
      priority: "Alta",
      status: "Faltante",
      format: "JPG, PNG o AVIF; mínimo 2000 px en lado largo",
      destination: "_inputs/profile/",
      description: "Fotografía con derechos de uso web y encuadre adaptable.",
      notes: "Incluir crédito y restricciones si corresponden.",
      sensitivity: "Público tras aprobación",
      updatedAt: "",
    },
    {
      id: "profile-skills-services",
      name: "Habilidades y servicios priorizados",
      category: "Perfil",
      priority: "Alta",
      status: "Faltante",
      format: "MD o CSV priorizado",
      destination: "_inputs/profile/",
      description: "Capacidades que deben sostener el posicionamiento y la navegación.",
      notes: "Evitar listas exhaustivas sin evidencia en casos o proyectos.",
      sensitivity: "Público tras aprobación",
      updatedAt: "",
    },
    {
      id: "profile-language",
      name: "Idiomas y nivel publicable",
      category: "Perfil",
      priority: "Media",
      status: "Faltante",
      format: "MD con idioma, nivel y fuente de validación",
      destination: "_inputs/profile/",
      description: "Idiomas para contenido, atención y eventual experiencia bilingüe.",
      notes: "No asignar niveles CEFR sin confirmación.",
      sensitivity: "Público tras aprobación",
      updatedAt: "",
    },
    {
      id: "profile-public-url",
      name: "URL pública y canonical",
      category: "Perfil",
      priority: "Crítica",
      status: "Requiere revisión",
      format: "URL HTTPS definitiva",
      destination: "_inputs/profile/",
      description: "Dominio y URL canónica que gobernarán metadatos, sitemap y compartir social.",
      notes: "Bloqueado: no se proporcionó URL pública. No publicar canonical provisional.",
      sensitivity: "Público tras aprobación",
      updatedAt: "",
    },
    {
      id: "contact-public-channel",
      name: "Correo público",
      category: "Contacto",
      priority: "Crítica",
      status: "Requiere revisión",
      format: "Dirección de correo autorizada para publicación",
      destination: "_inputs/contact/",
      description: "Correo verificable que puede recibir consultas desde el portafolio.",
      notes: "Bloqueado: no se proporcionó correo publicable. No inventar direcciones.",
      sensitivity: "Confidencial",
      updatedAt: "",
    },
    {
      id: "contact-social-links",
      name: "URLs públicas adicionales",
      category: "Contacto",
      priority: "Alta",
      status: "Faltante",
      format: "CSV o MD: red, URL, etiqueta y permiso",
      destination: "_inputs/contact/",
      description: "Sitio, calendario, perfil u otras URLs públicas no cubiertas por los canales explícitos.",
      notes: "Verificar propiedad, URL final, HTTPS, vigencia y permiso.",
      sensitivity: "Público tras aprobación",
      updatedAt: "",
    },
    {
      id: "contact-whatsapp",
      name: "WhatsApp",
      category: "Contacto",
      priority: "Alta",
      status: "Faltante",
      format: "Número internacional + URL pública autorizada",
      destination: "_inputs/contact/",
      description: "Canal de WhatsApp autorizado y preparado para enlace público.",
      notes: "No publicar un número personal ni generar una URL sin consentimiento explícito.",
      sensitivity: "Confidencial",
      updatedAt: "",
    },
    {
      id: "contact-linkedin",
      name: "LinkedIn",
      category: "Contacto",
      priority: "Alta",
      status: "Faltante",
      format: "URL HTTPS del perfil autorizado",
      destination: "_inputs/contact/",
      description: "Perfil profesional de LinkedIn verificado para enlazar.",
      notes: "Confirmar propiedad, URL final y contenido visible antes de publicar.",
      sensitivity: "Público tras aprobación",
      updatedAt: "",
    },
    {
      id: "contact-github",
      name: "GitHub",
      category: "Contacto",
      priority: "Alta",
      status: "Faltante",
      format: "URL HTTPS del perfil u organización autorizados",
      destination: "_inputs/contact/",
      description: "Perfil de GitHub verificado para mostrar trabajo o actividad pública.",
      notes: "Revisar repositorios, secretos, actividad y organización antes de enlazar.",
      sensitivity: "Público tras aprobación",
      updatedAt: "",
    },
    {
      id: "contact-location-timezone",
      name: "Ubicación pública",
      category: "Perfil",
      priority: "Media",
      status: "Faltante",
      format: "MD; ciudad/región opcional y zona horaria IANA",
      destination: "_inputs/contact/",
      description: "Nivel de ubicación y horario que se autoriza mostrar.",
      notes: "No incluir domicilio. Puede limitarse a país, región o zona horaria.",
      sensitivity: "Confidencial",
      updatedAt: "",
    },
    {
      id: "contact-availability",
      name: "Disponibilidad profesional",
      category: "Perfil",
      priority: "Alta",
      status: "Faltante",
      format: "MD con mensaje, audiencias y vigencia",
      destination: "_inputs/contact/",
      description: "Tipo de oportunidades aceptadas y llamado a la acción autorizado.",
      notes: "Debe incluir vigencia o responsable de actualizar.",
      sensitivity: "Público tras aprobación",
      updatedAt: "",
    },
    {
      id: "cases-first-selection",
      name: "Selección del primer caso",
      category: "Casos",
      priority: "Crítica",
      status: "Requiere revisión",
      format: "MD con nombre interno, criterio y aprobador",
      destination: "_inputs/case-studies/",
      description: "Caso prioritario para validar estructura, evidencia y presentación.",
      notes: "La integración técnica y editorial del primer caso sigue pendiente de validación.",
      sensitivity: "Interno",
      updatedAt: "",
    },
    {
      id: "cases-context-problem",
      name: "Contexto del caso",
      category: "Casos",
      priority: "Crítica",
      status: "Faltante",
      format: "MD; fuentes o referencias anexas",
      destination: "_inputs/case-studies/",
      description: "Situación inicial, audiencia, restricciones y objetivos acordados.",
      notes: "Eliminar datos de cliente o negocio no autorizados.",
      sensitivity: "Confidencial",
      updatedAt: "",
    },
    {
      id: "cases-description",
      name: "Descripción del caso",
      category: "Casos",
      priority: "Crítica",
      status: "Faltante",
      format: "MD; resumen breve y descripción extensa",
      destination: "_inputs/case-studies/",
      description: "Descripción factual del proyecto, problema abordado y alcance documentable.",
      notes: "Distinguir descripción pública, hipótesis editorial y datos pendientes.",
      sensitivity: "Público tras aprobación",
      updatedAt: "",
    },
    {
      id: "cases-role-team",
      name: "Rol en el caso",
      category: "Casos",
      priority: "Crítica",
      status: "Faltante",
      format: "MD con responsabilidades y colaboradores",
      destination: "_inputs/case-studies/",
      description: "Atribución precisa de decisiones, entregables y contribuciones.",
      notes: "No atribuir trabajo colectivo como individual.",
      sensitivity: "Público tras aprobación",
      updatedAt: "",
    },
    {
      id: "cases-process",
      name: "Proceso y decisiones",
      category: "Casos",
      priority: "Alta",
      status: "Faltante",
      format: "MD + diagramas SVG/PNG si existen",
      destination: "_inputs/case-studies/",
      description: "Secuencia de investigación, alternativas, decisiones y aprendizajes.",
      notes: "Priorizar decisiones con evidencia sobre una cronología genérica.",
      sensitivity: "Interno",
      updatedAt: "",
    },
    {
      id: "cases-visual-assets",
      name: "Capturas del caso",
      category: "Casos",
      priority: "Alta",
      status: "Faltante",
      format: "PNG/JPG/AVIF/SVG originales + inventario MD",
      destination: "_inputs/screenshots/",
      description: "Evidencia visual legible, con contexto, orden y texto alternativo preliminar.",
      notes: "Redactar datos personales, credenciales y contenido de terceros.",
      sensitivity: "Confidencial",
      updatedAt: "",
    },
    {
      id: "cases-before-after",
      name: "Antes y después",
      category: "Casos",
      priority: "Alta",
      status: "Faltante",
      format: "PNG/JPG/AVIF + MD con fecha, contexto y equivalencia",
      destination: "_inputs/screenshots/",
      description: "Comparación verificable del estado anterior y posterior a la intervención.",
      notes: "Usar encuadres comparables y no atribuir causalidad sin evidencia.",
      sensitivity: "Confidencial",
      updatedAt: "",
    },
    {
      id: "cases-results",
      name: "Métricas del caso",
      category: "Casos",
      priority: "Crítica",
      status: "Faltante",
      format: "MD/CSV con definición, valor, fuente y periodo",
      destination: "_inputs/metrics/",
      description: "Resultados cuantitativos o cualitativos atribuibles y verificables.",
      notes: "No publicar cifras sin fuente, fecha de corte, contexto y autorización.",
      sensitivity: "Confidencial",
      updatedAt: "",
    },
    {
      id: "cases-metrics-source",
      name: "Fuente de métricas",
      category: "Casos",
      priority: "Crítica",
      status: "Faltante",
      format: "CSV/MD + exportación o evidencia verificable",
      destination: "_inputs/metrics/",
      description: "Procedencia, método, periodo y responsable de cada métrica del caso.",
      notes: "Una captura aislada o dato proporcionado sin fecha no basta como fuente pública.",
      sensitivity: "Confidencial",
      updatedAt: "",
    },
    {
      id: "cases-stack",
      name: "Stack del caso",
      category: "Casos",
      priority: "Alta",
      status: "Faltante",
      format: "MD/CSV con tecnología, versión y función",
      destination: "_inputs/case-studies/",
      description: "Tecnologías y herramientas realmente utilizadas en el trabajo.",
      notes: "Separar stack confirmado de la lista provisional presente en la colección.",
      sensitivity: "Público tras aprobación",
      updatedAt: "",
    },
    {
      id: "cases-public-link",
      name: "Enlace del caso o proyecto",
      category: "Casos",
      priority: "Media",
      status: "Faltante",
      format: "URL HTTPS + estado, propietario y fecha de revisión",
      destination: "_inputs/case-studies/",
      description: "Destino público autorizado para demo, producto, repositorio o referencia.",
      notes: "No enlazar entornos privados, inactivos o con información sensible.",
      sensitivity: "Público tras aprobación",
      updatedAt: "",
    },
    {
      id: "cases-permissions",
      name: "Autorización para publicar el caso",
      category: "Casos",
      priority: "Crítica",
      status: "Faltante",
      format: "PDF, correo exportado o MD con aprobador y alcance",
      destination: "_inputs/legal/",
      description: "Autorización para nombres, logos, imágenes, cifras y descripción del trabajo.",
      notes: "La aprobación debe distinguir piezas permitidas, restringidas y confidenciales.",
      sensitivity: "Confidencial",
      updatedAt: "",
    },
    {
      id: "cases-anonymization",
      name: "Información a anonimizar",
      category: "Casos",
      priority: "Crítica",
      status: "Faltante",
      format: "MD/CSV con elemento, ubicación, acción y aprobador",
      destination: "_inputs/legal/",
      description: "Inventario de nombres, datos, pantallas y detalles que deben ocultarse o generalizarse.",
      notes: "Revisar originales, copias optimizadas, texto alternativo y metadatos.",
      sensitivity: "Confidencial",
      updatedAt: "",
    },
    {
      id: "testimonials-quotes",
      name: "Testimonios",
      category: "Prueba social",
      priority: "Alta",
      status: "Faltante",
      format: "MD/DOCX con cita, nombre, cargo, relación y aprobación",
      destination: "_inputs/testimonials/",
      description: "Citas textuales verificables con identidad y contexto autorizados.",
      notes: "No corregir el sentido ni fabricar citas. Conservar evidencia de aprobación.",
      sensitivity: "Confidencial",
      updatedAt: "",
    },
    {
      id: "testimonials-person-name",
      name: "Nombre de la persona testimoniante",
      category: "Prueba social",
      priority: "Alta",
      status: "Faltante",
      format: "TXT/MD con grafía y forma pública aprobadas",
      destination: "_inputs/testimonials/",
      description: "Nombre de la persona que emite el testimonio, tal como puede publicarse.",
      notes: "Permitir anonimización o iniciales si así lo exige la autorización.",
      sensitivity: "Confidencial",
      updatedAt: "",
    },
    {
      id: "testimonials-person-title",
      name: "Cargo de la persona testimoniante",
      category: "Prueba social",
      priority: "Alta",
      status: "Faltante",
      format: "TXT/MD con cargo y vigencia",
      destination: "_inputs/testimonials/",
      description: "Cargo profesional autorizado de la persona testimoniante.",
      notes: "Registrar si el cargo corresponde al momento del proyecto o al actual.",
      sensitivity: "Confidencial",
      updatedAt: "",
    },
    {
      id: "testimonials-company",
      name: "Empresa de la persona testimoniante",
      category: "Prueba social",
      priority: "Alta",
      status: "Faltante",
      format: "TXT/MD con nombre legal o público autorizado",
      destination: "_inputs/testimonials/",
      description: "Empresa u organización que puede acompañar la atribución.",
      notes: "No inferir permiso de marca a partir del permiso de la persona.",
      sensitivity: "Confidencial",
      updatedAt: "",
    },
    {
      id: "testimonials-authorization",
      name: "Autorización del testimonio",
      category: "Prueba social",
      priority: "Crítica",
      status: "Faltante",
      format: "PDF, correo exportado o MD con alcance y aprobador",
      destination: "_inputs/legal/",
      description: "Consentimiento para publicar cita, nombre, cargo y empresa.",
      notes: "La autorización debe separar cada dato y cualquier traducción.",
      sensitivity: "Confidencial",
      updatedAt: "",
    },
    {
      id: "testimonials-client-logos",
      name: "Logos de prueba social",
      category: "Prueba social",
      priority: "Media",
      status: "Faltante",
      format: "SVG/PNG oficial + prueba de permiso",
      destination: "_inputs/testimonials/",
      description: "Activos de terceros cuyo uso como prueba social esté expresamente permitido.",
      notes: "No extraer logos desde sitios externos ni asumir permiso por relación laboral.",
      sensitivity: "Confidencial",
      updatedAt: "",
    },
    {
      id: "testimonials-references",
      name: "Referencias profesionales",
      category: "Prueba social",
      priority: "Baja",
      status: "Faltante",
      format: "MD con alcance de uso; contactos en archivo separado",
      destination: "_inputs/testimonials/",
      description: "Personas que aceptan respaldar experiencia o colaboración.",
      notes: "Los datos de contacto no se publican salvo consentimiento explícito.",
      sensitivity: "Confidencial",
      updatedAt: "",
    },
    {
      id: "projects-inventory",
      name: "Inventario de proyectos",
      category: "Proyectos",
      priority: "Alta",
      status: "Faltante",
      format: "CSV o MD con estado y prioridad",
      destination: "_inputs/projects/",
      description: "Lista de proyectos candidatos con propósito, rol, periodo y disponibilidad.",
      notes: "Marcar NDA, proyecto abandonado, privado o no publicable.",
      sensitivity: "Interno",
      updatedAt: "",
    },
    {
      id: "projects-metadata",
      name: "Metadatos por proyecto",
      category: "Proyectos",
      priority: "Alta",
      status: "Faltante",
      format: "MD/YAML: título, resumen, rol, año, tecnologías y estado",
      destination: "_inputs/projects/",
      description: "Datos estructurados y verificables para ordenar o agrupar proyectos.",
      notes: "No definir slugs ni rutas públicas hasta aprobar arquitectura y nombres.",
      sensitivity: "Público tras aprobación",
      updatedAt: "",
    },
    {
      id: "projects-links",
      name: "Repositorios y demos",
      category: "Proyectos",
      priority: "Media",
      status: "Faltante",
      format: "CSV o MD con URL, propietario, visibilidad y estado",
      destination: "_inputs/projects/",
      description: "Enlaces activos que demuestran el trabajo y pueden ser compartidos.",
      notes: "Revisar secretos, dependencias, disponibilidad y experiencia móvil antes de enlazar.",
      sensitivity: "Interno",
      updatedAt: "",
    },
    {
      id: "metrics-bloqio-builder",
      name: "Métricas Bloqio Builder",
      category: "Métricas",
      priority: "Crítica",
      status: "Requiere revisión",
      format: "CSV/MD + captura o fuente verificable",
      destination: "_inputs/metrics/",
      description: "Datos proporcionados: 57 usuarios y 45 páginas.",
      notes: "NO publicables. Sin fecha de corte, definición, fuente ni contexto; requieren validación y autorización.",
      sensitivity: "Confidencial",
      updatedAt: "",
    },
    {
      id: "metrics-definitions",
      name: "Diccionario de métricas",
      category: "Métricas",
      priority: "Alta",
      status: "Faltante",
      format: "MD/CSV: nombre, definición, unidad, fuente, periodo y responsable",
      destination: "_inputs/metrics/",
      description: "Definiciones que permitan interpretar cifras sin ambigüedad.",
      notes: "Distinguir usuarios, cuentas, sesiones, páginas, pantallas y entregables.",
      sensitivity: "Interno",
      updatedAt: "",
    },
    {
      id: "metrics-outcomes",
      name: "Resultados verificables adicionales",
      category: "Métricas",
      priority: "Media",
      status: "Faltante",
      format: "CSV/MD + evidencia fuente",
      destination: "_inputs/metrics/",
      description: "Impactos de producto, negocio, operación, accesibilidad o calidad.",
      notes: "Puede incluir resultados cualitativos si su método y procedencia son claros.",
      sensitivity: "Confidencial",
      updatedAt: "",
    },
    {
      id: "certifications-list",
      name: "Inventario de certificaciones",
      category: "Certificaciones",
      priority: "Media",
      status: "Faltante",
      format: "CSV/MD: nombre, entidad, emisión, vencimiento y URL",
      destination: "_inputs/certifications/",
      description: "Credenciales profesionales relevantes y vigentes.",
      notes: "No publicar identificadores personales o URLs privadas de verificación.",
      sensitivity: "Público tras aprobación",
      updatedAt: "",
    },
    {
      id: "certifications-evidence",
      name: "Evidencia de certificaciones",
      category: "Certificaciones",
      priority: "Baja",
      status: "Faltante",
      format: "PDF/PNG o URL oficial",
      destination: "_inputs/certifications/",
      description: "Comprobante legible de la credencial y su vigencia.",
      notes: "Redactar códigos o datos personales no necesarios.",
      sensitivity: "Confidencial",
      updatedAt: "",
    },
    {
      id: "legal-privacy",
      name: "Requisitos de privacidad",
      category: "Legal",
      priority: "Crítica",
      status: "Requiere revisión",
      format: "MD/PDF aprobado por responsable legal",
      destination: "_inputs/legal/",
      description: "Requisitos aplicables a contacto, analítica, almacenamiento y solicitudes de derechos.",
      notes: "No existe criterio legal proporcionado; validar antes de capturar datos.",
      sensitivity: "Interno",
      updatedAt: "",
    },
    {
      id: "legal-assets",
      name: "Licencias y derechos de activos",
      category: "Legal",
      priority: "Crítica",
      status: "Faltante",
      format: "CSV/MD + comprobantes o licencias",
      destination: "_inputs/legal/",
      description: "Procedencia y permiso de fuentes, fotos, iconos, logos, capturas y textos.",
      notes: "Registrar atribución, territorio, vigencia y restricciones cuando apliquen.",
      sensitivity: "Interno",
      updatedAt: "",
    },
    {
      id: "legal-publication-approval",
      name: "Aprobación editorial final",
      category: "Legal",
      priority: "Crítica",
      status: "Faltante",
      format: "MD/PDF/correo exportado con alcance y aprobador",
      destination: "_inputs/legal/",
      description: "Confirmación final de qué contenido puede publicarse.",
      notes: "Debe cubrir datos, métricas, testimonios, logos, capturas y contacto.",
      sensitivity: "Confidencial",
      updatedAt: "",
    },
    {
      id: "analytics-objectives",
      name: "Objetivos de medición",
      category: "Analítica",
      priority: "Alta",
      status: "Faltante",
      format: "MD con preguntas, decisiones y responsables",
      destination: "_inputs/analytics/",
      description: "Preguntas que la analítica debe responder sin recolectar datos innecesarios.",
      notes: "Alinear con ANALYTICS_PLAN.md; no elegir proveedor por defecto.",
      sensitivity: "Interno",
      updatedAt: "",
    },
    {
      id: "analytics-provider",
      name: "Proveedor y propiedad de analítica",
      category: "Analítica",
      priority: "Alta",
      status: "Requiere revisión",
      format: "MD con proveedor, responsable, región y condiciones",
      destination: "_inputs/analytics/",
      description: "Decisión sobre herramienta, cuenta propietaria, alojamiento y procesamiento.",
      notes: "No hay proveedor ni IDs definidos. Evaluar opción sin cookies y minimización de datos.",
      sensitivity: "Confidencial",
      updatedAt: "",
    },
    {
      id: "analytics-gtm-id",
      name: "ID de Google Tag Manager (GTM)",
      category: "Analítica",
      priority: "Alta",
      status: "Faltante",
      format: "Identificador GTM autorizado + cuenta responsable",
      destination: "_inputs/analytics/",
      description: "ID del contenedor GTM que se autorizaría para el sitio.",
      notes: "No hay ID configurado ni script externo activo. Validar privacidad y propiedad antes de usar.",
      sensitivity: "Confidencial",
      updatedAt: "",
    },
    {
      id: "analytics-ga4-property",
      name: "Propiedad de Google Analytics 4 (GA4)",
      category: "Analítica",
      priority: "Alta",
      status: "Faltante",
      format: "Identificador de medición/propiedad + cuenta responsable",
      destination: "_inputs/analytics/",
      description: "Propiedad GA4 y flujo web autorizados para recibir eventos.",
      notes: "No hay propiedad ni script de GA4 activo. No registrar IDs en contenido público.",
      sensitivity: "Confidencial",
      updatedAt: "",
    },
    {
      id: "analytics-search-console",
      name: "Google Search Console",
      category: "Analítica",
      priority: "Alta",
      status: "Faltante",
      format: "Propiedad, método de verificación y responsable",
      destination: "_inputs/analytics/",
      description: "Propiedad de Search Console asociada al dominio público definitivo.",
      notes: "Bloqueado hasta contar con dominio real y método de verificación autorizado.",
      sensitivity: "Confidencial",
      updatedAt: "",
    },
    {
      id: "analytics-consent",
      name: "Consentimiento de analítica",
      category: "Analítica",
      priority: "Crítica",
      status: "Requiere revisión",
      format: "MD/PDF con jurisdicciones y criterio aprobado",
      destination: "_inputs/analytics/",
      description: "Regla para activar medición, cookies y preferencias según alcance legal.",
      notes: "No desplegar analítica antes de resolver privacidad y consentimiento.",
      sensitivity: "Interno",
      updatedAt: "",
    },
    {
      id: "analytics-privacy-policy",
      name: "Política de privacidad para analítica",
      category: "Analítica",
      priority: "Crítica",
      status: "Requiere revisión",
      format: "URL o documento legal aprobado y versionado",
      destination: "_inputs/legal/",
      description: "Política que explica datos, finalidades, proveedor, retención y derechos.",
      notes: "No existe política aprobada ni URL pública; mantener analítica externa desactivada.",
      sensitivity: "Interno",
      updatedAt: "",
    },
    {
      id: "analytics-baseline",
      name: "Línea base y exclusiones",
      category: "Analítica",
      priority: "Media",
      status: "Faltante",
      format: "CSV/MD con periodo, fuente y tráfico excluido",
      destination: "_inputs/analytics/",
      description: "Referencia para interpretar evolución, pruebas y tráfico interno.",
      notes: "No existe línea base proporcionada.",
      sensitivity: "Confidencial",
      updatedAt: "",
    },
  ];

  const elements = {
    overview: document.querySelector("#overview"),
    overallProgress: document.querySelector("#overall-progress"),
    overallProgressLabel: document.querySelector("#overall-progress-label"),
    categoryProgress: document.querySelector("#category-progress"),
    saveStatus: document.querySelector("#save-status"),
    filters: document.querySelector("#filters"),
    search: document.querySelector("#search"),
    statusFilter: document.querySelector("#status-filter"),
    priorityFilter: document.querySelector("#priority-filter"),
    categoryFilter: document.querySelector("#category-filter"),
    clearFilters: document.querySelector("#clear-filters"),
    resultCount: document.querySelector("#result-count"),
    itemsBody: document.querySelector("#items-body"),
    emptyState: document.querySelector("#empty-state"),
    template: document.querySelector("#item-row-template"),
    exportButton: document.querySelector("#export-json"),
    resetButton: document.querySelector("#reset-data"),
  };

  let storageAvailable = true;
  let items = loadItems();
  let saveTimer;

  function cloneDefaults() {
    return DEFAULT_ITEMS.map((item) => ({ ...item }));
  }

  function isValidItem(item) {
    return (
      item &&
      typeof item.id === "string" &&
      typeof item.name === "string" &&
      STATUSES.includes(item.status) &&
      PRIORITIES.includes(item.priority)
    );
  }

  function loadItems() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return cloneDefaults();
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed) || !parsed.every(isValidItem)) {
        throw new Error("El catálogo guardado no tiene un formato válido.");
      }
      const savedById = new Map(parsed.map((item) => [item.id, item]));
      const merged = DEFAULT_ITEMS.map((defaultItem) => {
        const savedItem = savedById.get(defaultItem.id);
        if (!savedItem) return { ...defaultItem };
        savedById.delete(defaultItem.id);
        return {
          ...defaultItem,
          ...savedItem,
          name: defaultItem.name,
          category: defaultItem.category,
        };
      });
      return [...merged, ...savedById.values()];
    } catch (error) {
      console.warn(error);
      storageAvailable = false;
      return cloneDefaults();
    }
  }

  function saveItems() {
    window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(() => {
      if (!storageAvailable) {
        elements.saveStatus.textContent =
          "Cambios activos en memoria; almacenamiento local no disponible.";
        return;
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        elements.saveStatus.textContent = "Cambios guardados en este navegador.";
      } catch (error) {
        console.warn(error);
        storageAvailable = false;
        elements.saveStatus.textContent =
          "No se pudo guardar localmente. Exporta el JSON para conservar cambios.";
      }
    }, 180);
  }

  function option(value) {
    const node = document.createElement("option");
    node.value = value;
    node.textContent = value;
    return node;
  }

  function categories() {
    return [...new Set(items.map((item) => item.category))].sort((a, b) =>
      a.localeCompare(b, "es"),
    );
  }

  function populateStaticControls() {
    STATUSES.forEach((status) => elements.statusFilter.append(option(status)));
    refreshCategoryFilter();
  }

  function refreshCategoryFilter() {
    const selected = elements.categoryFilter.value;
    elements.categoryFilter.replaceChildren(option(""));
    elements.categoryFilter.firstElementChild.textContent = "Todas las categorías";
    categories().forEach((category) => elements.categoryFilter.append(option(category)));
    if (categories().includes(selected)) elements.categoryFilter.value = selected;
  }

  function resolved(item) {
    return RESOLVED_STATUSES.has(item.status);
  }

  function updateSummary() {
    const counts = Object.fromEntries(STATUSES.map((status) => [status, 0]));
    items.forEach((item) => {
      counts[item.status] += 1;
    });

    elements.overview.replaceChildren();
    STATUSES.forEach((status) => {
      const card = document.createElement("div");
      card.className = "overview-card";
      const count = document.createElement("strong");
      const label = document.createElement("span");
      count.textContent = counts[status];
      label.textContent = status;
      card.append(count, label);
      elements.overview.append(card);
    });

    const complete = items.filter(resolved).length;
    const percent = items.length ? Math.round((complete / items.length) * 100) : 0;
    elements.overallProgressLabel.textContent = `${complete} de ${items.length} · ${percent}%`;
    elements.overallProgress.setAttribute("aria-valuenow", String(percent));
    elements.overallProgress.querySelector("span").style.width = `${percent}%`;

    elements.categoryProgress.replaceChildren();
    categories().forEach((category) => {
      const categoryItems = items.filter((item) => item.category === category);
      const categoryComplete = categoryItems.filter(resolved).length;
      const categoryPercent = Math.round((categoryComplete / categoryItems.length) * 100);
      const wrapper = document.createElement("div");
      wrapper.className = "category-progress-item";
      wrapper.innerHTML = `
        <p><span></span><strong></strong></p>
        <div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100">
          <span></span>
        </div>
      `;
      wrapper.querySelector("p span").textContent = category;
      wrapper.querySelector("p strong").textContent =
        `${categoryComplete}/${categoryItems.length}`;
      const track = wrapper.querySelector(".progress-track");
      track.setAttribute("aria-label", `Progreso de ${category}`);
      track.setAttribute("aria-valuenow", String(categoryPercent));
      track.querySelector("span").style.width = `${categoryPercent}%`;
      elements.categoryProgress.append(wrapper);
    });
  }

  function matchesFilters(item) {
    const term = elements.search.value.trim().toLocaleLowerCase("es");
    const haystack = [
      item.name,
      item.category,
      item.status,
      item.priority,
      item.format,
      item.destination,
      item.description,
      item.notes,
      item.sensitivity,
      item.updatedAt,
    ]
      .join(" ")
      .toLocaleLowerCase("es");

    return (
      (!term || haystack.includes(term)) &&
      (!elements.statusFilter.value || item.status === elements.statusFilter.value) &&
      (!elements.priorityFilter.value ||
        item.priority === elements.priorityFilter.value) &&
      (!elements.categoryFilter.value ||
        item.category === elements.categoryFilter.value)
    );
  }

  function bindField(row, selector, item, key, onChange) {
    const field = row.querySelector(selector);
    field.value = item[key];
    field.addEventListener("change", () => {
      item[key] = field.value;
      if (onChange) onChange();
      saveItems();
    });
    if (field.matches("input[type='text'], textarea")) {
      field.addEventListener("input", () => {
        item[key] = field.value;
        saveItems();
      });
    }
    return field;
  }

  function createRow(item) {
    const row = elements.template.content.firstElementChild.cloneNode(true);
    row.dataset.itemId = item.id;
    row.dataset.resolved = String(resolved(item));
    row.querySelector(".item-id").textContent = item.id;

    const categorySelect = row.querySelector(".item-category");
    categories().forEach((category) => categorySelect.append(option(category)));
    const statusSelect = row.querySelector(".item-status");
    STATUSES.forEach((status) => statusSelect.append(option(status)));

    bindField(row, ".item-name", item, "name");
    bindField(row, ".item-category", item, "category", () => {
      refreshCategoryFilter();
      render();
    });
    bindField(row, ".item-priority", item, "priority", render);
    bindField(row, ".item-status", item, "status", render);
    bindField(row, ".item-description", item, "description");
    bindField(row, ".item-format", item, "format");
    bindField(row, ".item-destination", item, "destination");
    bindField(row, ".item-sensitivity", item, "sensitivity");
    bindField(row, ".item-updated", item, "updatedAt");
    bindField(row, ".item-notes", item, "notes");

    return row;
  }

  function render() {
    const visibleItems = items.filter(matchesFilters);
    elements.itemsBody.replaceChildren(...visibleItems.map(createRow));
    elements.resultCount.textContent =
      `${visibleItems.length} de ${items.length} ítems visibles`;
    elements.emptyState.hidden = visibleItems.length !== 0;
    updateSummary();
  }

  function clearFilters() {
    elements.filters.reset();
    render();
    elements.search.focus();
  }

  function exportJson() {
    const payload = {
      schemaVersion: 1,
      catalogue: items,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "portfolio-input-catalogue.json";
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    elements.saveStatus.textContent = "JSON exportado.";
  }

  function resetData() {
    const confirmed = window.confirm(
      "Se perderán los cambios guardados en este navegador. ¿Restablecer el catálogo inicial?",
    );
    if (!confirmed) return;
    items = cloneDefaults();
    try {
      localStorage.removeItem(STORAGE_KEY);
      storageAvailable = true;
    } catch (error) {
      console.warn(error);
      storageAvailable = false;
    }
    refreshCategoryFilter();
    clearFilters();
    elements.saveStatus.textContent = "Catálogo inicial restablecido.";
  }

  populateStaticControls();
  render();
  elements.saveStatus.textContent = storageAvailable
    ? "Los cambios se guardan en este navegador."
    : "Almacenamiento local no disponible; usa Exportar JSON.";

  elements.filters.addEventListener("input", render);
  elements.filters.addEventListener("change", render);
  elements.clearFilters.addEventListener("click", clearFilters);
  elements.exportButton.addEventListener("click", exportJson);
  elements.resetButton.addEventListener("click", resetData);
})();
