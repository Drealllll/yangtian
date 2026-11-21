import { mkdir, readFile, writeFile, cp } from 'node:fs/promises';
const pages = ['publications', 'software', 'talks', 'teaching', 'cv', 'outreach', 'contact', 'sources'];
await mkdir('dist/assets', { recursive: true });
await cp('assets', 'dist/assets', { recursive: true });
const template = await readFile('index.html', 'utf8');
await writeFile('dist/index.html', template.replaceAll('__BASE__', './').replaceAll('__PAGE__', 'home'));
for (const page of pages) {
  await mkdir(`dist/${page}`, { recursive: true });
  await writeFile(`dist/${page}/index.html`, template.replaceAll('__BASE__', '../').replaceAll('__PAGE__', page));
}
console.log(`Built ${pages.length + 1} pages in dist/`);
