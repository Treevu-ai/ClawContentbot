#!/usr/bin/env python3
"""Generate PDF and PNG slide images from Taller Mayo 2026 slides."""

from reportlab.lib.pagesizes import landscape, A4
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import Paragraph
import os

# Page size (16:9 landscape for slides)
W, H = landscape(A4)  # ~842 x 595

# Colors
BG = HexColor('#050814')
CYAN = HexColor('#00f5ff')
PURPLE = HexColor('#a855f7')
ORANGE = HexColor('#ff6b35')
PINK = HexColor('#f472b6')
TEXT = HexColor('#e2e8f0')
MUTED = HexColor('#94a3b8')
SURFACE = HexColor('#0d1424')

def draw_gradient_bar(c, y, h=4):
    """Draw a gradient color bar."""
    c.setFillColor(CYAN)
    c.rect(0, y, W/3, h, fill=1, stroke=0)
    c.setFillColor(PURPLE)
    c.rect(W/3, y, W/3, h, fill=1, stroke=0)
    c.setFillColor(PINK)
    c.rect(2*W/3, y, W/3, h, fill=1, stroke=0)

def grad_text(c, text, x, y, size, max_width=None):
    """Draw gradient text approximation (solid purple for simplicity)."""
    c.setFillColor(PURPLE)
    c.setFont("Helvetica-Bold", size)
    c.drawCentredString(x, y, text)

def slide_bg(c):
    c.setFillColor(BG)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    # Subtle grid
    c.setStrokeColor(HexColor('#ffffff06'))
    c.setLineWidth(0.5)
    for xi in range(0, int(W), 50):
        c.line(xi, 0, xi, H)
    for yi in range(0, int(H), 50):
        c.line(0, yi, W, yi)
    # Purple glow top center
    c.setFillColor(HexColor('#a855f726'))
    c.ellipse(W/2-300, H-100, W/2+300, H+50, fill=1, stroke=0)

def header_bar(c):
    c.setFillColor(SURFACE)
    c.rect(0, H-50, W, 50, fill=1, stroke=0)
    c.setFillColor(PURPLE)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(30, H-32, "🤖  TALLER AI 2026")
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 11)
    c.drawRightString(W-30, H-32, "taller.ai · Mayo 2026")

def footer_bar(c, page_num, total):
    c.setFillColor(SURFACE)
    c.rect(0, 0, W, 40, fill=1, stroke=0)
    draw_gradient_bar(c, 40)
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 10)
    c.drawRightString(W-30, 15, f"{page_num} / {total}")

def title_block(c, title, subtitle=None):
    # Title
    c.setFillColor(PURPLE)
    c.setFont("Helvetica-Bold", 42)
    # Split title by line
    lines = title.split('\n')
    y_pos = H/2 + 80
    for line in lines:
        c.drawCentredString(W/2, y_pos, line.strip())
        y_pos -= 50
    # Subtitle
    if subtitle:
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 18)
        c.drawCentredString(W/2, y_pos - 20, subtitle)

def draw_card(c, x, y, w, h, title, desc, color=PURPLE):
    c.setFillColor(SURFACE)
    c.roundRect(x, y, w, h, 12, fill=1, stroke=0)
    c.setStrokeColor(color)
    c.setLineWidth(1)
    c.roundRect(x, y, w, h, 12, fill=0, stroke=1)
    c.setFillColor(color)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(x+15, y+h-25, title)
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 10)
    # Wrap desc text
    words = desc.split()
    line = ''
    line_y = y+h-45
    for word in words:
        test = line + ' ' + word
        if len(test) < 38:
            line = test
        else:
            c.drawString(x+15, line_y, line.strip())
            line_y -= 15
            line = word
            if line_y < y+15:
                break
    if line:
        c.drawString(x+15, line_y, line.strip())

def badge(c, x, y, text, color=CYAN):
    c.setFillColor(HexColor('#00f5ff15'))
    c.setStrokeColor(color)
    c.setLineWidth(1)
    c.roundRect(x-15, y-8, len(text)*8+30, 28, 20, fill=1, stroke=1)
    c.setFillColor(color)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(x, y+4, text)

# ---- SLIDE DEFINITIONS ----
slides = [
    {
        'title': 'CONSTRUYE TU STARTUP\nSIN ESCRIBIR CÓDIGO',
        'subtitle': 'De idea a landing live en 4 sesiones en vivo.\nAprende AI agéntica con Claude, Stitch, Cursor y GitHub.',
        'badge': '📅  6–16 Mayo 2026  ·  Mié + Vie  ·  7–9 PM Lima',
    },
    {
        'title': 'MIÉRCOLES Y VIERNES',
        'subtitle': '7–9 PM Lima  ·  Online en vivo  ·  Grabadas',
        'badge': '⏰  Horario confirmado · Sesión 0: Mayo 6 mediodía',
    },
    {
        'title': 'NO NECESITAS SABER\nPROGRAMAR',
        'subtitle': 'Tu único requisito: tener una idea.\nTodo lo demás lo hace la AI por ti.',
        'cards': [
            ('✍️  Escribí en lenguaje natural', 'Le decís a Claude qué querés y genera el código'),
            ('🎨  Stitch diseña tu UI', 'Descripción → Diseño profesional en minutos'),
            ('⚡  Cursor completa el código', 'Autocompletado inteligente, sin escribir caracteres'),
        ]
    },
    {
        'title': 'TU ROADMAP EN 11 DÍAS',
        'subtitle': '5 sesiones · Primer commit el Día 1',
        'sessions': [
            ('SESIÓN 0', 'Setup (Mayo 6)', 'Configurá Claude, Cursor, GitHub y Stitch. Primer commit antes de terminar.'),
            ('SESIÓN 01', 'Business Canvas con AI', 'Tu cliente ideal, propuesta de valor y canales definidos.'),
            ('SESIÓN 02', 'Valida tu Idea', 'Entrevistas sintéticas, análisis de mercado.'),
            ('SESIÓN 03', 'Diseña tu MVP', 'De wireframe a UI con Google Stitch.'),
            ('SESIÓN 04', 'Build & Launch', 'Deploy de tu landing. Formulario y analytics.'),
        ]
    },
    {
        'title': 'EL STACK DEL TALLER',
        'subtitle': 'Todas herramientas gratuitas o con trial.\nSin suscripciones obligatorias.',
        'tools': [
            ('🤖', 'Claude', 'Tu co-fundador AI. Estrategia, copy, código y análisis.'),
            ('🎨', 'Google Stitch', 'Diseño de interfaces con AI. De texto a UI profesional.'),
            ('⚡', 'Cursor', 'IDE potenciado por AI. Escribe código real sin saber.'),
            ('🐙', 'GitHub Pages', 'Publicá tu landing gratis. Versioná tu startup.'),
        ]
    },
    {
        'title': 'EN 11 DÍAS VAS A TERMINAR',
        'subtitle': 'Solo necesitás una idea. Te entregamos el resto.',
        'stats': [
            ('4', 'Sesiones en vivo'),
            ('8h', 'De formación'),
            ('1', 'Landing live'),
            ('0', 'Líneas de código manual'),
        ]
    },
    {
        'title': 'GEO: SÉ CITADO POR LA AI',
        'subtitle': 'No solo posicionarte en Google.\nSé fuente de referencia para ChatGPT, Perplexity y Google AI.',
        'geo_points': [
            ('01', 'Contenido que la AI cita', 'Listas, comparativas y datos verificables. Formatos que los motores generativos prefieren.'),
            ('02', 'Estructura legible por máquinas', 'Headers jerárquicos, Markdown y datos verificables. Comprensible para cualquier LLM.'),
            ('03', 'Autoridad externa', 'Reseñas, menciones en terceros. La AI cita fuentes reconocidas.'),
        ]
    },
    {
        'title': 'TU ENTREGABLE FINAL',
        'subtitle': 'Al terminar el taller tenés:',
        'items': [
            ('✓', 'Landing live y funcionando', 'Con formulario, analytics y lista de espera'),
            ('✓', 'Business Canvas validado', 'Con cliente ideal, propuesta de valor y canales'),
            ('✓', 'Roadmap de 90 días', 'Tu plan de crecimiento post-taller'),
            ('✓', 'Acceso a la comunidad', 'Grupo privado con otros founders'),
        ]
    },
    {
        'title': 'ELEGÍ TU PLAN',
        'subtitle': 'Plazas limitadas · Precio sube conforme se llenan',
        'prices': [
            ('ESENCIAL', 'US$97', ['4 sesiones grabadas', 'Acceso grupo privado', 'Templates y prompts', 'Soporte WhatsApp']),
            ('FULL ACCESS', 'US$197', ['Todo lo del Esencial', 'Revisión Business Canvas', 'Feedback en tu MVP', 'Sesión Q&A extra']),
            ('INTENSIVO', 'US$497', ['Todo lo de Full Access', '2 mentorías 1:1', 'Plan de 90 días', 'Soporte 30 días']),
        ]
    },
    {
        'title': 'PARA QUIÉN ES\nESTE TALLER',
        'subtitle': '',
        'items': [
            ('✓', 'Emprendedores con idea', 'Tenés una idea pero no sabés cómo empezar a construirla.'),
            ('✓', 'Profesionales en transición', 'Querés lanzar un proyecto paralelo sin dejar tu trabajo.'),
            ('✓', 'PYMEs que quieren digitalizarse', 'Querés entender cómo la AI puede acelerar tu negocio.'),
            ('✗', 'NO es para vos si...', 'Ya tenés una startup funcionando con equipo técnico.'),
        ]
    },
    {
        'title': 'TU STARTUP EMPIEZA\nEL 6 DE MAYO',
        'subtitle': '11 días. 4 sesiones. Una landing live.\nLas plazas se llenan rápido.',
        'cta': 'QUIERO MI LUGAR AHORA →',
        'contact': '+51 903 176 598  ·  WhatsApp',
        'payment': '💳 Transferencia BCP: 570-05165126-0-53  ·  Yape  ·  Plin  ·  PayPal',
    },
]

# ---- GENERATE PDF ----
output_dir = os.path.dirname(os.path.abspath(__file__))
pdf_path = os.path.join(output_dir, 'slides.pdf')
png_dir = os.path.join(output_dir, 'slides_png')

os.makedirs(png_dir, exist_ok=True)

c = canvas.Canvas(pdf_path, pagesize=landscape(A4))

for i, slide in enumerate(slides):
    page_num = i + 1
    total = len(slides)
    
    slide_bg(c)
    header_bar(c)
    footer_bar(c, page_num, total)
    
    # Badge
    if 'badge' in slide:
        c.setFillColor(HexColor('#00f5ff12'))
        c.setStrokeColor(CYAN)
        c.setLineWidth(1)
        badge_text = slide['badge']
        bw = len(badge_text) * 7 + 30
        c.roundRect(W/2 - bw/2, H/2 - 130, bw, 30, 20, fill=1, stroke=1)
        c.setFillColor(CYAN)
        c.setFont("Helvetica", 12)
        c.drawCentredString(W/2, H/2 - 122, badge_text)
    
    # Title
    title_lines = slide['title'].split('\n')
    y_start = H/2 + 60
    for line in title_lines:
        c.setFillColor(PURPLE)
        c.setFont("Helvetica-Bold", 40)
        c.drawCentredString(W/2, y_start, line.strip())
        y_start -= 52
    
    # Subtitle
    if 'subtitle' in slide and slide['subtitle']:
        for line in slide['subtitle'].split('\n'):
            c.setFillColor(MUTED)
            c.setFont("Helvetica", 18)
            c.drawCentredString(W/2, y_start - 10, line)
            y_start -= 28
    
    # Cards (for slide 3)
    if 'cards' in slide:
        card_w = 220
        card_h = 90
        gap = 20
        start_x = (W - (3*card_w + 2*gap)) / 2
        colors = [CYAN, PURPLE, ORANGE]
        for ci, (ctitle, cdesc) in enumerate(slide['cards']):
            cx = start_x + ci * (card_w + gap)
            cy = 90
            c.setFillColor(SURFACE)
            c.setStrokeColor(colors[ci])
            c.setLineWidth(1.5)
            c.roundRect(cx, cy, card_w, card_h, 10, fill=1, stroke=1)
            c.setFillColor(colors[ci])
            c.setFont("Helvetica-Bold", 12)
            c.drawString(cx+12, cy+card_h-22, ctitle)
            c.setFillColor(MUTED)
            c.setFont("Helvetica", 10)
            words = cdesc.split()
            ly = cy+card_h-40
            line = ''
            for word in words:
                test = line + ' ' + word
                if len(test) < 30:
                    line = test
                else:
                    c.drawString(cx+12, ly, line.strip())
                    ly -= 14
                    line = word
            if line:
                c.drawString(cx+12, ly, line.strip())
    
    # Sessions (for slide 4)
    if 'sessions' in slide:
        colors = [MUTED, CYAN, PURPLE, ORANGE, PINK]
        for si, (snum, sname, sdesc) in enumerate(slide['sessions']):
            sy = H - 90 - si * 80
            # Number box
            c.setFillColor(HexColor('#ffffff0a'))
            c.setStrokeColor(colors[si])
            c.roundRect(50, sy-28, 60, 45, 8, fill=1, stroke=1)
            c.setFillColor(colors[si])
            c.setFont("Helvetica-Bold", 14)
            c.drawCentredString(80, sy+2, snum)
            # Session name
            c.setFillColor(TEXT)
            c.setFont("Helvetica-Bold", 15)
            c.drawString(130, sy+2, sname)
            # Desc
            c.setFillColor(MUTED)
            c.setFont("Helvetica", 11)
            c.drawString(130, sy-18, sdesc)
    
    # Tools (for slide 5)
    if 'tools' in slide:
        card_w = 175
        card_h = 130
        gap = 15
        start_x = (W - (4*card_w + 3*gap)) / 2
        for ti, (icon, tname, tdesc) in enumerate(slide['tools']):
            tx = start_x + ti * (card_w + gap)
            ty = 70
            c.setFillColor(SURFACE)
            c.roundRect(tx, ty, card_w, card_h, 12, fill=1, stroke=0)
            c.setStrokeColor(PURPLE)
            c.setLineWidth(0.5)
            c.roundRect(tx, ty, card_w, card_h, 12, fill=0, stroke=1)
            c.setFont("Helvetica", 28)
            c.drawCentredString(tx + card_w/2, ty+card_h-35, icon)
            c.setFillColor(TEXT)
            c.setFont("Helvetica-Bold", 13)
            c.drawCentredString(tx + card_w/2, ty+card_h-60, tname)
            # Wrap desc
            c.setFillColor(MUTED)
            c.setFont("Helvetica", 9)
            words = tdesc.split()
            ly = ty+card_h-78
            line = ''
            for word in words:
                test = line + ' ' + word
                if len(test) < 25:
                    line = test
                else:
                    c.drawCentredString(tx + card_w/2, ly, line.strip())
                    ly -= 13
                    line = word
            if line:
                c.drawCentredString(tx + card_w/2, ly, line.strip())
    
    # Stats (for slide 6)
    if 'stats' in slide:
        stat_w = 160
        stat_h = 120
        gap = 20
        start_x = (W - (4*stat_w + 3*gap)) / 2
        stat_colors = [ORANGE, CYAN, PURPLE, PINK]
        for si, (snum, slabel) in enumerate(slide['stats']):
            sx = start_x + si * (stat_w + gap)
            sy = 100
            c.setFillColor(SURFACE)
            c.roundRect(sx, sy, stat_w, stat_h, 12, fill=1, stroke=0)
            c.setStrokeColor(stat_colors[si])
            c.setLineWidth(1)
            c.roundRect(sx, sy, stat_w, stat_h, 12, fill=0, stroke=1)
            c.setFillColor(stat_colors[si])
            c.setFont("Helvetica-Bold", 42)
            c.drawCentredString(sx + stat_w/2, sy + stat_h - 55, snum)
            c.setFillColor(MUTED)
            c.setFont("Helvetica", 12)
            c.drawCentredString(sx + stat_w/2, sy + 20, slabel)
    
    # GEO points (for slide 7)
    if 'geo_points' in slide:
        gp_colors = [CYAN, PURPLE, PINK]
        for gi, (gnum, gtitle, gdesc) in enumerate(slide['geo_points']):
            gx = 60
            gy = H - 100 - gi * 100
            c.setFillColor(HexColor('#00f5ff08'))
            c.setStrokeColor(gp_colors[gi])
            c.setLineWidth(1)
            c.roundRect(gx, gy-28, W-120, 85, 10, fill=1, stroke=1)
            c.setFillColor(gp_colors[gi])
            c.setFont("Helvetica-Bold", 28)
            c.drawString(gx+15, gy+35, gnum)
            c.setFillColor(TEXT)
            c.setFont("Helvetica-Bold", 14)
            c.drawString(gx+65, gy+35, gtitle)
            c.setFillColor(MUTED)
            c.setFont("Helvetica", 11)
            # Wrap desc
            words = gdesc.split()
            ly = gy+12
            line = ''
            for word in words:
                test = line + ' ' + word
                if len(test) < 100:
                    line = test
                else:
                    c.drawString(gx+65, ly, line.strip())
                    ly -= 14
                    line = word
            if line:
                c.drawString(gx+65, ly, line.strip())
    
    # Items (for slides 8, 10)
    if 'items' in slide:
        item_colors = [CYAN, PURPLE, ORANGE, PINK]
        for ii, (iicon, ititle, idesc) in enumerate(slide['items']):
            ix = 80
            iy = H - 95 - ii * 78
            c.setFillColor(HexColor('#ffffff08'))
            c.setStrokeColor(item_colors[ii % len(item_colors)])
            c.setLineWidth(1)
            c.roundRect(ix, iy-28, W-160, 65, 10, fill=1, stroke=1)
            c.setFillColor(item_colors[ii % len(item_colors)])
            c.setFont("Helvetica-Bold", 16)
            c.drawString(ix+15, iy+22, iicon)
            c.setFillColor(TEXT)
            c.setFont("Helvetica-Bold", 14)
            c.drawString(ix+50, iy+22, ititle)
            c.setFillColor(MUTED)
            c.setFont("Helvetica", 11)
            c.drawString(ix+50, iy, idesc)
    
    # Prices (for slide 9)
    if 'prices' in slide:
        pc_colors = [MUTED, PURPLE, ORANGE]
        pw = 220
        ph = 200
        gap = 20
        start_x = (W - (3*pw + 2*gap)) / 2
        for pi, (ptier, pprice, pfeatures) in enumerate(slide['prices']):
            px = start_x + pi * (pw + gap)
            py = 70
            featured = pi == 1
            bg_col = HexColor('#a855f712') if featured else SURFACE
            c.setFillColor(bg_col)
            c.setStrokeColor(pc_colors[pi])
            c.setLineWidth(1.5 if featured else 0.5)
            c.roundRect(px, py, pw, ph, 14, fill=1, stroke=1)
            # Tier
            c.setFillColor(pc_colors[pi])
            c.setFont("Helvetica", 10)
            c.drawCentredString(px+pw/2, py+ph-22, ptier)
            # Price
            price_col = pc_colors[pi]
            c.setFillColor(price_col)
            c.setFont("Helvetica-Bold", 36)
            c.drawCentredString(px+pw/2, py+ph-65, pprice)
            # Features
            c.setFillColor(MUTED)
            c.setFont("Helvetica", 10)
            fy = py+ph-90
            for feat in pfeatures:
                c.drawString(px+15, fy, '✓  ' + feat)
                fy -= 18
        # Payment info
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 11)
        c.drawCentredString(W/2, 55, '💳 Yape · Plin · BCP · PayPal disponible')
    
    # CTA slide (11)
    if 'cta' in slide:
        c.setFillColor(CYAN)
        c.setFont("Helvetica-Bold", 20)
        c.drawCentredString(W/2, 160, slide['cta'])
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 14)
        c.drawCentredString(W/2, 135, slide['contact'])
        # Payment box
        c.setFillColor(HexColor('#00f5ff08'))
        c.setStrokeColor(CYAN)
        c.setLineWidth(0.5)
        c.roundRect(W/2-250, 65, 500, 30, 8, fill=1, stroke=1)
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 10)
        c.drawCentredString(W/2, 78, slide['payment'])
    
    c.showPage()

c.save()
print(f"PDF generado: {pdf_path}")

# Generate PNGs (using pdf2image or similar - try poppler)
try:
    import subprocess
    result = subprocess.run(['pdftoppm', '-r', '150', '-png', pdf_path, png_dir + '/slide'], 
                          capture_output=True, text=True, timeout=30)
    if result.returncode == 0:
        print(f"PNGs generados en: {png_dir}")
    else:
        print("pdftoppm no disponible, saltando PNGs")
except FileNotFoundError:
    print("poppler-utils no encontrado, saltando PNGs")
except Exception as e:
    print(f"Error generando PNGs: {e}")

print("DONE")