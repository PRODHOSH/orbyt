import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // Replace with your production domain before deploying
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://orbyt.campus'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Disallow search engines from indexing internal authenticated routes
      disallow: ['/dashboard/', '/api/', '/auth/', '/onboarding/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
