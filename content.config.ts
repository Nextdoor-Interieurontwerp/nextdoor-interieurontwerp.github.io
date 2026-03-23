import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const localeFields = z.object({
  title: z.string().optional(),
  category: z.string().optional(),
  location: z.string().optional(),
  services: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**',
      schema: z.object({
        slug: z.string().optional(),
        image: z.string().optional(),
        translations: z.object({
          nl: localeFields.optional(),
          en: localeFields.optional(),
        }).optional(),
      }),
    }),
  },
})
