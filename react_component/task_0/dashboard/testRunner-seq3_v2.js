// testRunner-seq3.js (ESM, sans JSX, version corrigée)
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Notifications from './src/Notifications.js'; // <- version Node-safe (.js)

const originalLog = console.log;
let logs = [];
console.log = (msg) => logs.push(String(msg));

function runTests() {
  let ok = true;

  try {
    // 1) Rendu SSR pour vérifier titre / aria / <li>
    const element = React.createElement(Notifications);
    const html = ReactDOMServer.renderToStaticMarkup(element);

    if (!/here is the list of notifications/i.test(html)) ok = false;
    if (!/aria-label="Close"/i.test(html)) ok = false;

    const liCount = (html.match(/<li/g) || []).length;
    if (liCount !== 3) ok = false;

    // 2) Clic -> log (évaluer le composant pour obtenir l'arbre React)
    const tree = Notifications(); // <div ...>{ button, p, ul }</div>
    const children = Array.isArray(tree.props?.children)
      ? tree.props.children
      : (tree.props?.children != null ? [tree.props.children] : []);
    const btn = children.find((child) => child && child.type === 'button');
    const onClick = btn?.props?.onClick;

    if (typeof onClick !== 'function') {
      ok = false;
    } else {
      const before = logs.length;
      onClick();
      const expected = 'Close button has been clicked';
      if (logs.length === before || !logs.includes(expected)) ok = false;
    }
  } catch {
    ok = false;
  }

  console.log = originalLog;
  console.log(ok ? 'OK' : 'NOK');
}

runTests();
