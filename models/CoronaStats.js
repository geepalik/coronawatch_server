const getDb = require('../util/database').getClient;

const dataBase = "coronawatch";
const collection = 'corona_stats';

module.exports = class CoronaStats {

    /**
     *
     * @param excludeResults
     * @returns {Promise<*>}
     */
    static async fetchAll(excludeResults) {
        const client = await getDb();
        const exclude = (excludeResults) ? {"country":{$nin : excludeResults}} : null;
        return await client
            .db(dataBase)
            .collection(collection)
            .find(exclude)
            .project({_id:0})
            .toArray();
    }

    /**
     *
     * @param countryName
     * @returns {Promise<*>}
     */
    static async getSingleCountry(countryName){
        const client = await getDb();
        return await client
            .db(dataBase)
            .collection(collection)
            .findOne({"country":countryName})
    }

    static async update(idObject,updateDataObject){
        const client = await getDb();
        await client
            .db(dataBase)
            .collection(collection)
            .updateOne(idObject,updateDataObject);
    }

    /**
     *
     * @param array
     * @param key
     * @returns {*}
     */
    static getRowFromObject(array,key){
        return array.filter(function (array) {
            return array.country === key;
        })
    };
};