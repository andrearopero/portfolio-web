// Education timeline fed by the typed education data module.
// "En curso" badge (mono) for current entries; institution line omitted for
// them entirely — the discriminated union already forbids unconfirmed facts.
// The confirmed BSc thesis title renders as a styled sub-line.
import { education, sortEducation } from '../data/education';
import styles from './EducationTimeline.module.css';

// Pure-function port of the Astro frontmatter comparator.
const entries = sortEducation(education);

export default function EducationTimeline() {
  return (
    <section id="education" className="section reveal">
      <div className="container">
        <p className="section-kicker mono">04 / Formación</p>
        <h2 className="section-title">Trayectoria académica</h2>
        <ol className={styles.timeline}>
          {entries.map((entry) => (
            <li key={entry.title} className={styles.timelineItem}>
              <div className={`card ${styles.timelineCard}`}>
                <div className={styles.timelineHead}>
                  <h3>{entry.title}</h3>
                  {entry.status === 'current' ? (
                    <span className={`mono ${styles.statusBadge}`}>En curso</span>
                  ) : (
                    <span className={`mono ${styles.period}`}>{entry.period}</span>
                  )}
                </div>
                {entry.status === 'completed' && (
                  <p className={styles.institution}>{entry.institution}</p>
                )}
                {entry.kind === 'degree' && entry.status === 'completed' && entry.thesisTitle && (
                  <p className={styles.thesisTitle}>{entry.thesisTitle}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
