// Skills: CV-traceable chips grouped in three blocks (stats/data, programming,
// soft skills). The groups const stays in the component, as in Skills.astro.
import styles from './Skills.module.css';

const groups = [
  {
    title: 'Estadística y datos',
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
    chips: ['R — programación estadística', 'Python — fundamentos'],
  },
  {
    title: 'Habilidades blandas',
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
                  <li key={chip} className="chip">
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
