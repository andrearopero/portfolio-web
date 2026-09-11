// Header: sticky top bar — brand link, anchor nav, and the theme toggle.
// Ported 1:1 from the former Astro component; useTheme replaces the inline
// toggle script.
import { profile } from '../data/profile';
import { useTheme } from '../hooks/useTheme';
import styles from './Header.module.css';

const NAV_LINKS = [
  { href: '#about', label: 'Sobre mí' },
  { href: '#skills', label: 'Habilidades' },
  { href: '#education', label: 'Formación' },
  { href: '#projects', label: 'Proyectos' },
  { href: '#contact', label: 'Contacto' },
] as const;

export default function Header() {
  const { toggle } = useTheme();

  return (
    <header className={styles.siteHeader}>
      <div className={`container ${styles.headerInner}`}>
        <a className={styles.brand} href="#hero">
          {profile.fullName}
        </a>
        <nav aria-label="Navegación principal">
          <ul className={styles.navList}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a className={styles.navLink} href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          className={styles.themeToggle}
          type="button"
          onClick={toggle}
          aria-label="Cambiar tema"
        >
          <svg
            className={styles.iconSun}
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
          <svg
            className={styles.iconMoon}
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
        </button>
      </div>
    </header>
  );
}
