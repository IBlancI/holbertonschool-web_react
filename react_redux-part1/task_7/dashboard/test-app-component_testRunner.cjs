#!/usr/bin/env node
/* eslint-env node */
// CommonJS runner basé sur @jest/core (compatible "type": "module")

const { runCLI } = require('@jest/core');

(async () => {
  try {
    // Arguments Jest par défaut (verbeux)
    const jestArgv = {
      runInBand: true,
      verbose: true,
      // Ne lance que ce spec :
      _: ['test-app-component.spec.js'],
      $0: 'runner',
    };

    const { results } = await runCLI(jestArgv, [process.cwd()]);

    // Affichage résumé (Jest a déjà loggé le détail en verbose)
    console.log(results.success ? 'OK' : 'NOK');

    // Code de sortie en fonction du succès
    process.exitCode = results.success ? 0 : 1;
  } catch (err) {
    console.error(err);
    console.log('NOK');
    process.exitCode = 1;
  }
})();
