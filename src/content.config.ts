import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const localized = z.object({
  en: z.string(),
  zh: z.string(),
  ja: z.string()
});

const media = z.object({
  type: z.enum(['image', 'video', 'youtube']),
  src: z.string(),
  poster: z.string().optional(),
  alt: localized
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: localized,
    summary: localized,
    client: z.enum(['momiji', 'kea-lani', 'sugoi', 'ideal-foods', 'independent']).optional(),
    categories: z.array(z.enum([
      'video-commercials',
      'short-form',
      'vfx',
      'ai-video',
      'precision-editing',
      'non-profit',
      'poster',
      'table-tent',
      'menu',
      'social-image',
      'logo',
      'other'
    ])),
    year: z.number(),
    roles: z.array(z.string()),
    cover: z.string(),
    media: z.array(media),
    featured: z.boolean().default(false),
    order: z.number().default(100),
    published: z.boolean().default(true)
  })
});

export const collections = { projects };
