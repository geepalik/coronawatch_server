const CoronaStats = require('../models/CoronaStats');

exports.getStats = (req, res, next) => {
    CoronaStats
        .fetchAll()
        .then(stats => {
            res.status(200).json({stats: stats});
        })
        .catch(err => {
            next(err);
        })
};