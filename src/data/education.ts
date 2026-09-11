// Education data — discriminated union, type-checked at build time.
//
// A type violation here (bad field, wrong kind/status pairing, missing
// institution on a completed entry) fails `tsc`/`npm run build` with an error
// naming this module and the offending entry (portfolio-content spec:
// "Type violation blocks build").
//
// Spanish copy is verbatim from the former Astro content collection
// (src/content/education/*.md). The union shape forbids unconfirmed facts:
// a current degree carries no institution or period, and only a completed
// degree may carry a thesis title.

export type EducationEntry =
  | { kind: 'degree'; status: 'current'; title: string }
  | {
      kind: 'degree';
      status: 'completed';
      title: string;
      institution: string;
      period: string;
      thesisTitle?: string;
    }
  | { kind: 'training'; status: 'completed'; title: string; institution: string; period: string };

// The five confirmed entries (content parity: nothing dropped or altered).
// The thesis title is CvLAC-sourced, non-PII, and user-confirmed.
export const education = [
  {
    kind: 'degree',
    status: 'current',
    title: 'Maestría en Automatización Industrial',
  },
  {
    kind: 'degree',
    status: 'completed',
    title: 'Estadística',
    institution: 'Universidad Nacional de Colombia, Sede La Paz',
    period: '2020–2025',
    thesisTitle:
      'Modelo de análisis de supervivencia para la deserción estudiantil en la Universidad Nacional de Colombia, Sede De La Paz',
  },
  {
    kind: 'degree',
    status: 'completed',
    title: 'Técnico en Producción Agropecuaria',
    institution: 'SENA',
    period: '2019',
  },
  {
    kind: 'training',
    status: 'completed',
    title: 'Introducción a Data Science: Programación Estadística con R',
    institution: 'UNAM — Coursera',
    period: 'Oct. 2024',
  },
  {
    kind: 'training',
    status: 'completed',
    title: 'Python for Beginners',
    institution: 'Sololearn',
    period: 'May. 2021',
  },
] satisfies readonly EducationEntry[];

// Ordering ports the Astro comparator as a pure function: current degree
// first, then completed degrees by newest year found in `period`, then
// training; final `es` localeCompare tiebreak. Returns a new array — the
// input is never mutated.
export function sortEducation(entries: readonly EducationEntry[]): EducationEntry[] {
  const group = (kind: EducationEntry['kind']) => (kind === 'degree' ? 0 : 1);
  const current = (status: EducationEntry['status']) => (status === 'current' ? 0 : 1);
  const periodOf = (entry: EducationEntry): string => ('period' in entry ? entry.period : '');
  const year = (period: string) => Number(period.match(/\d{4}/)?.[0] ?? 0);
  return [...entries].sort(
    (a, b) =>
      group(a.kind) - group(b.kind) ||
      current(a.status) - current(b.status) ||
      year(periodOf(b)) - year(periodOf(a)) ||
      periodOf(b).localeCompare(periodOf(a), 'es'),
  );
}
