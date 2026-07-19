# Plan de analítica

## Estado

Existe una capa local `window.dataLayer` sin proveedor ni requests externos. La utilidad
`track()` y los atributos `data-analytics-event` instrumentan parcialmente
`view_case_study`, `select_language`, `click_contact`, `start_contact_form` y
`submit_contact_form`; este último solo puede ocurrir con endpoint y respuesta exitosa.

No hay GTM, GA4, proveedor, IDs, consentimiento, dominio real ni endpoint configurados.
La capa local es preparación técnica, no telemetría enviada. Su payload actual admite
`event`, `path` y `label`; los parámetros del catálogo son contrato objetivo y aún requieren
ampliar el tipo/instrumentación antes de conectar cualquier proveedor.

## Objetivos

1. Saber si las personas encuentran y leen trabajo relevante.
2. Entender qué llamados a la acción ayudan a continuar.
3. Detectar fallos de navegación o rendimiento.
4. Mejorar contenido sin identificar individuos ni construir perfiles.

No medir productividad de Jossue, valor de clientes, información de formularios ni contenido
confidencial.

## Principios de privacidad

- Recolección mínima, preferiblemente agregada y sin cookies.
- No enviar nombre, correo, teléfono, texto libre, IP persistente, user agent completo,
  identificadores de cuenta ni parámetros de URL desconocidos.
- No usar fingerprinting, grabación de sesión, mapas de calor ni publicidad.
- Truncar rutas o query strings que puedan contener datos sensibles.
- Clasificar enlaces externos por tipo, no enviar destinos privados completos.
- Definir retención, acceso, borrado, región y contrato antes de activar.
- Respetar consentimiento y señales aplicables; el criterio legal está pendiente.
- Separar tráfico interno y pruebas sin identificar a personas.

## Parámetros comunes permitidos

- `page_type`: categoría controlada, por ejemplo inicio, perfil, listado, proyecto, caso, error.
- `content_id`: identificador editorial no sensible; nunca nombre de cliente confidencial.
- `content_language`: idioma declarado.
- `referrer_group`: directo, búsqueda, social, referencia u otro; sin URL completa.
- `viewport_group`: pequeño, mediano o grande.
- `interaction_method`: teclado, puntero u otro, solo si puede medirse sin fingerprinting.
- `consent_state`: categoría de consentimiento, no un identificador.

## Catálogo principal de eventos

Los nombres siguientes son contrato y no deben renombrarse. “Destino” es hoy el `dataLayer`
local; un proveedor externo solo se añade tras aprobación.

### `view_case_study`

- **Trigger:** clic en el enlace que abre un caso.
- **Parámetros:** `path`, `content_id`, `language`, `placement`.
- **Objetivo:** conocer qué casos se eligen.
- **Destino:** `dataLayer` local; futuro proveedor aprobado.
- **Privacidad:** ID editorial controlado, sin nombres confidenciales ni query strings.

### `select_language`

- **Trigger:** clic en el selector ES/EN hacia la ruta equivalente.
- **Parámetros:** `path`, `from_language`, `to_language`.
- **Objetivo:** medir uso y paridad del contenido bilingüe.
- **Destino:** `dataLayer` local; futuro proveedor aprobado.
- **Privacidad:** no persistir identidad ni preferencia entre dispositivos.

### `click_contact`

- **Trigger:** clic en CTA interno hacia la página de contacto.
- **Parámetros:** `path`, `placement`, `language`.
- **Objetivo:** medir intención de iniciar conversación.
- **Destino:** `dataLayer` local; futuro proveedor aprobado.
- **Privacidad:** no capturar texto libre ni datos de formulario.

### `click_whatsapp`

- **Trigger:** clic en enlace de WhatsApp, cuando exista un canal aprobado.
- **Parámetros:** `path`, `placement`, `language`.
- **Objetivo:** medir preferencia por ese canal.
- **Destino:** `dataLayer` local; futuro proveedor aprobado.
- **Privacidad:** no enviar número, URL completa ni contenido del mensaje.

### `click_email`

- **Trigger:** clic en correo público aprobado.
- **Parámetros:** `path`, `placement`, `language`.
- **Objetivo:** medir intención de contacto por correo.
- **Destino:** `dataLayer` local; futuro proveedor aprobado.
- **Privacidad:** no enviar la dirección ni asunto/cuerpo.

### `click_linkedin`

- **Trigger:** clic en perfil de LinkedIn aprobado.
- **Parámetros:** `path`, `placement`, `language`.
- **Objetivo:** medir continuidad hacia presencia profesional.
- **Destino:** `dataLayer` local; futuro proveedor aprobado.
- **Privacidad:** no enviar URL o identificador del perfil.

### `click_github`

- **Trigger:** clic en perfil de GitHub aprobado.
- **Parámetros:** `path`, `placement`, `language`.
- **Objetivo:** medir continuidad hacia evidencia técnica.
- **Destino:** `dataLayer` local; futuro proveedor aprobado.
- **Privacidad:** no enviar URL completa, usuario ni repositorios privados.

### `download_cv`

- **Trigger:** activación de descarga del CV ES o EN aprobado.
- **Parámetros:** `path`, `document_language`, `placement`, `version_key`.
- **Objetivo:** medir demanda de trayectoria detallada.
- **Destino:** `dataLayer` local; futuro proveedor aprobado.
- **Privacidad:** no registrar nombre de archivo sensible ni descargas privadas.

### `start_contact_form`

- **Trigger:** primer foco dentro del formulario; actualmente puede entrar al `dataLayer` local
  aunque el botón esté deshabilitado.
- **Parámetros:** `path`, `language`, `form_key`.
- **Objetivo:** identificar inicio de intención de contacto.
- **Destino:** `dataLayer` local; futuro proveedor aprobado.
- **Privacidad:** no leer ni enviar valores de campos.

### `submit_contact_form`

- **Trigger:** respuesta exitosa del endpoint configurado, nunca el mero clic.
- **Parámetros:** `path`, `language`, `form_key`, `result: success`.
- **Objetivo:** contar envíos funcionales.
- **Destino:** `dataLayer` local; futuro proveedor aprobado.
- **Privacidad:** no incluir nombre, correo, mensaje, organización, URL ni ID de envío.

### `use_opportunity_estimator`

- **Trigger:** finalización de una interacción significativa con el estimador, si se implementa.
- **Parámetros:** `path`, `language`, `result_bucket`, `interaction_step`.
- **Objetivo:** medir uso de la herramienta y fricción.
- **Destino:** `dataLayer` local; futuro proveedor aprobado.
- **Privacidad:** solo categorías agregadas; nunca entradas comerciales libres.

### `view_service`

- **Trigger:** clic o apertura explícita de detalle de un servicio.
- **Parámetros:** `path`, `service_key`, `language`, `placement`.
- **Objetivo:** conocer interés relativo en servicios.
- **Destino:** `dataLayer` local; futuro proveedor aprobado.
- **Privacidad:** `service_key` controlado, sin datos personales.

### `outbound_project_click`

- **Trigger:** clic en demo, repositorio o enlace externo aprobado de un proyecto.
- **Parámetros:** `path`, `content_id`, `destination_group`, `language`.
- **Objetivo:** medir continuidad hacia evidencia externa.
- **Destino:** `dataLayer` local; futuro proveedor aprobado.
- **Privacidad:** no enviar URL completa, query strings ni destinos privados.

## Eventos deliberadamente excluidos

- movimiento del cursor, selección de texto y pulsaciones;
- scroll continuo o tiempo exacto por persona;
- copia de correo/teléfono;
- contenido de búsquedas o formularios;
- identificación entre sesiones;
- visualización de datos privados o previews.

## Validación

1. Especificar una matriz de consentimiento por evento.
2. Probar que cada trigger se dispara una vez y solo en éxito real.
3. Inspeccionar requests para confirmar ausencia de PII.
4. Verificar teclado, navegación atrás/adelante y SPA/MPA según implementación.
5. Bloquear eventos en desarrollo, previews privadas y automatización.
6. Documentar retención, acceso y procedimiento de borrado.
7. Comparar conteos con logs agregados sin buscar identidad perfecta.

## Métricas Bloqio Builder

57 usuarios y 45 páginas son datos proporcionados, no una línea base analítica aprobada. No
tienen fecha de corte ni definiciones y no deben enviarse a un proveedor ni publicarse hasta
su validación.
