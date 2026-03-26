
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function submitToIndexNow() {
    const host = 'www.mozvita.online';
    const key = 'mozvita2026x9k3p7q4r8t1v6z2n5b0c';
    const keyLocation = `https://${host}/${key}.txt`;

    console.log('🚀 Starting IndexNow submission...');

    try {
        // 1. Read sitemap from local public folder
        const sitemapPath = path.join(__dirname, '../public/sitemap.xml');

        if (!fs.existsSync(sitemapPath)) {
            console.error('❌ Sitemap not found at:', sitemapPath);
            return;
        }

        const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');

        // Simple regex to extract URLs from sitemap
        const urlRegex = /<loc>(https:\/\/www\.mozvita\.online\/[^<]+)<\/loc>/g;
        const urlList = [];
        let match;

        while ((match = urlRegex.exec(sitemapXml)) !== null) {
            const url = match[1];
            if (url.startsWith(`https://${host}`)) {
                urlList.push(url);
            }
        }

        if (urlList.length === 0) {
            console.log('⚠️ No URLs found in sitemap to submit.');
            return;
        }

        console.log(`📝 Found ${urlList.length} URLs. Submitting to IndexNow...`);

        // 2. Submit to IndexNow
        const response = await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                host,
                key,
                keyLocation,
                urlList: urlList.slice(0, 10000)
            })
        });

        if (response.status === 200 || response.status === 202) {
            console.log('✅ URLs submitted successfully to IndexNow!');
        } else {
            const errorText = await response.text();
            console.error(`❌ IndexNow API error (${response.status}):`, errorText);
        }
    } catch (error) {
        console.error('❌ IndexNow submission failed:', error.message);
    }
}

submitToIndexNow();
