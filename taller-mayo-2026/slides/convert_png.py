#!/usr/bin/env python3
"""Convert slides.pdf to PNG images using Pillow (reads PDF via img.MAX_IMAGE_PIXELS)."""
import os
from PIL import Image
import io

pdf_path = os.path.join(os.path.dirname(__file__), 'slides.pdf')
png_dir = os.path.dirname(__file__)

if not os.path.exists(pdf_path):
    print(f"PDF no encontrado: {pdf_path}")
    exit(1)

# Try pdf2image (uses poppler)
try:
    from pdf2image import convert_from_path
    images = convert_from_path(pdf_path, dpi=150, fmt='png')
    for i, img in enumerate(images):
        out_path = os.path.join(png_dir, f'slide_{i+1:02d}.png')
        img.save(out_path, 'PNG')
        print(f"Guardado: {out_path}")
    print(f"Total: {len(images)} PNGs")
except ImportError:
    pass

# Try pillow PDF plugin
try:
    from PIL import PdfImagePlugin
    img = Image.open(pdf_path)
    pages = 0
    while True:
        try:
            page_path = os.path.join(png_dir, f'slide_{pages+1:02d}.png')
            # Render at 150 DPI (842x595 * 1.5 ~= 1263x892)
            from PIL import Image
            page = img.convert('RGB')
            # DPI scaling
            page = page.resize((1263, 892), Image.LANCZOS)
            page.save(page_path, 'PNG', dpi=(150, 150))
            print(f"Guardado: {page_path}")
            pages += 1
            img.seek(img.tell() + 1)
        except EOFError:
            break
    if pages > 0:
        print(f"Total: {pages} PNGs (via Pillow)")
except Exception as e:
    print(f"Pillow PDF no soportado: {e}")

# Fallback: try PyMuPDF (fitz)
try:
    import fitz
    doc = fitz.open(pdf_path)
    for i, page in enumerate(doc):
        pix = page.get_pixmap(dpi=150)
        out_path = os.path.join(png_dir, f'slide_{i+1:02d}.png')
        pix.save(out_path)
        print(f"Guardado: {out_path}")
    print(f"Total: {len(doc)} PNGs (via PyMuPDF)")
except ImportError:
    print("PyMuPDF no disponible")
except Exception as e:
    print(f"Error PyMuPDF: {e}")

print("DONE")