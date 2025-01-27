const { MongoClient } = require('mongodb');
require('dotenv').config();

const CONNECTION_URL = process.env.MONGO_URI;
const DB_NAME = 'cse341db';

var _db;

const initDb = async () => {
    if (_db) {
        console.log('Db is already initialized');
        return _db;
    }

    try {
        const client = await MongoClient.connect(CONNECTION_URL);
        _db = client.db(DB_NAME);
        console.log('Database initialized!');
        return _db;
    } catch (err) {
        throw new Error(`Failed to connect to MongoDB: ${err.message}`);
    }
};

const getDb = () => {
    if (!_db) {
        throw new Error('Db not initialized!');
    }
    return _db;
}

module.exports = { initDb, getDb };