// testRunner-seq3_detail.js (ESM, sans JSX, extraction directe du bouton)
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Notifications from './src/Notifications.js'; // version Node-safe (.js)

const originalLog = console.log;
let logs = [];
console.log = (msg) => logs.push(String(msg));

function printSection(title) {
  console.error(`\n=== ${title} ===`);
}

function runTests() {
  let ok = true;

  try {
    // 0) On crée l'élément racine
    const element = React.createElement(Notifications);

    // 1) Rendu SSR pour vérifier titre/aria/<li>
    const html = ReactDOMServer.renderToStaticMarkup(element);

    printSection('HTML (extrait)');
    console.error(html.slice(0, 300) + (html.length > 300 ? '…' : ''));

    // (a) Titre
    if (!/here is the list of notifications/i.test(html)) {
      printSection('ERREUR TITRE');
      console.error('Texte attendu introuvable');
      ok = false;
    } else {
      console.error('OK: titre trouvé.');
    }

    // (b) aria-label
    if (!/aria-label="Close"/i.test(html)) {
      printSection('ERREUR BOUTON');
      console.error('aria-label="Close" introuvable');
      ok = false;
    } else {
      console.error('OK: bouton avec aria-label="Close" trouvé.');
    }

    // (c) 3 <li>
    const liCount = (html.match(/<li/g) || []).length;
    if (liCount !== 3) {
      printSection('ERREUR NOMBRE <li>');
      console.error(`Attendu: 3, Obtenu: ${liCount}`);
      ok = false;
    } else {
      console.error('OK: exactement 3 <li>.');
    }

    // 2) Clic -> log (extraction directe du bouton dans l'arbre React "non rendu")
    // On évalue le composant pour obtenir l'arbre d'éléments React
    const tree = Notifications(); // retourne un ReactElement racine (le <div>)

    // Sélectionne le <button> : c'est le 1er enfant du <div>
    const children = Array.isArray(tree.props?.children)
      ? tree.props.children
      : (tree.props?.children != null ? [tree.props.children] : []);

    const btn = children.find((child) => child && child.type === 'button');
    const onClick = btn?.props?.onClick;

    if (typeof onClick !== 'function') {
      printSection('ERREUR onClick');
      console.error('Impossible de trouver la prop onClick du <button>.');
      ok = false;
    } else {
      const before = logs.length;
      onClick();
      const expected = 'Close button has been clicked';
      const after = logs.length;
      if (after === before || !logs.includes(expected)) {
        printSection('ERREUR LOG CLIC');
        console.error(`Log attendu introuvable: "${expected}". Logs:`, logs);
        ok = false;
      } else {
        console.error('OK: log du clic trouvé.');
      }
    }
  } catch (e) {
    printSection('EXCEPTION');
    console.error(e && e.stack ? e.stack : e);
    ok = false;
  }

  console.log = originalLog;
  console.log(ok ? 'OK' : 'NOK');
}

runTests();
