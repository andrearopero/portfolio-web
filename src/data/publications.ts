// Peer-reviewed publication — user-confirmed citation (provided 2026-09-11
// from the published PDF). The DOI landing page is the authoritative source
// for the citation: NO page range, NO abstract, and no unverified metadata
// may be invented here (portfolio-content spec: "Peer-reviewed publication").
//
// Andrea Carolina Ropero-Lozano is the fourth author; her co-authorship is
// human-confirmed and is rendered highlighted by the Projects grid. The
// full author list renders in article order.

export interface Publication {
  title: string;
  journal: string; // publisher note "(UPTC)" as confirmed in the citation
  volume: string;
  issue: string;
  year: string; // rendered as volume/issue/year on the card
  published: string; // full ISO date kept for the record
  doiUrl: string;
  openAccess: true;
  authors: readonly string[]; // order exactly as it appears in the article
  highlightedAuthor: string;
}

export const publication = {
  title:
    'Evaluación experimental de factores claves para el tiempo de vuelo de los helicópteros de papel: una experiencia significativa desde el aula-laboratorio',
  journal: 'Ciencia en Desarrollo (UPTC)',
  volume: '17',
  issue: '1',
  year: '2026',
  published: '2026-05-07',
  doiUrl: 'https://doi.org/10.19053/uptc.01217488.v17.n1.2026.19225',
  openAccess: true,
  authors: [
    'Osnamir Elias Bru-Cordero',
    'Marieth Agnes Guillen-García',
    'Idalia Hernández-López',
    'Andrea Carolina Ropero-Lozano',
    'Cristian David Correa-Álvarez',
  ],
  highlightedAuthor: 'Andrea Carolina Ropero-Lozano',
} as const satisfies Publication;
