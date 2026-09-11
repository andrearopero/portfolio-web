// Site copy is Spanish; identifiers and comments stay in English.
//
// Single-page composition: skip link, sticky header, the seven anchored
// sections, and the footer. Section ids are stable anchors — unchanged from
// the S1 shell (#hero #about #skills #education #projects #contact).
// useRevealOnScroll runs ONCE here; useTheme lives inside Header only.
import About from './components/About';
import Contact from './components/Contact';
import EducationTimeline from './components/EducationTimeline';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import Skills from './components/Skills';
import { useRevealOnScroll } from './hooks/useRevealOnScroll';

export default function App() {
  useRevealOnScroll();

  return (
    <>
      <a className="skip-link" href="#main">
        Saltar al contenido
      </a>

      <Header />

      <main id="main">
        <Hero />
        <About />
        <Skills />
        <EducationTimeline />
        <ProjectGrid />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
