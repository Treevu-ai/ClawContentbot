# Embudo de conversión — Taller Mayo 2026

Objetivo: saber **de dónde viene la intención** y **en qué paso se pierde**, sin depender solo de sensación.

**Ya preparado en esta carpeta:** pegá tu URL en [`url-publica.txt`](./url-publica.txt), copiá enlaces con UTMs desde [`utms-listos.md`](./utms-listos.md), y registrá números en [`seguimiento-semanal.csv`](./seguimiento-semanal.csv) (y opcional [`seguimiento-diario.csv`](./seguimiento-diario.csv)).

## Definiciones (acordá definiciones una vez y no las cambies hasta después del lanzamiento)

| Concepto | Definición práctica |
|----------|---------------------|
| **Impresión / Alcance** | Quien ve el mensaje (post, DM, historia). Solo útil como numerador débil. |
| **Click** | Clic explícito en link con tracking (landing, grupo, bot, WhatsApp rastreado). |
| **Lead** | Persona que escribe por WhatsApp o Telegram con intención de información o compra (no spam). |
| **Asiento reservado / Lista de espera** | Solo si tenés ese paso formal. |
| **Pago confirmado** | Transferencia vista + datos del inscrito registrados en tu tabla. |

## Convención de UTMs (landing y enlaces públicos)

Usá siempre **`utm_campaign=taller-mayo-2026`** para poder filtrar después.

| Parámetro | Valores sugeridos |
|-----------|---------------------|
| `utm_source` | `linkedin`, `telegram`, `whatsapp`, `instagram`, `email`, `organic`, `referido` |
| `utm_medium` | `post`, `story`, `bio`, `dm`, `group`, `newsletter`, `ad` |
| `utm_content` | `dia0-anuncio`, `post-problema`, `wa-reminder`, `faq` (algo que reconozcas en el calendario) |

**Ejemplo** (usá la misma base que en `url-publica.txt`; lista completa en `utms-listos.md`):

`BASE?utm_source=linkedin&utm_medium=post&utm_campaign=taller-mayo-2026&utm_content=post-problema`

### WhatsApp / Telegram sin página intermedia

`social` no permite UTMs estándar en `wa.me`. Equivalente práctico:

- **Texto prefijado distinto por canal**, para saber origen cuando te escriben:

  - LinkedIn: `...?text=Hola%2C%20vi%20tu%20post%20en%20LinkedIn%20sobre%20el%20taller`
  - Telegram: `...?text=Hola%2C%20vengo%20del%20grupo%20de%20Telegram`

Así podés etiquetar manualmente el lead en tu tabla.

## Tabla semanal (copiar a Notion, Google Sheets o papel)

**Semana del:** _______________

| Día | Canal | Acción publicada | Clics / vistas (si tenés) | Conversaciones nuevas (WA/TG) | Pagos del día | Notas |
|-----|-------|------------------|---------------------------|-------------------------------|-----------------|-------|
| Lun | | | | | | |
| Mar | | | | | | |
| … | | | | | | |

**Totales semana:** conversaciones __ | pagos __ | monto USD __

## Reglas de uso (5 min/semana)

1. **Una vez por semana** (viernes): completar filas y sumar.
2. **Un número que importe:** conversaciones → pagos (tasa de cierre aproximada).
3. Si no medís clics, **solo** conversaciones + pagos ya te dan señal de canal.

## Opcional (sin código)

- **Google Analytics 4** en la landing: evento `generate_lead` cuando envían formulario (si tenés formulario).
- **Bitly / short link** por canal con el mismo destino (un link por post).

---

*Documento operativo; actualizar URL y fechas según tu publicación real.*
