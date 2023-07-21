const jwt = require('jsonwebtoken');
const { getDatabase } = require('../middlewaves/getDatabase.js');
const logger = require('../middlewaves/logger.js');

const loggerError = logger.getLogger('errorLogger');
const loggerInfo = logger.getLogger('infoLogger');

const getNavbarItem = async (req, res) => {

    try {
        const database = await getDatabase("operation")
        const collection = database.collection('menu_item')
        const list_item = await collection.findOne({}, { projection: { _id: 0 } });
        return res.json(list_item);
    } catch (error) {
        loggerError.error(error);
    }

};

const getRoot = (req, res) => {
    return res.send("Welcome to backend express server!")
};

const getUser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const database = await getDatabase('operation');
        const userCollection = database.collection('users');
        const user = await userCollection.findOne({ username: username });

        if (!user || user.password !== password) {
            loggerError.error('Invalid username or password');
            res.status(400).json({ error: 'Invalid username or password' });
        } else {

            loggerInfo.info('Login successful');

            const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRE_TOKEN_IN })
            req.session.user = user;
            req.session.user.group = user.group;
            res.cookie('user_id', user._id, { maxAge: Number(process.env.SESSION_LIFE_TIME) });
            res.json({ token, expiresIn: process.env.EXPIRE_TOKEN_IN, receivedTime: new Date() });
        }
    } catch (err) {
        loggerError.error(err);
    }
};

module.exports = { getNavbarItem, getRoot, getUser };
