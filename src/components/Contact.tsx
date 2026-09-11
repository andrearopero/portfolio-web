// Contact: the institutional mailto link is the primary channel. The
// user-approved professional phone renders as a clearly secondary `tel:`
// link labeled in Spanish (privacy amendment 2026-09-11). GitHub/LinkedIn
// come from the confirmed profile facts. No address, no CV download.
import { profile } from '../data/profile';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section id="contact" className="section reveal">
      <div className="container">
        <p className="section-kicker mono">06 / Contacto</p>
        <h2 className="section-title">Hablemos</h2>
        <p className={`section-lede ${styles.contactLede}`}>
          Si quieres conversar sobre datos, procesos o automatización, escríbeme por el canal
          institucional, llámame al teléfono profesional o encuéntrame en mis perfiles
          profesionales.
        </p>
        <ul className={styles.contactLinks}>
          <li>
            <a
              className="btn btn-primary"
              href={`mailto:${profile.email}`}
              aria-label="Enviar correo a Andrea Carolina Ropero Lozano"
            >
              {profile.email}
            </a>
          </li>
          <li>
            <a
              className="btn btn-ghost"
              href="tel:+573227999411"
              aria-label="Llamar por teléfono al +57 322 799 9411"
            >
              Teléfono: {profile.phone}
            </a>
          </li>
          <li>
            <a
              className="btn btn-ghost"
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Perfil de GitHub de Andrea Carolina Ropero Lozano (se abre en una pestaña nueva)"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              className="btn btn-ghost"
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Perfil de LinkedIn de Andrea Carolina Ropero Lozano (se abre en una pestaña nueva)"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
