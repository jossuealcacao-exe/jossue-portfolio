# Jossue AI en WhatsApp Business

Jossue AI contesta los mensajes del WhatsApp Business de Jossué y le pasa la conversación solo
cuando necesita una respuesta suya. El número sigue en la app (modo coexistencia): Jossué ve y
contesta todo desde su teléfono, como siempre.

Código: `worker/whatsapp.mjs` · pruebas: `worker/whatsapp.test.mjs` · tablas: `migrations/0003_whatsapp.sql`.

## Qué hace

- **Contesta a todos** con la misma persona y el mismo conocimiento que Jossue AI en el sitio
  (Gemini, `/ai/knowledge.json`). En el primer mensaje dice que es una IA. Respuestas cortas, de chat.
- **Le pasa el chat a Jossué** cuando alguien quiere cotizar, contratar o agendar; habla de un
  proyecto en curso; pagos, facturas o contratos; una queja; pide hablar con él; algo personal; o
  algo que no sabe. A la persona le dice que Jossué le contesta por ahí mismo; a Jossué le llega un
  correo con el resumen y el enlace `wa.me` al chat. Después se calla en ese chat 24 h
  (`WA_HANDOFF_HOURS`).
- **Se calla cuando Jossué escribe.** Lo que Jossué manda desde la app llega como
  `smb_message_echoes`: el bot se pausa en ese chat 12 h (`WA_PAUSE_HOURS`) y, cuando vuelve, sabe
  lo que Jossué dijo.
- **Audios, fotos y archivos:** todavía no los lee; avisa a la persona y se los pasa a Jossué.
- **Si el modelo falla,** no improvisa: le pasa el chat a Jossué.
- **Privacidad:** el número no se guarda en la base (solo una huella HMAC); el texto se guarda sin
  correos ni teléfonos y se borra a los 30 días. Meta reintenta webhooks: cada mensaje se contesta
  una sola vez. Máximo 40 respuestas del bot por chat al día.
- **Política de Meta (2026):** WhatsApp prohíbe los chatbots de propósito general, no los de un
  negocio. Jossue AI solo atiende temas del trabajo de Jossué y rechaza lo demás con amabilidad.

## Puesta en marcha con Dualhook (la hace Jossué: son sus cuentas y sus claves)

Con un Tech Partner y registro integrado, Meta firma los webhooks con la app del partner: no se
pueden comprobar. Por eso la URL lleva una llave secreta larga y el worker exige el
`phone_number_id` configurado. Con una app de Meta propia se usaría `WHATSAPP_APP_SECRET` (firma).

1. Requisitos: app WhatsApp Business al día, el número con 7 días o más de uso en la app, acceso de
   administrador al portafolio de Meta (business.facebook.com).
2. En Dualhook: conectar el número con *Embedded Signup* → elegir **el portafolio propio** (no se
   cambia después) → «conectar una app WhatsApp Business existente» → escanear el QR desde la app.
3. Anotar el **Phone Number ID** y la llave `dh_live_…`. Confirmar con Dualhook que reenvía
   `smb_message_echoes` (sin eso el bot no sabe cuándo contesta Jossué).
4. Generar dos valores al azar (verify token y llave de la URL): `openssl rand -hex 24`.
5. Secretos (`npx wrangler whoami` antes: cuenta personal):
   `WHATSAPP_TOKEN` (= `dh_live_…`), `WHATSAPP_VERIFY_TOKEN`, `WHATSAPP_WEBHOOK_KEY`.
6. Variables en `wrangler.jsonc` → `vars`: `WHATSAPP_PHONE_NUMBER_ID`,
   `"WHATSAPP_API_BASE": "https://api.dualhook.com"`, `"WHATSAPP_GRAPH_VERSION": "v25.0"`.
   Tablas: `npx wrangler d1 migrations apply jossue-portfolio-contact --remote`. Publicar.
7. En Dualhook, webhook: `https://jossuealcala.com/api/whatsapp/<WHATSAPP_WEBHOOK_KEY>` y el verify
   token. `GET /healthz` debe decir `"whatsappEnabled": true`.
8. Probar desde otro teléfono: saludo (se presenta), «¿cuánto cobra?» (le pasa el chat y llega el
   correo), contestar desde la app (el bot se calla).

Sin los secretos, `/api/whatsapp` no hace nada (404 o 503).

## Costos

- WhatsApp: los mensajes que llegan son gratis. Desde el 1 de octubre de 2026 las respuestas dentro
  de la ventana de 24 h se cobran después de las primeras 1,000 al mes por número.
- Gemini: ~US$0.008 por respuesta (gemini-3.8-flash con precio promocional hasta el 31/12/2026).
- El Tech Partner, si se usa: su cuota mensual.
