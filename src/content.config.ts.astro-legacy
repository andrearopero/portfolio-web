import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Markdown-only collections: no MDX, no rehype-raw — entry files are data,
// never executable (threat matrix: documentation-like paths).
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    objective: z.string(),
    // Only R and Python are traceable skills; at least one required.
    tools: z.array(z.enum(['R', 'Python'])).min(1),
    learning: z.string(),
    // Every shipped project is academic work — no client/commercial framing.
    academic: z.literal(true),
  }),
});

const education = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/education' }),
  schema: z
    .object({
      title: z.string(),
      kind: z.enum(['degree', 'training']),
      status: z.enum(['current', 'completed']),
      institution: z.string().optional(),
      period: z.string().optional(),
    })
    // "Current" programs publish no institution or dates: those facts are
    // unconfirmed, and the schema itself rejects them at build time.
    .refine((entry) => entry.status === 'completed' || (!entry.institution && !entry.period), {
      message: "current entries must omit institution/period (unconfirmed facts)",
    }),
});

export const collections = { projects, education };
