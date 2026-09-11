// Footer: full name, current year (render time), small anchor nav.
// Ported 1:1 from the former Astro component.
import { profile } from '../data/profile';
import styles from './Footer.module.css';

const year = new Date().getFullYear();

const anchors = [
  { href: '#hero', label: 'Inicio' },
  { href: '#about', label: 'Sobre mí' },
  { href: '#skills', label: 'Habilidades' },
  { href: '#education', label: 'Formación' },
  { href: '#projects', label: 'Proyectos' },
  { href: '#contact', label: 'Contacto' },
] as const;

export default function Footer() {
  return (
    <footer className={styles.siteFooter}>
      <div className={`container ${styles.footerInner}`}>
        <p className={styles.footerName}>
          © {year} {profile.fullName}
        </p>
        <nav aria-label="Navegación del pie de página">
          <ul className={styles.navList}>
            {anchors.map((anchor) => (
              <li key={anchor.href}>
                <a className={styles.navLink} href={anchor.href}>
                  {anchor.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className={styles.footerNote}>Portafolio profesional · Construido con React, TypeScript y Vite.</p>
      </div>
    </footer>
  );
}
