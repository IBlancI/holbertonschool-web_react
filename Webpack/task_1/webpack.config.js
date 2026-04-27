const path = require('path');

module.exports = {
  mode: 'production', // required by the task
  entry: './js/dashboard_main.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js' // required name
  }
};
