// Hero: full name, one-line positioning, and the two anchor CTAs.
// Ported 1:1 from Hero.astro. The hero name carries the single violet→fuchsia
// gradient highlight allowed per viewport (--gradient-accent token).
import { profile } from '../data/profile';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="hero" className={`${styles.hero} reveal`}>
      <div className="container">
        <p className="section-kicker mono">
          {profile.role} → Automatización industrial
        </p>
        <h1 className={styles.heroName}>{profile.fullName}</h1>
        <p className={styles.heroLede}>
          Estadística de la Universidad Nacional de Colombia: llevo el análisis cuantitativo y el
          modelamiento estadístico al mundo de la automatización industrial.
        </p>
        <div className={styles.heroCtas}>
          <a className="btn btn-primary" href="#projects">
            Ver proyectos
          </a>
          <a className="btn btn-ghost" href="#contact">
            Contacto
          </a>
        </div>
      </div>
    </section>
  );
}
