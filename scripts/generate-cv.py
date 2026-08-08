from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.platypus import BaseDocTemplate, Frame, PageBreak, PageTemplate, Paragraph, Spacer


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "cv" / "Jossue-Alcala-CV.pdf"
BLUE = colors.HexColor("#1F417E")
INK = colors.HexColor("#181818")
MUTED = colors.HexColor("#5B5B5B")
PALE = colors.HexColor("#F2F5FA")
PAGE_WIDTH, PAGE_HEIGHT = letter


def paragraph(text, style):
    return Paragraph(text, style)


def entry(title, period, bullets, styles):
    story = [paragraph(f'<b>{title}</b> <font color="#5B5B5B">| {period}</font>', styles["entry"]), Spacer(1, 2)]
    story.extend(paragraph(f'•&nbsp;&nbsp;{bullet}', styles["bullet"]) for bullet in bullets)
    story.append(Spacer(1, 6))
    return story


def draw_first_page(canvas, _document):
    canvas.saveState()
    canvas.setFillColor(BLUE)
    canvas.setFont("Helvetica-Bold", 21)
    canvas.drawCentredString(PAGE_WIDTH / 2, 742, "JOSSUÉ ALCALÁ")

    canvas.setFillColor(INK)
    canvas.setFont("Helvetica-Bold", 14)
    canvas.drawCentredString(PAGE_WIDTH / 2, 716, "Head of E-commerce & Digital Growth")

    contact = "+52 33 1632 6710  |  hola@jossuealcala.com  |  linkedin.com/in/jossue-alcala  |  jossuealcala.com"
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 8.8)
    canvas.drawCentredString(PAGE_WIDTH / 2, 695, contact)
    canvas.setStrokeColor(colors.HexColor("#D7DCE5"))
    canvas.line(44, 682, PAGE_WIDTH - 44, 682)
    canvas.restoreState()


def draw_later_pages(canvas, _document):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor("#D7DCE5"))
    canvas.line(44, 752, PAGE_WIDTH - 44, 752)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 8)
    canvas.drawRightString(PAGE_WIDTH - 44, 763, "Jossué Alcalá - CV")
    canvas.restoreState()


def build_cv():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(
        name="summary",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=10.4,
        leading=15.2,
        textColor=INK,
        backColor=PALE,
        borderPadding=9,
        spaceAfter=12,
    ))
    styles.add(ParagraphStyle(
        name="section",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=12.5,
        leading=15,
        textColor=BLUE,
        spaceBefore=3,
        spaceAfter=6,
    ))
    styles.add(ParagraphStyle(
        name="entry",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=10.5,
        leading=13.2,
        textColor=INK,
        spaceBefore=1,
        spaceAfter=0,
    ))
    styles.add(ParagraphStyle(
        name="bullet",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=9.8,
        leading=13.2,
        leftIndent=14,
        firstLineIndent=-12,
        textColor=INK,
        spaceAfter=1,
    ))
    styles.add(ParagraphStyle(
        name="small",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=9.4,
        leading=12.8,
        textColor=INK,
        spaceAfter=2,
    ))

    document = BaseDocTemplate(
        str(OUTPUT),
        pagesize=letter,
        leftMargin=44,
        rightMargin=44,
        topMargin=44,
        bottomMargin=40,
        title="Jossue Alcala - CV",
        author="Jossue Alcala",
    )
    document.addPageTemplates([
        PageTemplate(
            id="first",
            frames=[Frame(44, 42, PAGE_WIDTH - 88, 620, id="first-content")],
            onPage=draw_first_page,
            autoNextPageTemplate="later",
        ),
        PageTemplate(
            id="later",
            frames=[Frame(44, 42, PAGE_WIDTH - 88, 700, id="later-content")],
            onPage=draw_later_pages,
        ),
    ])

    story = [
        paragraph(
            "Líder de ecommerce con más de ocho años de experiencia en growth, paid media, SEO, CRO y producto Shopify. "
            "Combino responsabilidad comercial con ejecución técnica para conectar adquisición, experiencia de compra, datos y automatización en sistemas que el equipo puede operar y mejorar.",
            styles["summary"],
        ),
        paragraph("COMPETENCIAS CLAVE", styles["section"]),
    ]
    skills = [
        "Shopify, Liquid, Theme Customization, Theme App Extensions, App Embeds y Shopify CLI.",
        "E-commerce growth, CRO, UX comercial, PDP, PLP, search, trust, cart drawers, sticky ATC y landing systems.",
        "HTML, CSS, JavaScript/TypeScript, React, Node, PostgreSQL, GitHub, Railway y Cloudflare.",
        "Performance marketing, paid media, SEO, GA4, GTM, Search Console, SEMrush, Looker Studio, Odoo y Klaviyo.",
        "IA aplicada, Growth OS, MCPs, dashboards, QA, handoffs y documentación operativa con aprobación humana.",
    ]
    story.extend(paragraph(f'•&nbsp;&nbsp;{skill}', styles["bullet"]) for skill in skills)
    story.extend([Spacer(1, 7), paragraph("EXPERIENCIA PROFESIONAL", styles["section"])])
    story.extend(entry(
        "Head of E-commerce & Digital Growth - WU Nutrition / Come Verde",
        "Nov 2025 - Actualidad",
        [
            "Lidero la estrategia y operación de ecommerce y growth digital para WU Nutrition (Shopify DTC) y Come Verde (CPG, retail y marketplaces), con responsabilidad de presupuesto y P&amp;L del canal.",
            "Conecto storefront, CRO, paid media, CRM, analítica, marketplaces y documentación operativa en un sistema de decisión compartido.",
            "Diseño e implemento componentes Shopify para PDP, PLP, landing pages, cart drawer, sticky ATC y señales de confianza, con enfoque mobile-first.",
            "Opero Growth OS y una capa de IA con scorecards, auditorías, automatizaciones, guardrails y aprobación humana.",
            "Coordino estrategia comercial, activaciones y medición diferenciando KPIs DTC de objetivos CPG como marca, distribución y rotación.",
        ],
        styles,
    ))
    story.extend(entry(
        "Fundador / Shopify Product Builder - Bloqio",
        "2026 - Actualidad",
        [
            "Conceptualizo y desarrollo productos digitales orientados a conversión para merchants Shopify.",
            "Construyo apps CRO con Theme App Extensions, administración embedded, QA y flujos de configuración para storefronts reales.",
            "Coordino producto, UX, desarrollo y despliegue con React, TypeScript, Shopify CLI, GitHub, Railway y Cloudflare.",
        ],
        styles,
    ))
    story.extend(entry(
        "Coordinador de Proyectos Digitales - Corporativo IMT",
        "Mar 2025 - Nov 2025",
        [
            "Lideré estrategia de marketing digital, desarrollo web comercial y branding para ocho marcas.",
            "Diseñé estrategias multicanal de paid media y SEO para captar leads calificados y diversificar adquisición.",
        ],
        styles,
    ))

    story.append(PageBreak())
    story.extend(entry(
        "Digital Sales Account Manager - HP Inc.",
        "Nov 2021 - Feb 2025",
        [
            "Diseñé estrategias comerciales y de demanda para retailers clave en México y Perú, con +21% ventas/Q en México y +35% en Perú.",
            "Lideré estrategia comercial con impacto en participación de mercado: +4% HP México (2024) y +6% HP Perú.",
            "Impulsé crecimiento del canal online y coordiné campañas omnicanal en temporadas clave.",
            "Gestioné compra de medios digitales segmentados para soportar objetivos comerciales.",
        ],
        styles,
    ))
    story.extend(entry(
        "Senior Paid Media - Farmalisto México",
        "Oct 2020 - Nov 2021",
        [
            "Lideré estrategia de awareness y posicionamiento digital, logrando +22% en conversión mediante medios pagados en plataformas CPC.",
            "Gestioné adquisición multicanal y estrategias SEO con presupuestos de medios superiores a $1 MDP/mes.",
        ],
        styles,
    ))
    story.extend([
        paragraph("EXPERIENCIA ADICIONAL", styles["section"]),
        paragraph("Estratega SEM - Estrasol (Mar 2019 - Oct 2020) &nbsp;|&nbsp; Brand Manager - Grupo Megamex (Ene 2017 - Mar 2019)", styles["small"]),
        Spacer(1, 6),
        paragraph("EDUCACION Y CERTIFICACIONES", styles["section"]),
    ])
    education = [
        "Licenciatura en Mercadotecnia - Universidad de Guadalajara | 2013 - 2018.",
        "Bachillerato Especializado en Sistemas y Redes - COBAEJ | 2009 - 2012.",
        "Fundamentos de Prompting para IA, Publicidad en Motores de Búsqueda, Google Analytics y Tag Manager - Google Academy | 2025.",
        "Prácticas Éticas Comerciales y Desarrollo de Estrategias Producto-Precio - HP Education Services | 2023.",
    ]
    story.extend(paragraph(f'•&nbsp;&nbsp;{item}', styles["bullet"]) for item in education)
    story.extend([
        Spacer(1, 6),
        paragraph("IDIOMAS", styles["section"]),
        paragraph("•&nbsp;&nbsp;Español nativo | Inglés B1", styles["small"]),
        Spacer(1, 6),
        paragraph("ENLACES", styles["section"]),
        paragraph("•&nbsp;&nbsp;LinkedIn: linkedin.com/in/jossue-alcala", styles["small"]),
        paragraph("•&nbsp;&nbsp;Portafolio: jossuealcala.com", styles["small"]),
    ])
    document.build(story)


if __name__ == "__main__":
    build_cv()
