const path = require('path');
const dotenv = require("dotenv").config({ path: path.resolve(__dirname, "../..", ".env") });

const allowedOrigins = process.env.ALLOW_CORS.split(',');

const corsOptions = {
    origin: (origin, callback) => {

        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;