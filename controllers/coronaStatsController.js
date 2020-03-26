const CoronaStats = require('../models/CoronaStats');

exports.getStats = (req, res, next) => {
    CoronaStats
        .fetchAll()
        .then(stats => {
            const totalStats = [];
            for(stat of stats) {
                const lastStatsItem = stat['stats'].slice(-1)[0];
                totalStats.push({
                    "country" : stat.country,
                    "confirmed" : lastStatsItem.confirmed,
                    "deaths" : lastStatsItem.deaths,
                    "recovered" : lastStatsItem.recovered
                });
            };
            res.status(200).json({"total_stats":totalStats,"timeline_stats": stats});
        })
        .catch(err => {
            next(err);
        })
};