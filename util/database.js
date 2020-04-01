const env = process.env.NODE_ENV || 'development';
const config = require('../config/env/'+env);

const {MongoClient} = require('mongodb');
let _db;

/**
 * connecting and storing connection to db
 */
const mongoConnect = () => {
    MongoClient.connect(config.db,{ useNewUrlParser: true, useUnifiedTopology: true })
        .then(client => {
            console.log('Connected! ');
            _db = client.db();
        })
        .catch(err => {
            console.log('Error!: '+err);
            process.exit(1);
        })
};

/**
 * return access to the connected db
 * module does connection pooling
 * @returns {*}
 */
const getDb = () => {
    if(_db){
        return _db;
    }
    throw 'No database found';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;