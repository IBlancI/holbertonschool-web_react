// Debug script to understand what the checker is looking for
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('=== DEBUGGING CHECKER ===');
console.log('Current directory:', __dirname);

const srcPath = path.join(__dirname, 'src');
console.log('Source path:', srcPath);
console.log('Source path exists:', fs.existsSync(srcPath));

// Check all possible file locations and variations
const filesToCheck = [
  // .jsx files
  { path: path.join(srcPath, 'Header', 'Header.jsx'), name: 'Header/Header.jsx' },
  { path: path.join(srcPath, 'Footer', 'Footer.jsx'), name: 'Footer/Footer.jsx' },
  { path: path.join(srcPath, 'Login', 'Login.jsx'), name: 'Login/Login.jsx' },
  { path: path.join(srcPath, 'App', 'App.jsx'), name: 'App/App.jsx' },

  // .js files (alternative)
  { path: path.join(srcPath, 'Header', 'Header.js'), name: 'Header/Header.js' },
  { path: path.join(srcPath, 'Footer', 'Footer.js'), name: 'Footer/Footer.js' },
  { path: path.join(srcPath, 'Login', 'Login.js'), name: 'Login/Login.js' },
  { path: path.join(srcPath, 'App', 'App.js'), name: 'App/App.js' },

  // CSS files
  { path: path.join(srcPath, 'Header', 'Header.css'), name: 'Header/Header.css' },
  { path: path.join(srcPath, 'Footer', 'Footer.css'), name: 'Footer/Footer.css' },
  { path: path.join(srcPath, 'Login', 'Login.css'), name: 'Login/Login.css' },

  // Spec files
  { path: path.join(srcPath, 'Header', 'Header.spec.js'), name: 'Header/Header.spec.js' },
  { path: path.join(srcPath, 'Footer', 'Footer.spec.js'), name: 'Footer/Footer.spec.js' },
  { path: path.join(srcPath, 'Login', 'Login.spec.js'), name: 'Login/Login.spec.js' },

  // Direct in src (alternative structure)
  { path: path.join(srcPath, 'Header.jsx'), name: 'Header.jsx (direct)' },
  { path: path.join(srcPath, 'Footer.jsx'), name: 'Footer.jsx (direct)' },
  { path: path.join(srcPath, 'Login.jsx'), name: 'Login.jsx (direct)' },
  { path: path.join(srcPath, 'App.jsx'), name: 'App.jsx (direct)' },
];

console.log('\n=== FILE EXISTENCE CHECK ===');
filesToCheck.forEach(file => {
  const exists = fs.existsSync(file.path);
  const symbol = exists ? '✓' : '✗';
  console.log(`${symbol} ${file.name}: ${exists}`);
});

// Read directory structure
console.log('\n=== DIRECTORY STRUCTURE ===');
function printDirStructure(dir, indent = '') {
  try {
    const items = fs.readdirSync(dir);
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        console.log(`${indent}📁 ${item}/`);
        printDirStructure(fullPath, indent + '  ');
      } else {
        console.log(`${indent}📄 ${item}`);
      }
    });
  } catch (err) {
    console.log(`${indent}❌ Error reading directory: ${err.message}`);
  }
}

printDirStructure(srcPath);

// Test import simulation
console.log('\n=== TESTING COMPONENT STRUCTURE ===');
const componentDirs = ['Header', 'Footer', 'Login', 'App'];
componentDirs.forEach(comp => {
  const compDir = path.join(srcPath, comp);
  const exists = fs.existsSync(compDir);
  console.log(`\n${comp}:`);
  console.log(`  Directory exists: ${exists}`);
  if (exists) {
    const files = fs.readdirSync(compDir);
    console.log(`  Files: ${files.join(', ')}`);
  }
});
