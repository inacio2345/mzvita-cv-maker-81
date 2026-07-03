const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('http://localhost:8081/criar-cv', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 3000));
  
  const elements = await page.evaluate(() => {
    const results = [];
    const walk = (el, depth) => {
      if (depth > 8) return;
      const rect = el.getBoundingClientRect();
      if (rect.height > 50) {
        results.push({
          tag: el.tagName,
          className: el.className,
          top: rect.top,
          height: rect.height,
          id: el.id
        });
      }
      for (const child of el.children) {
        walk(child, depth + 1);
      }
    };
    walk(document.body, 0);
    return results;
  });
  
  console.log(JSON.stringify(elements, null, 2));
  await browser.close();
})();
