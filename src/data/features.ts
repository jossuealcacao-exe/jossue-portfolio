// Interruptores de funciones que dependen de otro sistema. Se encienden aquí, en un solo lugar.

/**
 * Auditoría express en el chat (la corre APEX). Mientras APEX no tenga su ruta /v1/chat-audits en
 * producción y el Worker no tenga el secreto APEX_TOKEN, queda apagada: sin CTA en el sitio y sin el
 * aviso junto al botón del chat. Jossue AI tampoco la ofrece (eso lo decide el Worker con APEX_TOKEN).
 */
export const AUDIT_ENABLED = true;
