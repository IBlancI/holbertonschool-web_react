// Test runner for task_0 - Check if App is a class component
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  const srcPath = path.join(__dirname, 'src');
  const appPath = path.join(srcPath, 'App', 'App.jsx');

  // Check if App.jsx exists
  if (!fs.existsSync(appPath)) {
    console.log('NOK - App.jsx not found');
    process.exit(1);
  }

  // Read App.jsx content
  const appContent = fs.readFileSync(appPath, 'utf8');

  // Check if it's a class component
  const hasClassDeclaration = appContent.includes('class App');
  const extendsReactComponent = appContent.includes('extends React.Component') ||
                                 appContent.includes('extends Component');
  const hasRenderMethod = appContent.includes('render()') || appContent.includes('render ()');

  if (!hasClassDeclaration || !extendsReactComponent || !hasRenderMethod) {
    console.log('NOK - App is not a class component');
    process.exit(1);
  }

  console.log('OK');
} catch (error) {
  console.log('NOK - Error:', error.message);
  process.exit(1);
}
