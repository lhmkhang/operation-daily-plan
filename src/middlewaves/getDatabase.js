import logger from './logger.js';
const loggerInfo = logger.getLogger('infoLogger');
const loggerError = logger.getLogger('errorLogger');
import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;
import dotenv from 'dotenv';
dotenv.config();

let client1, client2;

async function connect() {
    try {
        client1 = new MongoClient(process.env.DB_CONNECTION_STRING_DEV, { useNewUrlParser: true, useUnifiedTopology: true });
        client2 = new MongoClient(process.env.DB_CONNECTION_STRING_PRO, { useNewUrlParser: true, useUnifiedTopology: true });
        await client1.connect();
        await client2.connect();
        loggerError.info('Connected successfully to databases');
    } catch (err) {
        console.error('Failed to connect to databases', err);
        setTimeout(connect, 5000);  // Thử kết nối lại sau 5 giây
    }
}

export async function getDBDev(dbName) {
    if (!client1 || !client1.topology.isConnected()) {
        await connect();
    }
    return client1.db(dbName);
}

export async function getDBPro(dbName) {
    if (!client2 || !client2.topology.isConnected()) {
        await connect();
    }
    return client2.db(dbName);
}

connect();  // Kết nối tới DBs ngay khi app start

// Xử lý khi chương trình bị tắt
process.on('exit', (code) => {
    if (client1 && client1.topology.isConnected()) {
        console.log('Closing MongoDB connection 1');
        client1.close();
    }
    if (client2 && client2.topology.isConnected()) {
        console.log('Closing MongoDB connection 2');
        client2.close();
    }
});

// export default { getDBDev, getDBPro };
