// urlCheck_testRunner.js
import fs from 'fs';

function read(path) {
  return fs.existsSync(path) ? fs.readFileSync(path, 'utf8') : '';
}

let url = 'https://sdinahet.github.io/holbertonschool-web_react/';
const txt = read('holberton-dashboard.txt').trim();
if (txt) url = txt;

try {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error('Bad status');
  const html = await res.text();

  const hasFaviconTag = /<link[^>]+rel=["']icon["'][^>]+href=["']favicon\.ico["']/i.test(html);
  const hasAssetsPaths = /\/holbertonschool-web_react\/assets\//i.test(html);

  const fav = new URL('favicon.ico', url).toString();
  const favHead = await fetch(fav, { method: 'HEAD' });
  const favOk = favHead.ok;

  console.log(hasFaviconTag && hasAssetsPaths && favOk ? 'OK' : 'NOK');
} catch {
  console.log('NOK');
}
