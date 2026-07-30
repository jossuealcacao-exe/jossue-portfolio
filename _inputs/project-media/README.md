# Intake de medios para proyectos

Coloca aquí el ZIP aprobado con el nombre:

`portfolio-project-media-YYYY-MM-DD.zip`

## Estructura esperada

```text
miawseo/
  MIA-01-network-overview.avif
  MIA-02-breed-exhibition.avif
  MIA-03-mobile-upload.webp
vineria/
  VIN-01-editorial-opening.avif
  VIN-02-grape-explorer.avif
  VIN-03-mobile-variety.webp
tiendaonline/
  TEC-01-home-merchandising.avif
  TEC-02-product-variants.avif
  TEC-03-mobile-purchase.webp
```

Las proporciones, resoluciones, rutas y estados requeridos están definidos en `mediaPlan` dentro de `src/content.config.ts` y se muestran en cada caso.

## Reglas

- No incluir credenciales, exports de cliente, datos comerciales ni capturas de Admin.
- Cada imagen debe contar con permiso de publicación y licencia conocida.
- El contenido debe corresponder a la ruta y estado descritos; no usar mockups para simular resultados.
- Casa Tecalli debe capturarse únicamente desde una development store o theme no publicado.
- Si un archivo no cumple la especificación, se conserva el placeholder y se registra el bloqueo.
