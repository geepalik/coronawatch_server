const env = process.env.NODE_ENV || 'development';
const config = require('../config/env/'+env);

const {MongoClient} = require('mongodb');
let _db;

/**
 * connecting and storing connection to db
 */
const mongoConnect = async () => {
    const client = new MongoClient(config.db,{ useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    _db = client;
};

/**
 * return access to the mongodb client
 * module does connection pooling
 * @returns {*}
 */
const getClient = () => {
    if(!_db){
        _db = mongoConnect();
    }
    return _db;
};

exports.mongoConnect = mongoConnect;
exports.getClient = getClient;