// testRunner-seq3.js (ESM, sans JSX)
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Notifications from './src/Notifications.js'; // ⚠️ importe la version Node-safe (.js), pas le .jsx

// Capture des logs pour tester l'effet du clic
const originalLog = console.log;
let logMessages = [];
console.log = (msg) => logMessages.push(msg);

function findButtonOnClick(node) {
  // Cherche récursivement dans l'arbre React un <button> avec une prop onClick
  if (!node || typeof node !== 'object') return null;

  const { type, props } = node;
  if (type === 'button' && props && typeof props.onClick === 'function') {
    return props.onClick;
  }

  if (!props) return null;

  // Normaliser children en tableau
  const children = Array.isArray(props.children)
    ? props.children
    : props.children != null
    ? [props.children]
    : [];

  for (const child of children) {
    const found = findButtonOnClick(child);
    if (found) return found;
  }
  return null;
}

function runTests() {
  let ok = true;

  try {
    // 1) Rendu SSR sans JSX
    const element = React.createElement(Notifications);
    const html = ReactDOMServer.renderToStaticMarkup(element);

    // 2) Titre présent (ignore case)
    if (!/here is the list of notifications/i.test(html)) {
      ok = false;
    }

    // 3) Bouton avec aria-label="Close"
    if (!/aria-label="Close"/i.test(html)) {
      ok = false;
    }

    // 4) Exactement 3 <li>
    const liCount = (html.match(/<li/g) || []).length;
    if (liCount !== 3) {
      ok = false;
    }

    // 5) Simuler le clic: récupérer onClick sur le <button> et l'appeler
    const onClick = findButtonOnClick(element);
    if (typeof onClick !== 'function') {
      ok = false;
    } else {
      onClick(); // devrait pousser "Close button has been clicked" dans logMessages
      if (!logMessages.includes('Close button has been clicked')) {
        ok = false;
      }
    }
  } catch {
    ok = false;
  }

  // Restaure console.log et affiche le verdict attendu par le checker
  console.log = originalLog;
  console.log(ok ? 'OK' : 'NOK');
}

runTests();
