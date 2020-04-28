const dotenv = require('dotenv');
dotenv.config();

const {MongoClient} = require('mongodb');
let _db;

/**
 * connecting and storing connection to db
 * @returns {Promise<void>}
 */
const mongoConnect = async () => {
    const client = new MongoClient(process.env.MONGODB_URL,{ useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    _db = client;
};

/**
 * return access to the mongodb client
 * module does connection pooling
 * @returns {Promise<void>}
 */
const getClient = () => {
    if(!_db){
        _db = mongoConnect();
    }
    return _db;
};

exports.mongoConnect = mongoConnect;
exports.getClient = getClient;