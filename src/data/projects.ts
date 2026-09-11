// Projects data — typed module replacing the Astro `projects` collection.
//
// "Add a project with one edit" (portfolio-content spec): append an entry to
// `projects` and the grid renders it with zero component edits. A type
// violation fails `tsc` naming this module and the offending entry.
//
// `academic` is the literal `true`: every card is academic production — no
// client or commercial framing. Spanish copy is verbatim from
// src/content/projects/*.md (the `body` field replaces the markdown body).

export type Tool = 'R' | 'Python';

export interface Project {
  slug: string;
  title: string;
  objective: string;
  tools: [Tool, ...Tool[]]; // non-empty tuple: every card names its tools
  learning: string;
  academic: true;
  body?: string; // former markdown body paragraph
}

export const projects = [
  {
    slug: 'analisis-exploratorio-r',
    title: 'Análisis exploratorio de datos en R',
    objective:
      'Ejercicio académico de análisis estadístico: explorar, depurar y visualizar un conjunto de datos para responder preguntas cuantitativas con evidencia.',
    tools: ['R'],
    learning:
      'Escribir análisis reproducibles en R y comunicar hallazgos con gráficos y resúmenes numéricos claros.',
    academic: true,
    body:
      'Análisis de curso enfocado en el flujo completo de un estudio cuantitativo: desde la inspección de los datos crudos hasta la comunicación de resultados, documentando cada decisión de limpieza y transformación.',
  },
  {
    slug: 'python-preprocesamiento',
    title: 'Preprocesamiento de datos con Python',
    objective:
      'Práctica académica de preparación de datos: depurar, transformar y validar un conjunto de datos como base confiable para el modelamiento estadístico.',
    tools: ['Python'],
    learning:
      'Fundamentos de Python aplicados a la calidad del dato: detección de valores atípicos, transformación de variables y validación de supuestos.',
    academic: true,
    body:
      'Ejercicio de curso que cubre la cadena de preprocesamiento con Python: diagnóstico del conjunto de datos, tratamiento de valores faltantes y preparación de variables para análisis posteriores.',
  },
] satisfies readonly Project[];

// Parity with the Astro grid frontmatter: Spanish-aware title sort.
export function sortProjects(items: readonly Project[]): Project[] {
  return [...items].sort((a, b) => a.title.localeCompare(b.title, 'es'));
}
