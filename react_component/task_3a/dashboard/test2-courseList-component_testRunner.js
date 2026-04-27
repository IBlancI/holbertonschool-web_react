// ESM-safe + scan récursif pour trouver CourseList
// Exécution : node test-courseList-component_testRunner.js
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
const require = createRequire(import.meta.url);

// Permet à Node de comprendre JSX/ESM
require('@babel/register')({
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  extensions: ['.js', '.jsx'],
  ignore: [/node_modules/],
});

// Ignorer les imports d'assets et de styles (Node ne sait pas les charger)
;[
  '.css', '.scss', '.sass', '.less',
  '.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp', '.avif'
].forEach((ext) => {
  require.extensions[ext] = () => {};
});

const React = require('react');
const ReactDOMServer = require('react-dom/server');

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, 'src');

function findCourseListFile(dir) {
  const candidates = [];
  function walk(d) {
    let entries = [];
    try {
      entries = fs.readdirSync(d, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) {
        walk(full);
      } else {
        const unixy = full.replace(/\\/g, '/');
        if (
          /\/CourseList\/CourseList\.(jsx|js)$/i.test(unixy) ||
          /\/CourseList\/index\.(jsx|js)$/i.test(unixy) ||
          /\/CourseList\.(jsx|js)$/i.test(unixy) // fallback
        ) {
          candidates.push(full);
        }
      }
    }
  }
  walk(dir);
  // on préfère .js (souvent attendu par les runners), puis .jsx
  candidates.sort((a, b) => {
    const ascore = a.endsWith('.js') ? 0 : 1;
    const bscore = b.endsWith('.js') ? 0 : 1;
    return ascore - bscore;
  });
  return candidates[0] || null;
}

function loadCourseList() {
  // essais classiques rapides
  const quick = [
    path.join(SRC_DIR, 'CourseList', 'CourseList.js'),
    path.join(SRC_DIR, 'CourseList', 'CourseList.jsx'),
    path.join('src', 'CourseList', 'CourseList.js'),
    path.join('src', 'CourseList', 'CourseList.jsx'),
  ];
  for (const p of quick) {
    try {
      const mod = require(p);
      return mod.default || mod;
    } catch {}
  }
  // sinon on scanne
  const found = findCourseListFile(SRC_DIR);
  if (!found) {
    throw new Error('CourseList component not found under src/.');
  }
  try {
    const mod = require(found);
    return mod.default || mod;
  } catch (e) {
    throw new Error(`Found CourseList at ${found} but failed to require it: ${e.message}`);
  }
}

const CourseList = loadCourseList();
const render = (el) => ReactDOMServer.renderToStaticMarkup(el);
const count = (s, re) => (s.match(re) || []).length;

// --- Test 1: 3 cours -> 5 <tr> au total (2 header + 3 body)
const courses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];
const htmlWithCourses = render(React.createElement(CourseList, { courses }));
const totalRows = count(htmlWithCourses, /<tr\b/gi);

// --- Test 2: tableau vide -> 1 <tr> dans <tbody>, texte "No course available yet"
// et cellule unique avec colSpan=2 (td ou th accepté)
const htmlEmpty = render(React.createElement(CourseList, { courses: [] }));
const tbodyMatch = htmlEmpty.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/i);
const tbodyHtml = (tbodyMatch && tbodyMatch[1]) || '';
const tbodyRows = count(tbodyHtml, /<tr\b/gi);
const hasEmptyText = /No course available yet/i.test(tbodyHtml);
const hasColSpan2 = /<(td|th)\b[^>]*colspan\s*=\s*["']?2["']?[^>]*>/i.test(tbodyHtml);

// Verdict
if (totalRows === 5 && tbodyRows === 1 && hasEmptyText && hasColSpan2) {
  console.log('OK');
} else {
  console.log('NOK');
  // Debug (décommente si besoin)
  // console.log({
  //   totalRows, tbodyRows, hasEmptyText, hasColSpan2,
  //   htmlWithCourses, htmlEmpty
  // });
}
