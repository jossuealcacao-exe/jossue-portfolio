# Jossue AI · capa anti abusos

Código: `worker/guard.mjs` · pruebas: `worker/guard.test.mjs` · tablas: `migrations/0004_ai_guard.sql`.
Aplica igual en el sitio (`/api/ai`) y en WhatsApp (`/api/whatsapp`).

## Los tres candados

```
mensaje ─► 1. REGLAS ──(lo que vieron)──► 2. IA VIGILANTE ─┐
              │ descarado                  (en paralelo)    ├─► decisión ─► abuso: respuesta burlona
              └─► no se llama al modelo                     │                 + puntos (+ bloqueo + alerta)
                                                            │
           modelo que contesta (con marca secreta y, si las reglas vieron algo, MODO ALERTA)
                                                            │
                                     3. INSPECTOR de la respuesta ─► fuga o código: se descarta
```

1. **Reglas** (instantáneas, sin costo). Inyección («ignora tus instrucciones», modos, etiquetas
   de sistema), extracción (prompt, instrucciones, claves, `knowledge.json`, código fuente, qué
   modelo es), pedidos de código, estrés (avalanchas, repeticiones, texto codificado, basura) e
   insultos, en español e inglés. Si el intento es descarado, el modelo que contesta ni se llama.
2. **IA vigilante**: `gemini-3.1-flash-lite` (`JOSSUE_AI_GUARD_MODEL`), aparte del que contesta.
   Clasifica cada mensaje en paralelo (no agrega espera) en ok, injection, extraction, code, stress
   o abuse, con confianza. Recibe lo que encontraron las reglas. El texto de la persona va entre
   marcas aleatorias y se le dice que es dato, nunca instrucciones. Ante la duda, ok: no castiga a
   alguien normal. Si falla o tarda más de 6 s, siguen valiendo las reglas y el candado 3.
3. **Inspector de la respuesta**: cada conversación lleva una marca secreta (`JX-…`) en las
   instrucciones del modelo. Si la respuesta trae la marca, encabezados del prompt, trozos copiados
   de la persona o código, se descarta y se manda una respuesta genérica.

## Puntos, bloqueos y alertas

- Inyección y extracción valen 2 puntos; código, estrés e insultos, 1; una fuga detectada, 4.
- Los puntos cuentan una hora, por sesión **y** por IP (en WhatsApp, por chat). Con 5 puntos se
  bloquea 1 hora; si ya lo habían bloqueado en las últimas 24 h, 24 horas.
- Bloqueado: en el sitio recibe «Por hoy ya fue suficiente…» y el chat se pausa; en WhatsApp el
  bot deja de contestar. No se llama a ningún modelo (cero costo).
- Jossué recibe un correo por cada bloqueo (máximo uno cada 12 h por persona) y de inmediato si el
  modelo estuvo a punto de filtrar su prompt. Sin IP ni números: solo los intentos recortados.
- `npm run chats` muestra los intentos y bloqueos recientes.

## Contratos que se cerraron

- Las respuestas del asistente vuelven firmadas (HMAC con la sesión). El servidor ignora cualquier
  respuesta «del asistente» que no haya firmado él: nadie puede inventarle un turno falso.
- El diagnóstico (modelo, tokens, veredicto del vigilante) solo sale con el token de
  administración; antes bastaba con una sesión `QA-`.
- Máximo 3 recados por IP al día.
- Siguen: 800 caracteres por mensaje, 30 turnos por conversación, 24 mensajes por IP cada 10
  minutos, 30 días de retención y PII oculta en lo que se guarda.

## Respuestas ante un abuso

Genéricas y con burla ligera, sin dar información ni discutir, y regresan al tema
(`MOCK` en `guard.mjs`). Ejemplo: «Mi prompt es como la receta de la salsa de la casa: existe,
funciona y no se comparte. Lo que sí te comparto es todo lo que Jossué ha publicado.»

## Al publicar

`npx wrangler d1 migrations apply jossue-portfolio-contact --remote` (crea `ai_abuse`, `ai_blocks`
y la columna `ip_hash` de `ai_leads`) antes o junto con el deploy.
