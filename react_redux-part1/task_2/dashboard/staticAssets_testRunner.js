// staticAssets_testRunner.js
import fs from 'fs';

const fails = [];

function must(label, cond) {
  if (!cond) fails.push(label);
}

function exists(p) {
  try { return fs.existsSync(p); } catch { return false; }
}

function read(p) {
  try { return fs.readFileSync(p, 'utf8'); } catch { return ''; }
}

// Présence des fichiers
must('public/favicon.ico', exists('public/favicon.ico'));
must('src/assets/holberton-logo.jpg', exists('src/assets/holberton-logo.jpg'));
must('src/assets/close-icon.png', exists('src/assets/close-icon.png'));

// index.html favicon relatif
const indexHtml = read('index.html');
must('favicon link', /<link[^>]+rel=["']icon["'][^>]+href=["']favicon\.ico["']/.test(indexHtml));

// App.jsx: import + alt exact
const app = read('src/App.jsx');
must('App import logo', /import\s+logo\s+from\s+["']\.\/assets\/holberton-logo\.jpg["']/.test(app));
must('App alt holberton logo', /alt=["']holberton logo["']/.test(app));

// Notifications.jsx: import + alt exact
const notif = read('src/Notifications.jsx');
must('Notif import close-icon', /import\s+\w+\s+from\s+["']\.\/assets\/close-icon\.png["']/.test(notif));
must('Notif alt close', /alt=["']close["']/.test(notif));

// Sortie stricte attendue par le checker
console.log(fails.length === 0 ? 'OK' : 'NOK');
