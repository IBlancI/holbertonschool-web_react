#!/bin/bash
# === lancer depuis: react_intro/task_4/dashboard ===
pass=true

check () {
  label="$1"; shift
  if eval "$@"; then
    echo "OK  - $label"
  else
    echo "NOK - $label"
    pass=false
  fi
}

echo "== Vérifs tâche 8 =="
echo "(dossier courant: $(pwd))"
echo

# 0) Fichiers présents
check "favicon.ico présent dans public/" \
  "[ -f public/favicon.ico ]"

check "logo holberton-logo.jpg présent dans src/assets/" \
  "[ -f src/assets/holberton-logo.jpg ]"

check "close-icon.png présent dans src/assets/" \
  "[ -f src/assets/close-button.png ]"

# 1) Favicon en chemin relatif (pas de chemin absolu /... )
check 'index.html -> <link rel="icon" href="favicon.ico">' \
  "grep -Eq '<link[^>]+rel=\"icon\"[^>]+href=\"favicon\\.ico\"' index.html"

# 2) App.jsx -> logo importé + alt EXACT 'holberton logo'
check 'App.jsx importe ./assets/holberton-logo.jpg' \
  "grep -q 'import logo from \"\\./assets/holberton-logo.jpg\"' src/App.jsx"

check 'App.jsx utilise alt="holberton logo"' \
  "grep -q 'alt=\"holberton logo\"' src/App.jsx"

# 3) Notifications.jsx -> utilise close-button.png + alt="close"
check "Notifications.jsx importe ./assets/close-button.png" \
  "grep -qE 'import\\s+.+\\s+from\\s+\\\"\\./assets/close-button\\.png\\\"' src/Notifications.jsx"

check 'Notifications.jsx utilise alt="close"' \
  "grep -q 'alt=\"close\"' src/Notifications.jsx"

# 3b) S'assurer qu'aucun ancien close-icon.png/closeIcon ne traîne
check "Aucune trace de close-icon.png dans src/" \
  "! grep -R -q 'close-icon\\.png' src || false"

check "Aucune trace de closeIcon dans src/" \
  "! grep -R -q '\\bcloseIcon\\b' src || false"

# 4) Vite configuré pour GitHub Pages
check "vite.config.js -> base: '/holbertonschool-web_react/'" \
  "grep -q \"base: '/holbertonschool-web_react/'\" vite.config.js"

# 5) package.json -> homepage + scripts de déploiement + postbuild 404
check "package.json -> homepage vers GitHub Pages" \
  "grep -qi '\"homepage\"\\s*:\\s*\"https://sdinahet.github.io/holbertonschool-web_react\"' package.json"

check "package.json -> script predeploy = npm run build" \
  "grep -q '\"predeploy\"\\s*:\\s*\"npm run build\"' package.json"

check "package.json -> script deploy = gh-pages -d dist" \
  "grep -q '\"deploy\"\\s*:\\s*\"gh-pages -d dist\"' package.json"

check "package.json -> postbuild copie 404.html" \
  "grep -q 'postbuild' package.json && grep -Eq 'dist/index\\.html.+dist/404\\.html' package.json"

# 6) URL fournie dans holberton-dashboard.txt (UNE seule ligne, exacte)
check "holberton-dashboard.txt existe" \
  "[ -f holberton-dashboard.txt ]"

# compare en minuscule et sans espaces
expected='https://sdinahet.github.io/holbertonschool-web_react/'
actual=$(tr -d '[:space:]' < holberton-dashboard.txt | tr '[:upper:]' '[:lower:]')
if [ "$actual" = "$expected" ]; then
  echo "OK  - holberton-dashboard.txt contient l'URL exacte"
else
  echo "NOK - holberton-dashboard.txt: attendu='$expected' | trouvé='$actual'"
  pass=false
fi

echo
if $pass; then
  echo "✅ Tous les checks locaux sont OK."
  echo
  echo "Ensuite :"
  echo "  rm -rf dist node_modules/.vite && npm run build && npm run deploy"
  echo "  puis revérifie en ligne: https://sdinahet.github.io/holbertonschool-web_react/"
else
  echo "❌ Il reste des NOK ci-dessus. Corrige-les puis relance le script."
fi
