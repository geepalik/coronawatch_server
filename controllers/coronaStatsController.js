const CoronaStats = require('../models/CoronaStats');

exports.getStats = async (req, res, next) => {
    try{
        const results = await CoronaStats.fetchAll();
        res.status(200).json({
            "world_stats" : getRowFromObject(results,"World"),
            "country_stats": removeRowFromObject(results,"World")
        });
    }catch(err) {
        next(err);
    }
};

/**
 *
 * @param array
 * @param key
 * @returns {*}
 */
const getRowFromObject = (array,key) =>{
    return array.filter(function (array) {
        return array.country === key;
    })
};

/**
 *
 * @param array
 * @param key
 * @returns {*}
 */
const removeRowFromObject = (array,key) =>{
    return array.filter(function (array) {
        return array.country !== key;
    })
};