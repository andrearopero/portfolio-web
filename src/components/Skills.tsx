// Skills: CV-traceable chips grouped in three blocks (stats/data, programming,
// soft skills). The groups const stays in the component, as in the former
// Astro component.
// Each group carries a chip tone (violet / fuchsia / amber) — colorful but
// AA-legible via the contrast-audited tint tokens in global.css.
import styles from './Skills.module.css';

const groups = [
  {
    title: 'Estadística y datos',
    tone: 'violet',
    chips: [
      'Análisis estadístico',
      'Modelamiento estadístico',
      'Preprocesamiento de datos',
      'Visualización básica',
      'Razonamiento cuantitativo',
    ],
  },
  {
    title: 'Programación',
    tone: 'fuchsia',
    chips: ['R — programación estadística', 'Python — fundamentos'],
  },
  {
    title: 'Habilidades blandas',
    tone: 'amber',
    chips: [
      'Trabajo en equipo',
      'Adaptabilidad',
      'Atención al detalle',
      'Responsabilidad',
      'Pensamiento crítico',
      'Comunicación efectiva',
    ],
  },
] as const;

const chipToneClass = {
  violet: '',
  fuchsia: 'chip-fuchsia',
  amber: 'chip-amber',
} as const;

export default function Skills() {
  return (
    <section id="skills" className="section reveal">
      <div className="container">
        <p className="section-kicker mono">03 / Habilidades</p>
        <h2 className="section-title">Lo que traigo al trabajo</h2>
        <div className={styles.skillGroups}>
          {groups.map((group) => (
            <div key={group.title} className={`card ${styles.skillGroup}`}>
              <h3>{group.title}</h3>
              <ul>
                {group.chips.map((chip) => (
                  <li key={chip} className={`chip ${chipToneClass[group.tone]}`.trim()}>
                    {chip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
