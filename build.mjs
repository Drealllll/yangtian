import { mkdir, readFile, writeFile, cp } from 'node:fs/promises';
const pages = ['publications', 'software', 'talks', 'teaching', 'cv', 'outreach', 'contact', 'sources'];
await mkdir('dist/assets', { recursive: true });
await cp('assets', 'dist/assets', { recursive: true });
const siteUrl = (process.env.SITE_URL || 'https://drealllll.github.io/yangtiancr/').replace(/\/+$/, '') + '/';
const template = (await readFile('index.html', 'utf8')).replaceAll('__SITE_URL__', siteUrl);
await writeFile('dist/index.html', template.replaceAll('__BASE__', './').replaceAll('__PAGE__', 'home').replaceAll('__ROUTE__', ''));
await writeFile('dist/.nojekyll', '');
for (const page of pages) {
  await mkdir(`dist/${page}`, { recursive: true });
  await writeFile(`dist/${page}/index.html`, template.replaceAll('__BASE__', '../').replaceAll('__PAGE__', page).replaceAll('__ROUTE__', page + '/'));
}
console.log(`Built ${pages.length + 1} pages in dist/`);
