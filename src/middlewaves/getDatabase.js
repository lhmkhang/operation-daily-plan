const path = require("path");
const logger = require('./logger.js');
const mongodb = require('mongodb');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, "../..", ".env") });

const MongoClient = mongodb.MongoClient;
const loggerInfo = logger.getLogger('infoLogger');
const loggerError = logger.getLogger('errorLogger');
let client1;

async function connect() {
    try {
        client1 = new MongoClient(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
        await client1.connect();
        loggerInfo.info('Connected successfully to databases');
    } catch (err) {
        loggerError.error('Failed to connect to databases', err);
        setTimeout(connect, 5000);  // Thử kết nối lại sau 5 giây
    }
}

async function getDatabase(dbName) {
    if (!client1 || !client1.topology.isConnected()) {
        await connect();
    }
    return client1.db(dbName);
}

connect();  // Kết nối tới DBs ngay khi app start

// Xử lý khi chương trình bị tắt
process.on('exit', (code) => {
    if (client1 && client1.topology.isConnected()) {
        loggerInfo.info('Closing MongoDB connection 1');
        client1.close();
    }
});

module.exports = { getDatabase };
