const getDb = require('../util/database').getClient;
const dataBase = "coronawatch";
const collection = 'corona_stats';

module.exports = class CoronaStats {
    constructor(country, stats) {
        this.country = country;
        this.stats = stats;
    }

    static async fetchAll() {
        const client = await getDb();
        return await client
            .db(dataBase)
            .collection(collection)
            .find()
            .project({_id:0})
            .toArray();
    }
};