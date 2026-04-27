// Debug test runner
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcPath = path.join(__dirname, 'src');

const checks = {
  'Header.jsx': fs.existsSync(path.join(srcPath, 'Header', 'Header.jsx')),
  'Footer.jsx': fs.existsSync(path.join(srcPath, 'Footer', 'Footer.jsx')),
  'Login.jsx': fs.existsSync(path.join(srcPath, 'Login', 'Login.jsx')),
  'App.jsx': fs.existsSync(path.join(srcPath, 'App', 'App.jsx')),
  'Header.css': fs.existsSync(path.join(srcPath, 'Header', 'Header.css')),
  'Footer.css': fs.existsSync(path.join(srcPath, 'Footer', 'Footer.css')),
  'Login.css': fs.existsSync(path.join(srcPath, 'Login', 'Login.css')),
  'Header.spec.js': fs.existsSync(path.join(srcPath, 'Header', 'Header.spec.js')),
  'Footer.spec.js': fs.existsSync(path.join(srcPath, 'Footer', 'Footer.spec.js')),
  'Login.spec.js': fs.existsSync(path.join(srcPath, 'Login', 'Login.spec.js'))
};

console.log('File existence checks:');
for (const [file, exists] of Object.entries(checks)) {
  console.log(`${exists ? '✓' : '✗'} ${file}: ${exists}`);
}

console.log('\nAll checks passed:', Object.values(checks).every(v => v));
