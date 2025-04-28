const fs = require('fs');
const { version } = require('./package.json');
fs.writeFileSync('./version.js', `export const VERSION = "${version}";\n`);
console.log(`Version ${version} written to version.js`);
