//const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;
const collection = 'corona_stats';

module.exports = class CoronaStats {
    constructor(country, stats) {
        this.country = country;
        this.stats = stats;
    }

    static fetchAll() {
        return getDb()
            .collection(collection)
            .find()
            .project({_id:0})
            .toArray()
            .then(results => { return results; })
            .catch(err => console.error('fetchall error: '+err) );
    }

};