const CoronaStats = require('../models/CoronaStats');

exports.getStats = (req, res, next) => {
    CoronaStats
        .fetchAll()
        .then(stats => {
            res.status(200).json({
                "world_stats" : getRowFromObject(stats,"World"),
                "country_stats": removeRowFromObject(stats,"World")
            });
        })
        .catch(err => {
            next(err);
        });
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