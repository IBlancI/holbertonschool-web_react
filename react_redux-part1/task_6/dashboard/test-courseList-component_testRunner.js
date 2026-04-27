// ESM-compatible runner for projects with "type": "module"

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Hook Babel so Node can import JSX/ESM files
require('@babel/register')({
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  extensions: ['.js', '.jsx'],
  ignore: [/node_modules/],
});

const React = require('react');
const ReactDOMServer = require('react-dom/server');

// Try .js first, then .jsx
let CourseList;
try {
  CourseList = require('./src/CourseList/CourseList.js');
  CourseList = CourseList.default || CourseList;
} catch {
  CourseList = require('./src/CourseList/CourseList.jsx');
  CourseList = CourseList.default || CourseList;
}

const render = (el) => ReactDOMServer.renderToStaticMarkup(el);
const count = (str, re) => (str.match(re) || []).length;

// Test 1: 3 courses -> 5 rows total (2 header + 3 body)
const courses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];
const htmlWithCourses = render(React.createElement(CourseList, { courses }));
const totalRows = count(htmlWithCourses, /<tr\b/gi);

// Test 2: empty array -> tbody has exactly 1 row with the empty text
const htmlEmpty = render(React.createElement(CourseList, { courses: [] }));
const tbodyMatch = htmlEmpty.match(/<tbody>([\s\S]*?)<\/tbody>/i);
const tbodyHtml = (tbodyMatch && tbodyMatch[1]) || '';
const tbodyRows = count(tbodyHtml, /<tr\b/gi);
const hasEmptyText = /No course available yet/i.test(tbodyHtml);

// Final verdict (match the checker’s expected output)
if (totalRows === 5 && tbodyRows === 1 && hasEmptyText) {
  console.log('OK');
} else {
  console.log('NOK');
  // Uncomment for debugging:
  // console.log({ totalRows, tbodyRows, hasEmptyText, htmlWithCourses, htmlEmpty });
}
