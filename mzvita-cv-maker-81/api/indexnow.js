
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    // Allow manual execution or POST requests
    if (req.method !== 'GET' && req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const host = 'www.mozvita.online';
    const key = 'mozvita2026x9k3p7q4r8t1v6z2n5b0c';
    const keyLocation = `https://${host}/${key}.txt`;

    try {
        // 1. Get URLs from sitemap
        // In Vercel, public files are usually in the root or accessible via filesystem in some configs, 
        // but for a robust serverless function, we might need to fetch it or read from the build output.
        // However, since this is a Vite project deployed on Vercel, the 'public' folder content 
        // is served at root.

        // For the serverless function, we'll try to find the sitemap.
        // If we're running in Vercel, we might need to fetch it using the absolute URL.
        const sitemapUrl = `https://${host}/sitemap.xml`;
        const response = await fetch(sitemapUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch sitemap: ${response.statusText}`);
        }

        const sitemapXml = await response.text();

        // Simple regex to extract URLs from sitemap
        const urlRegex = /<loc>(https:\/\/www\.mozvita\.online\/[^<]+)<\/loc>/g;
        const urlList = [];
        let match;

        while ((match = urlRegex.exec(sitemapXml)) !== null) {
            const url = match[1];
            // Only add URLs from the target host
            if (url.startsWith(`https://${host}`)) {
                urlList.push(url);
            }
        }

        if (urlList.length === 0) {
            return res.status(200).json({ message: 'No URLs found to submit.' });
        }

        // 2. Submit to IndexNow
        const indexNowResponse = await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                host,
                key,
                keyLocation,
                urlList: urlList.slice(0, 10000) // IndexNow limit
            })
        });

        if (indexNowResponse.status === 200 || indexNowResponse.status === 202) {
            return res.status(200).json({
                success: true,
                message: 'URLs submitted successfully to IndexNow.',
                count: urlList.length,
                urls: urlList
            });
        } else {
            const errorText = await indexNowResponse.text();
            return res.status(indexNowResponse.status).json({
                success: false,
                error: `IndexNow API error: ${errorText}`
            });
        }
    } catch (error) {
        console.error('IndexNow submission failed:', error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
