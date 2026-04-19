# GUÍA DE SESIONES — TALLER MAYO 2026
*Estructura completa de las 5 sesiones (incluye Sesión 0)*

---

## 📋 OVERVIEW GENERAL

| Sesión | Fecha | Hora | Tema | Entregable |
|--------|-------|------|------|------------|
| **0** | Mayo 6 (Mié) | 12:00 PM | Setup Day | Entorno configurado, primer commit |
| **1** | Mayo 7 (Jue) | 7-9 PM | Business Canvas con AI | Canvas validado, ICP definido |
| **2** | Mayo 9 (Vie) | 7-9 PM | Valida tu Idea | Hipótesis validadas, entrevistas sintéticas |
| **3** | Mayo 14 (Mié) | 7-9 PM | Diseña tu MVP | Wireframes, UI en Stitch, copy generado |
| **4** | Mayo 16 (Vie) | 7-9 PM | Build & Launch | Landing live, formulario, analytics |

**Duración de cada sesión:** 2 horas  
**Formato:** 60% práctica hands-on, 40% explicación/discusión  
**Herramientas:** Claude, Google Stitch, Cursor, GitHub, Zoom

---

## 🔧 SESIÓN 0: SETUP DAY (Mayo 6, 12:00 PM)

### Objetivo
Que cada participante salga con el entorno técnico completo configurado y funcional.

### Duración: 2 horas

### Agenda

**00:00 - 00:15 | Bienvenida + Check-in**
- Presentación rápida (quién es quién)
- Expectativas del taller
- Revisión de prerequisitos técnicos

**00:15 - 00:45 | Configuración de Cuentas**

*Actividad guiada:*
1. **Crear cuenta de GitHub** (si no la tienen)
   - Username profesional
   - Verificación de email
   - Activar 2FA

2. **Crear cuenta de Claude** (claude.ai)
   - Usar email principal
   - Verificar número de teléfono
   - Explorar interfaz básica

3. **Descargar e instalar Cursor** (cursor.sh)
   - Instalador para Windows/Mac
   - Iniciar sesión con GitHub
   - Configurar tema oscuro (recomendado)

**00:45 - 01:15 | Primer Proyecto: "Hola Mundo" Agéntico**

*Actividad hands-on:*
1. En Cursor: Crear archivo `index.html`
2. Pedirle a Claude (en el chat integrado): "Crear una landing simple con mi nombre y un botón de contacto"
3. Claude genera el código → Cursor lo inserta
4. Guardar archivo
5. Abrir en navegador (localhost)

*Checkpoint:* Todos deben ver su landing local funcionando.

**01:15 - 01:45 | GitHub Pages: Tu Primer Deploy**

*Actividad guiada:*
1. Crear nuevo repositorio en GitHub: `mi-startup-taller`
2. Subir el `index.html` creado
3. Activar GitHub Pages (Settings → Pages → Source: main branch)
4. Esperar 2-5 minutos
5. Compartir URL en el chat del grupo

*Checkpoint:* Cada uno comparte su URL en vivo.

**01:45 - 02:00 | Introducción a Google Stitch**

*Demo rápida:*
1. Crear cuenta en Google Stitch (si aplica)
2. Mostrar: "Quiero una landing moderna para un servicio de consultoría"
3. Ver cómo Stitch genera diseño
4. Exportar código HTML/CSS

**02:00 - 02:00 | Homework + Preguntas**

*Preparación para Sesión 1:*
- Pensar en una idea de negocio (puede ser vaga)
- Traer 3 ejemplos de startups que admires
- Verificar que todo el entorno sigue funcionando

---

## 🎯 SESIÓN 1: BUSINESS CANVAS CON AI (Mayo 7, 7-9 PM)

### Objetivo
Definir cliente ideal, propuesta de valor y modelo de negocio usando Claude como co-fundador.

### Entregable Final
Business Canvas validado + Customer Profile document.

### Agenda

**00:00 - 00:20 | Check-in + Compartir Ideas**
- Cada uno presenta su idea en 2 minutos
- Feedback grupal rápido
- Formar parejas para el ejercicio

**00:20 - 01:00 | Workshop: Customer Profile con Claude**

*Prompt para Claude:*
```
Actúa como un experto en estrategia de negocios. Tengo esta idea: [DESCRIPCIÓN].

Ayúdame a definir:
1. Customer Jobs (¿qué problema resuelvo?)
2. Pains (¿qué les duele actualmente?)
3. Gains (¿qué ganan con mi solución?)
4. Early Adopters (¿quiénes son los primeros 10 clientes?)

Sé específico. Dame perfiles detallados, no generalidades.
```

*Actividad:*
- Cada uno usa el prompt con su idea
- Iterar 3-4 veces con Claude (refinar, profundizar)
- Guardar el resultado en un documento

*Checkpoint:* Todos tienen 3 perfiles de cliente detallados.

**01:00 - 01:30 | Construyendo el Business Canvas**

*Plantilla (en Cursor):* Crear archivo `business-canvas.md`

*Prompt para Claude:*
```
Basándote en el Customer Profile anterior, ayúdame a completar el Business Canvas:

1. Propuesta de Valor (única, específica, defendible)
2. Segmentos de Clientes (los 3 más importantes)
3. Canales (¿cómo llego a ellos?)
4. Relaciones (¿cómo interactúo?)
5. Flujos de Ingresos (¿cómo cobro?)
6. Recursos Clave (¿qué necesito?)
7. Actividades Clave (¿qué hago todo el día?)
8. Partnerships (¿quién me ayuda?)
9. Estructura de Costos (¿en qué gasto?)

Formato: tabla markdown.
```

*Actividad:*
- Generar Canvas con Claude
- Validar con compañero de pareja (15 min cada uno)
- Ajustar según feedback

**01:30 - 01:50 | Validación Rápida: ¿Es viable?**

*Prompt para Claude:*
```
Analiza este Business Canvas:

[Pegar Canvas]

Señálame:
1. 3 fortalezas sólidas
2. 3 debilidades o riesgos
3. 2 supuestos que debería validar primero
4. 1 cambio recomendado

Sé honesto y directo.
```

*Actividad:*
- Cada uno obtiene análisis de vulnerabilidades
- Compartir 1 aprendizaje en el grupo

**01:50 - 02:00 | Cierre + Homework**

*Entregable de la sesión:*
- Archivo `business-canvas.md` en GitHub
- Customer Profile document

*Preparación Sesión 2:*
- Identificar 5 personas que podrían ser entrevistadas
- Traer preguntas de validación
- Leer: "The Mom Test" (capítulos 1-2)

---

## ✅ SESIÓN 2: VALIDA TU IDEA (Mayo 9, 7-9 PM)

### Objetivo
Aprender a validar hipótesis sin gastar dinero ni construir nada.

### Entregable Final
Plan de validación + 3 entrevistas sintéticas documentadas.

### Agenda

**00:00 - 00:20 | Recap + Problema: Validación Falsa**
- Errores comunes: "a mi mamá le gustó", "mis amigos dijeron que sí"
- Intro a "The Mom Test"
- Diferencia: Validation vs. Research

**00:20 - 00:50 | Diseñando Entrevistas con AI**

*Prompt para Claude:*
```
Tengo este Customer Profile: [PEGAR]

Ayúdame a diseñar un guión de entrevista de validación siguiendo "The Mom Test":

1. 5 preguntas principales (abiertas, sin llevar la respuesta)
2. 3 follow-ups por cada pregunta
3. 1 pregunta sobre el pasado (no el futuro hipotético)
4. 1 pregunta sobre dinero sin mencionar precio

Evita: "¿te gustaría...?", "¿comprarías...?", "¿qué te parece...?"
```

*Actividad:*
- Generar guiones con Claude
- Practicar en parejas (uno entrevistador, otro "cliente")
- Refinar preguntas

**00:50 - 01:30 | Entrevistas Sintéticas con AI**

*Prompt para Claude:*
```
Actúa como mi cliente ideal. Este es tu perfil: [PEGAR CUSTOMER PROFILE]

Voy a hacerte preguntas sobre tu trabajo diario y problemas. Responde como esa persona real, con detalles específicos, no genéricos.

Empezaré ahora.
```

*Actividad:*
- Cada uno realiza 3 "entrevistas" con Claude (como diferentes personas)
- Documentar respuestas en `validacion-entrevistas.md`
- Buscar patrones y sorpresas

*Checkpoint:* Todos tienen 3 transcripciones documentadas.

**01:30 - 01:50 | Análisis de Hallazgos**

*Prompt para Claude:*
```
Analiza estas 3 entrevistas:

[PEGAR TRANSCRIPCIONES]

Identifica:
1. 3 problemas confirmados (mencionados múltiples veces)
2. 2 problemas falsos (lo que yo creía que era el problema, no lo es)
3. 1 lenguaje exacto que usan (frases para copiar en mi landing)
4. 1 oportunidad inesperada
```

*Actividad:*
- Análisis grupal de hallazgos
- Compartir sorpresas
- Ajustar Business Canvas si es necesario

**01:50 - 02:00 | Cierre + Homework**

*Entregable de la sesión:*
- Documento de validación con entrevistas
- Análisis de hallazgos
- Canvas actualizado (si aplica)

*Preparación Sesión 3:*
- Buscar 3 referencias visuales de landings que te gusten
- Tener claros los 3 beneficios principales de tu propuesta
- Traer un logo o idea de branding (puede ser temporal)

---

## 🎨 SESIÓN 3: DISEÑA TU MVP (Mayo 14, 7-9 PM)

### Objetivo
Crear el diseño visual y el copy de la landing usando AI.

### Entregable Final
Diseño de landing completo (UI + copy) listo para desarrollar.

### Agenda

**00:00 - 00:20 | De Wireframe a UI con AI**
- Mostrar ejemplos de landings efectivas
- Principios: 1 propuesta clara, 1 CTA principal, social proof
- Estructura estándar: Hero → Problem → Solution → Features → CTA → Footer

**00:20 - 01:00 | Generando Diseño con Stitch**

*Actividad guiada:*
1. Entrar a Google Stitch
2. Prompt inicial: "Landing page for [TU SERVICIO]. Modern, minimalist, professional. Color palette: [TUS COLORES]. Include: hero section with headline, 3 feature cards, testimonial section, contact form."
3. Iterar con refinamientos: "Make the hero section more bold", "Add more whitespace", "Change the CTA button to orange"
4. Exportar HTML/CSS

*Checkpoint:* Todos tienen un diseño exportado.

**01:00 - 01:30 | Copywriting Agéntico**

*Prompt para Claude:*
```
Basándote en mi Customer Profile y Business Canvas:

Ayúdame a escribir el copy para mi landing. Necesito:

1. Headline principal (máx 10 palabras, específico, con beneficio)
2. Subheadline (1 oración que expande el headline)
3. Sección "The Problem" (2 párrafos, hablando del dolor)
4. Sección "The Solution" (3 bullets con beneficios)
5. Sección "How it works" (3 pasos simples)
6. CTA principal (texto del botón, máx 4 palabras)
7. 1 testimonial falso pero realista (formato: quote + nombre + resultado)

Tono: Profesional pero accesible. Sin jerga corporativa.
```

*Actividad:*
- Generar copy con Claude
- Copiar en documento `landing-copy.md`
- Validar con compañero: "¿entendés qué vendo?"

**01:30 - 01:50 | Integrando Diseño + Copy**

*Actividad:*
1. Abrir el HTML exportado de Stitch en Cursor
2. Reemplazar el placeholder text con el copy generado
3. Ajustar colores si es necesario
4. Preview en navegador

*Checkpoint:* Landing local con diseño + copy completo.

**01:50 - 02:00 | Cierre + Homework**

*Entregable de la sesión:*
- Archivo `index.html` con diseño y copy completo
- Assets (imágenes, íconos) descargados

*Preparación Sesión 4:*
- Revisar que el entorno de Sesión 0 sigue funcionando
- Tener cuenta de Vercel o Netlify lista (alternativa a GitHub Pages)
- Lista de verificación: ¿qué falta para lanzar?

---

## 🚀 SESIÓN 4: BUILD & LAUNCH (Mayo 16, 7-9 PM)

### Objetivo
Deploy de la landing en vivo + configuración de formulario y analytics.

### Entregable Final
Landing live, funcional, con formulario de contacto y analytics.

### Agenda

**00:00 - 00:20 | Pre-Launch Checklist**
- Revisar que todos tienen landing casi lista
- Identificar bloqueadores comunes
- Compartir pantallas para troubleshooting rápido

**00:20 - 01:00 | Formulario de Contacto + Funcionalidad**

*Opciones:*

**A) Formspree (más fácil):**
1. Crear cuenta en formspree.io
2. Copiar código del formulario
3. Pegar en el HTML
4. Probar envío

**B) Netlify Forms (si usan Netlify):**
1. Agregar `netlify` al tag `<form>`
2. Deploy
3. Ver submissions en dashboard

**C) EmailJS (para más control):**
1. Crear cuenta
2. Configurar template
3. Integrar SDK

*Actividad:*
- Cada uno implementa su formulario
- Probar enviándose un email a sí mismos

**01:00 - 01:30 | Deploy Final**

*Opción A: GitHub Pages (recomendado)*
1. Commit final: `git add . && git commit -m "Ready for launch"`
2. Push a GitHub
3. Verificar que GitHub Pages actualizó
4. Compartir URL en el chat

*Opción B: Vercel (para más control)*
1. Crear cuenta en vercel.com
2. Importar proyecto de GitHub
3. Deploy automático
4. Configurar dominio personalizado (opcional)

*Checkpoint:* Cada uno comparte su URL en vivo funcionando.

**01:30 - 01:45 | Analytics Básico**

*Opción: Google Analytics 4 (simple)*
1. Crear cuenta en analytics.google.com
2. Crear propiedad
3. Copiar tracking ID
4. Agregar al `<head>` del HTML
5. Redeploy

*O: Privacy-friendly con SimpleAnalytics o Plausible*

**01:45 - 02:00 | Celebración + Next Steps**

*Actividad de cierre:*
- Cada uno presenta su landing (2 min)
- Feedback grupal
- Anuncio de grupo de seguimiento (WhatsApp/Telegram)
- Entrega de certificados (para los que pagan)
- Foto de grupo (screenshot de Zoom)

*Roadmap Post-Taller:*
- Semana 1: Compartir landing, pedir feedback real
- Semana 2: Ajustar según feedback, primeras 5 conversaciones con leads
- Semana 3: Definir próximo paso (MVP funcional, pivote, o pausar)
- Mes 2-3: Tracción o pivot

---

## 📦 MATERIALES POR SESIÓN

### Para el Instructor (Ricardo)

**Preparar antes de cada sesión:**
- [ ] Slides de presentación (PDF de respaldo)
- [ ] Ejemplos propios (tu Business Canvas, tu landing, etc.)
- [ ] Cuentas de demo listas (por si alguien tiene problemas técnicos)
- [ ] Documento compartido (Notion/Google Docs) para recursos
- [ ] Backup plan: ¿qué hacer si Claude cae? ¿si GitHub falla?

**Durante la sesión:**
- [ ] Grabar la sesión (Zoom auto-record)
- [ ] Chat activo para dudas rápidas
- [ ] Break rooms para ejercicios en parejas
- [ ] Compartir pantalla regularmente

### Para los Participantes

**Material previo:**
- Lista de verificación técnica (enviar 1 semana antes)
- Videos cortos de preparación (opcional)
- Lecturas recomendadas (The Mom Test, Atomic Design)

**Material durante:**
- Templates de Business Canvas (Notion/Google Sheets)
- Prompts pre-armados para Claude
- Cheatsheet de comandos Git
- Lista de recursos (fuentes gratis, íconos, fotos)

**Material post-sesión:**
- Grabación de la sesión (link en 24h)
- Resumen escrito con key takeaways
- Tarea/homework clara
- Recursos adicionales para profundizar

---

## 🎯 ESTRATEGIA DE ENGAGEMENT

### Entre Sesiones (Comunicación)

**Día después de cada sesión:**
- Email con grabación + resumen
- Recordatorio de homework
- Link a grupo de WhatsApp/Telegram para dudas

**2 días antes de la siguiente sesión:**
- Recordatorio de la próxima sesión
- Check-in rápido: "¿tuviste problemas con el homework?"
- Preparar mente: "Para la próxima sesión, pensá en..."

### Durante las Sesiones

**Engagement activo:**
- Preguntas cada 15-20 min: "¿Va todo bien? ¿Alguien atascado?"
- Compartir pantalla de participantes (voluntarios)
- Breaks de 5 min en la mitad si es necesario
- Celebrar wins: "¡Fulano ya tiene su landing!

**Manejo de dificultades:**
- Si alguien se atasca técnicamente: breakout room 1:1 o ayuda asíncrona post-sesión
- Si alguien está desmotivado: recordar que el proceso es iterativo
- Si el grupo es tímido: usar chat escrito, no solo oral

---

## ✅ CHECKLIST PRE-TALLER

**1 semana antes:**
- [ ] Enviar email de preparación técnica
- [ ] Verificar que todos tienen cuentas creadas
- [ ] Testear Zoom, grabación, audio
- [ ] Preparar plantillas y recursos
- [ ] Crear grupo de WhatsApp/Telegram

**1 día antes (Sesión 0):**
- [ ] Recordatorio por email/WhatsApp
- [ ] Link de Zoom listo
- [ ] Backup plan activado

**Post-taller:**
- [ ] Enviar grabaciones finales
- [ ] Certificados (si aplica)
- [ ] Encuesta de feedback
- [ ] Invitación a "alumni network"
- [ ] Seguimiento 30 días después

---

**Nota para Ricardo:** Esta estructura es flexible. Ajustá tiempos según el ritmo del grupo. Lo importante es que cada uno termine con una landing funcional, no que cubramos todo el contenido teórico.
