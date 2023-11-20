const path = require('path');
const dotenv = require("dotenv").config({ path: path.resolve(__dirname, "../..", ".env") });

const allowedOrigins = process.env.ALLOW_CORS.split(',');
// const allowedOrigins = require('../configs/allowedOrigins');

const credentials = (req, res, next) => {
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader("Content-Security-Policy", "default-src 'self'");
        res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.setHeader("X-Frame-Options", "DENY");
        res.setHeader("X-XSS-Protection", "1; mode=block");
        res.setHeader("Referrer-Policy", "no-referrer");
        res.setHeader("Feature-Policy", "vibrate 'none'; geolocation 'none'");
        // res.setHeader("Access-Control-Allow-Origin", '*')
    }
    next();
}

module.exports = credentials