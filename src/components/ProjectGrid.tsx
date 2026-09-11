// Projects grid fed by the typed data modules. Academic cards carry the
// visible "Proyecto académico" label — no client or commercial framing.
// The peer-reviewed publication renders as academic production with its
// external DOI link and the full, confirmed author list (Andrea Carolina
// Ropero-Lozano, fourth author, highlighted).
//
// Adding a project requires exactly one entry in src/data/projects.ts and
// zero edits here ("Add a project with one edit").
import { Fragment } from 'react';
import { projects, sortProjects } from '../data/projects';
import { publication } from '../data/publications';
import styles from './ProjectGrid.module.css';

const sortedProjects = sortProjects(projects);

const doiPath = publication.doiUrl.replace('https://doi.org/', '');

// Full author list in article order, Spanish join (", " / " y "), with the
// confirmed fourth author highlighted.
function renderAuthors(): React.ReactNode {
  const { authors, highlightedAuthor } = publication;
  return authors.map((author, index) => (
    <Fragment key={author}>
      {index > 0 && (index === authors.length - 1 ? ' y ' : ', ')}
      {author === highlightedAuthor ? (
        <strong className={styles.authorHighlight}>{author}</strong>
      ) : (
        author
      )}
    </Fragment>
  ));
}

export default function ProjectGrid() {
  return (
    <section id="projects" className="section reveal">
      <div className="container">
        <p className="section-kicker mono">05 / Proyectos</p>
        <h2 className="section-title">Proyectos en curso</h2>
        <p className="section-lede">
          Trabajo académico en desarrollo: ejercicios reales de análisis y preparación de datos con
          R y Python.
        </p>
        <div className={styles.projectGrid}>
          <article className={`card ${styles.projectCard}`}>
            <span className={`mono ${styles.projectBadge}`}>Publicación arbitrada</span>
            <h3>{publication.title}</h3>
            <p className={styles.publicationMeta}>
              {publication.journal} · Vol. {publication.volume}, Núm. {publication.issue} ·{' '}
              {publication.year} · Acceso abierto
            </p>
            <p className={styles.authors}>{renderAuthors()}</p>
            <a
              className={styles.doiLink}
              href={publication.doiUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver la publicación en doi.org (se abre en una pestaña nueva)"
            >
              DOI: {doiPath}
            </a>
          </article>
          {sortedProjects.map((project) => (
            <article key={project.slug} className={`card ${styles.projectCard}`}>
              <span className={`mono ${styles.projectBadge}`}>Proyecto académico</span>
              <h3>{project.title}</h3>
              <p className={styles.objective}>{project.objective}</p>
              {project.body && <p className={styles.projectBody}>{project.body}</p>}
              <ul className={styles.tools}>
                {project.tools.map((tool) => (
                  <li key={tool} className="chip">
                    {tool}
                  </li>
                ))}
              </ul>
              <p className={styles.learning}>
                <strong>Lo que me llevo:</strong> {project.learning}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
