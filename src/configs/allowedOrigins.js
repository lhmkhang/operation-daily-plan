const path = require('path');
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "../..", ".env") });

const allowedOrigins = [
    'http://10.1.23.167:8090',
    'http://localhost:3500'
];

module.exports = allowedOrigins;