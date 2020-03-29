const CoronaStats = require('../models/CoronaStats');

exports.getStats = (req, res, next) => {
    CoronaStats
        .fetchAll()
        .then(stats => {
            let totalWorldConfirmed = 0;
            let totalWorldDeaths = 0;
            let totalWorldRecovered = 0;
            for(stat of stats) {
                const lastStatsItem = stat['stats'].slice(-1)[0];
                totalWorldConfirmed += lastStatsItem.confirmed;
                totalWorldDeaths += lastStatsItem.deaths;
                totalWorldRecovered += lastStatsItem.recovered;
            }
            res.status(200).json({
                "total_world_stats":{
                    "confirmed" : totalWorldConfirmed,
                    "deaths" : totalWorldDeaths,
                    "recovered" : totalWorldRecovered,
                },
                "country_stats": stats
            });
        })
        .catch(err => {
            next(err);
        })
};