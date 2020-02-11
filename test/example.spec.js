const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8000/?id=47');
  await page.screenshot({ path: 'menu.png' });

  await browser.close();
})();
