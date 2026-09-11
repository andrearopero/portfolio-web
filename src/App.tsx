// Site copy is Spanish; identifiers and comments stay in English.

import { useRevealOnScroll } from './hooks/useRevealOnScroll';
import { useTheme } from './hooks/useTheme';

// S1 placeholder shell — real components (Header, Hero, …, Footer) land in S2.
// Section ids are stable anchors; the ThemeToggle exercises useTheme until the
// real Header arrives.
const SECTIONS = [
  { id: 'hero', label: 'Inicio' },
  { id: 'about', label: 'Sobre mí' },
  { id: 'skills', label: 'Habilidades' },
  { id: 'education', label: 'Formación' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'contact', label: 'Contacto' },
] as const;

export default function App() {
  useRevealOnScroll();
  const { theme, toggle } = useTheme();

  return (
    <>
      <a className="skip-link" href="#main">
        Saltar al contenido
      </a>

      <header className="site-header">
        <div className="container">
          <button type="button" onClick={toggle} aria-label="Cambiar tema">
            {theme === 'dark' ? '🌙' : '☀️'} Tema: {theme}
          </button>
        </div>
      </header>

      <main id="main">
        {SECTIONS.map((section) => (
          <section key={section.id} id={section.id} className="section reveal">
            <div className="container">
              <p className="section-kicker">{section.id}</p>
              <h2 className="section-title">{section.label}</h2>
              <p className="section-lede">Sección de ejemplo (los componentes reales llegan en S2).</p>
            </div>
          </section>
        ))}
      </main>

      <footer className="site-footer">
        <div className="container">
          <p className="mono">© {new Date().getFullYear()} — placeholder footer</p>
        </div>
      </footer>
    </>
  );
}
