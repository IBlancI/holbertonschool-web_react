// react_intro/task_1/dashboard/src/utils.js
// utilitaires simples pour le footer

export function getCurrentYear() {
  return new Date().getFullYear();
}

/**
 * @param {boolean} isIndex
 *  - true  => "Holberton School"
 *  - false => "Holberton School main dashboard"
 */
export function getFooterCopy(isIndex) {
  return isIndex ? 'Holberton School' : 'Holberton School main dashboard';
}

// NEW
export function getLatestNotification() {
  // Doit retourner cette string EXACTE (avec balises)
  return '<strong>Urgent requirement</strong> - complete by EOD';
}
