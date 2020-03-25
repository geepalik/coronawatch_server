const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

/**
 * connecting and storing connection to db
 */
const mongoConnect = () => {
    MongoClient.connect('mongodb+srv://coronauser:coronapass@cluster0-dhgvo.mongodb.net/coronawatch?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true })
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