const path = require('path');

// путь к файлу с версткой
const createPath = (page) => path.resolve(__dirname, '../views', `${page}.ejs`);

module.exports = createPath;
