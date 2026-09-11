// About: professional narrative — written for this site, never copied from
// the CV (portfolio-page spec). Reflects the confirmed BSc thesis title and
// the transition into industrial automation.
import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className="section reveal">
      <div className="container">
        <p className="section-kicker mono">02 / Sobre mí</p>
        <h2 className="section-title">De los datos a los procesos</h2>
        <div className={styles.aboutBody}>
          <p>
            Soy estadística de la Universidad Nacional de Colombia. Me formé para convertir datos en
            decisiones: explorarlos con rigor, reconocer su calidad y sus límites, y construir
            modelos que sostengan conclusiones que valgan la pena defender. Mi trabajo de grado
            aplicó el análisis de supervivencia a la deserción estudiantil en la Universidad
            Nacional de Colombia, Sede De La Paz.
          </p>
          <p>
            Hoy estoy cursando la Maestría en Automatización Industrial, donde esa base cuantitativa
            encuentra un terreno nuevo: procesos reales que se pueden medir, monitorear y mejorar.
            Mi meta es que los datos no solo expliquen lo que pasó, sino que ayuden a operar mejor
            lo que viene.
          </p>
        </div>
      </div>
    </section>
  );
}
