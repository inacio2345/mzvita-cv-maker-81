
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_POSTS_PATH = path.join(__dirname, '../src/data/blogPosts.ts');
const PUBLIC_SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');
const SITE_URL = 'https://www.mozvita.online';

function generateSitemap() {
    console.log('Generating sitemap...');

    try {
        const fileContent = fs.readFileSync(BLOG_POSTS_PATH, 'utf8');

        // Regex to extract slugs and dates
        // Matches: slug: "my-slug", ... date: "2024-01-01"
        const regex = /slug:\s*"([^"]+)"[\s\S]*?date:\s*"([^"]+)"/g;

        let match;
        const posts = [];

        while ((match = regex.exec(fileContent)) !== null) {
            posts.push({
                slug: match[1],
                date: match[2]
            });
        }

        console.log(`Found ${posts.length} blog posts.`);

        const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/criar-cv</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${SITE_URL}/exemplos-cv-mocambique</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Blog Posts -->
  ${posts.map(post => `
  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`;

        fs.writeFileSync(PUBLIC_SITEMAP_PATH, sitemapContent);
        console.log(`✅ Sitemap generated at ${PUBLIC_SITEMAP_PATH}`);

    } catch (error) {
        console.error('Error generating sitemap:', error);
        process.exit(1);
    }
}

generateSitemap();
