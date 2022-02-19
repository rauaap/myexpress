const JSONdb = require('simple-json-db');
const path = require('path');

module.exports = new JSONdb(path.join(__dirname, 'db.json'))
