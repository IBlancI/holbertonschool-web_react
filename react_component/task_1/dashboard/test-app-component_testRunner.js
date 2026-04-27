// Test runner for task_1 - Check App component lifecycle methods
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  const srcPath = path.join(__dirname, 'src');
  const appPath = path.join(srcPath, 'App', 'App.jsx');
  const appSpecPath = path.join(srcPath, 'App', 'App.spec.js');

  // Check if files exist
  if (!fs.existsSync(appPath)) {
    console.log('NOK - App.jsx not found');
    process.exit(1);
  }

  if (!fs.existsSync(appSpecPath)) {
    console.log('NOK - App.spec.js not found');
    process.exit(1);
  }

  // Read App.jsx content
  const appContent = fs.readFileSync(appPath, 'utf8');

  // Check for required elements in App.jsx
  const hasLogOutProp = appContent.includes('logOut');
  const hasDefaultProps = appContent.includes('defaultProps');
  const hasComponentDidMount = appContent.includes('componentDidMount');
  const hasComponentWillUnmount = appContent.includes('componentWillUnmount');
  const hasEventListener = appContent.includes('addEventListener') && appContent.includes('keydown');
  const hasRemoveEventListener = appContent.includes('removeEventListener');
  const hasAlert = appContent.includes('alert');

  // Read App.spec.js content
  const specContent = fs.readFileSync(appSpecPath, 'utf8');

  // Check for required tests
  const hasLogOutTest = specContent.includes('logOut') && specContent.includes('mock');
  const hasAlertTest = specContent.includes('alert') && (specContent.includes('spy') || specContent.includes('mock'));
  const hasCtrlHTest = specContent.includes('ctrlKey') || specContent.includes('ctrl');

  console.log('Debug checks:');
  console.log('- logOut prop:', hasLogOutProp);
  console.log('- defaultProps:', hasDefaultProps);
  console.log('- componentDidMount:', hasComponentDidMount);
  console.log('- componentWillUnmount:', hasComponentWillUnmount);
  console.log('- addEventListener keydown:', hasEventListener);
  console.log('- removeEventListener:', hasRemoveEventListener);
  console.log('- alert:', hasAlert);
  console.log('- logOut test:', hasLogOutTest);
  console.log('- alert test:', hasAlertTest);
  console.log('- Ctrl+h test:', hasCtrlHTest);

  if (!hasLogOutProp || !hasDefaultProps || !hasComponentDidMount ||
      !hasComponentWillUnmount || !hasEventListener || !hasRemoveEventListener ||
      !hasAlert || !hasLogOutTest || !hasAlertTest || !hasCtrlHTest) {
    console.log('NOK - Missing required implementation');
    process.exit(1);
  }

  console.log('OK');
} catch (error) {
  console.log('NOK - Error:', error.message);
  process.exit(1);
}
