// Single source of truth for profile facts and outbound links.
//
// URL policy (portfolio-content spec): GitHub and LinkedIn point to the
// user-confirmed profiles below (confirmed 2026-09-10). Any future link that
// is NOT user-confirmed must never be fabricated or guessed — ship it as a
// `TODO-URL-<NAME>` marker plus a visible "pendiente" label instead, and keep
// the marker out of published output until it is resolved.
export const profile = {
  fullName: 'Andrea Carolina Ropero Lozano',
  role: 'Estadística',
  positioning:
    'Del análisis estadístico y el modelamiento cuantitativo a la automatización industrial',
  email: 'aroperol@unal.edu.co',
  links: {
    // Confirmed by the user on 2026-09-10.
    github: 'https://github.com/andrearopero',
    linkedin: 'https://www.linkedin.com/in/andrea-ropero-lozano-a9a823207/',
  },
} as const;
