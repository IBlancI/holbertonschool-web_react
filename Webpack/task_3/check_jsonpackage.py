# check_jsonpackage.py (version simplifiée)
import json
pkg = json.load(open('package.json'))
dev = pkg.get('devDependencies', {})
scripts = pkg.get('scripts', {})

print('webpack-dev-server' in dev)
print('html-webpack-plugin' in dev)
print('clean-webpack-plugin' in dev)
print(scripts.get('start-dev') == 'webpack-dev-server --open')