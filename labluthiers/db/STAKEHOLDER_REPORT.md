# Music Places Finder - Primera entrega de base de datos

Fecha de corte: 7 de octubre de 2026  
Zona de exploración: Madrid y entorno  
Formato principal adjunto: `music_places_madrid_v0_places.csv`  
Vista visual recomendada: `music_places_madrid_v0_view.html`

## Resumen

Esta primera entrega reúne una base de datos inicial de lugares, entidades y
servicios vinculados al ecosistema musical. El objetivo es disponer de una
fuente práctica para acciones comunitarias, comerciales, docentes, culturales o
de coordinación dentro del ámbito musical y luthier.

La base se ha construido a partir de búsquedas especializadas por término:
escuelas, conservatorios, luthiers, reparación de instrumentos, estudios,
salas, agrupaciones, tiendas, alquiler, producción musical e infraestructura
cultural.

## Cifras principales

- 2.032 resultados brutos procesados.
- 697 lugares únicos tras deduplicación.
- 47 búsquedas registradas.
- 46 búsquedas individuales por término.
- 1 búsqueda combinada inicial conservada como evidencia comparativa.
- 604 lugares con teléfono.
- 591 lugares con sitio web.
- 668 lugares con teléfono o web.
- 697 lugares con enlace a Google Maps.
- 549 lugares verificados por Google.
- 692 lugares con estado abierto en la fuente.
- 363 lugares con rating igual o superior a 4,5 y al menos 10 reseñas.

## Cobertura por familias

Un mismo lugar puede aparecer en más de una familia. Por eso estas cifras son
participaciones de categoría, no una partición estricta:

| Familia | Lugares asociados |
|---|---:|
| Performing / agrupaciones | 196 |
| Producción musical | 183 |
| Instrumentos | 123 |
| Educación musical | 118 |
| Luthería, reparación y oficio | 115 |
| Infraestructura cultural | 49 |
| Pendiente de mapeo | 2 |

## Qué incluye el CSV principal

El archivo `music_places_madrid_v0_places.csv` contiene una fila por lugar
único. Los campos principales son:

- identificación: `place_id`, `name`;
- clasificación: `category`, `subcategory`, `search_terms`;
- localización: dirección, ciudad, código postal, provincia, país, coordenadas;
- contacto: teléfono, web, dominio y enlace a Google Maps;
- señales públicas: rating, reseñas, estado, verificación;
- trazabilidad: fuente, IDs de proveedor, primera y última detección.

## Archivos incluidos

- `music_places_madrid_v0_view.html`: visualización exploratoria en navegador,
  con mapa esquemático, filtros, métricas y tabla.
- `music_places_madrid_v0_places.csv`: base principal para uso operativo.
- `music_places_madrid_v0_discoveries.csv`: tabla de trazabilidad; muestra qué
  búsqueda encontró cada lugar.
- `music_places_madrid_v0_search_runs.csv`: resumen técnico de cada búsqueda.

Para una primera entrega a stakeholders, se recomienda abrir primero el HTML y
adjuntar el CSV principal. Los otros dos archivos son útiles si se quiere
auditar el proceso o analizar la calidad de cada término de búsqueda.

## Lectura práctica

Esta base puede servir para:

- identificar posibles colaboradores o destinatarios de servicios;
- localizar nodos relevantes para comunidad musical/luthier;
- preparar acciones de marketing o comunicación segmentadas;
- mapear escuelas, estudios, tiendas y servicios técnicos;
- diseñar visualizaciones docentes o mapas interactivos;
- analizar qué términos producen mejores resultados.

## Metodología

La captura se hizo mediante un actor para Google Maps, ejecutando búsquedas por 
término individual. Esta estrategia funcionó mejor que combinar muchos términos 
en una sola búsqueda.

Después se normalizaron los resultados:

1. conservación de archivos JSON brutos como evidencia;
2. extracción de campos relevantes;
3. deduplicación por `place_id`;
4. acumulación de términos que encuentran el mismo lugar;
5. generación de CSV principal y tablas auxiliares.

## Limitaciones

Esta es una primera versión operativa, no una base cerrada o certificada.

- Los datos proceden de listados públicos y pueden cambiar.
- Algunos lugares aparecen en varias categorías porque son híbridos.
- Puede haber falsos positivos en búsquedas amplias como `productor musical`,
  `sala de conciertos` o `asociación musical`.
- Algunos registros no tienen teléfono o web pública.
- La clasificación se basa en el término de búsqueda y metadatos del proveedor;
  no incluye todavía revisión humana exhaustiva.
- La cobertura está centrada en Madrid y entorno.

## Recomendaciones de siguiente paso

1. Revisar manualmente una muestra de cada familia para ajustar precisión.
2. Marcar registros prioritarios por uso: comunidad, marketing, docencia,
   eventos o colaboración.
3. Añadir una columna de estado interno: `revisado`, `prioritario`,
   `descartar`, `contactado`.
4. Crear una vista ligera para stakeholders no técnicos.
5. Si la base resulta útil, evaluar un backend propio específico a fin de repetir la captura de forma más controlada.

## Entrega

Archivo recomendado para adjuntar:

```text
music_places_madrid_v0_view.html
music_places_madrid_v0_places.csv
```

El HTML puede abrirse directamente en navegador. El CSV está listo para abrirse
en Excel, Google Sheets, LibreOffice o para importarse en una base de datos.
