# Enlaces listos — sustituir `BASE`

1. Abrí **`url-publica.txt`** y completá **`URL_PUBLICA=`** con tu URL pública **sin barra final**.
2. En este archivo, reemplazá **`BASE`** por esa misma URL (solo el valor, sin `URL_PUBLICA=`).

Convención fija: **`utm_campaign=taller-mayo-2026`**.

---

## Landing principal (bio, firma email, primer CTA)

```
BASE?utm_source=ORGANICO&utm_medium=directo&utm_campaign=taller-mayo-2026&utm_content=firma
```

## LinkedIn — post “problema”

```
BASE?utm_source=linkedin&utm_medium=post&utm_campaign=taller-mayo-2026&utm_content=post-problema
```

## LinkedIn — post oferta

```
BASE?utm_source=linkedin&utm_medium=post&utm_campaign=taller-mayo-2026&utm_content=post-oferta
```

## Telegram — anuncio / grupo

```
BASE?utm_source=telegram&utm_medium=grupo&utm_campaign=taller-mayo-2026&utm_content=anuncio-dia0
```

## Instagram / historia (si aplica)

```
BASE?utm_source=instagram&utm_medium=story&utm_campaign=taller-mayo-2026&utm_content=story-1
```

---

**Nota:** Hasta que `BASE` no exista (HTML solo en disco), estos enlaces no abren en visitantes reales; sirven para el día del deploy y para acortadores (Bitly).
