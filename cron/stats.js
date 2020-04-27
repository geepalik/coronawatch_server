const axios = require('axios');
const CoronaStats = require('../models/CoronaStats');

const excludeResults = ["World"];
const mapCountryName = {
    "United Arab Emirates":"UAE",
    "Dem. Rep. Congo":"DRC",
    "United Kingdom":"UK",
    "South Korea":"S. Korea",
    "North Korea":"N. Korea",
    "United States of America":"USA",
    "Bosnia and Herzegovina":"Bosnia",
    "Syria":"Syrian Arab Republic",
    "Laos":"Lao People's Democratic Republic",
    "Libya":"Libyan Arab Jamahiriya",
};
/**
 *
 * @returns {string}
 */
const getDataUrl = () =>{
    return "https://disease.sh/v2/countries";
}

const getData = async () =>{
    try{
        const response = await axios.get(getDataUrl());
        const data = response.data;
        await updateStats(data);
    }catch (e) {
        console.error("Error with retrieving data");
        throw "Error in data: "+e.toString();
    }
}

/**
 *
 * @param countryName
 * @returns {string}
 */
const mapCountry = (countryName) => {
    return mapCountryName[countryName] ? mapCountryName[countryName] : countryName;
};

/**
 *
 * @param countryName
 * @param latestResults
 * @returns {array}
 */
const matchCountryFromApi = (countryName, latestResults) =>{
    const mappedCountryName = mapCountry(countryName);
    return CoronaStats.getRowFromObject(latestResults,mappedCountryName);
}

/**
 *
 * @returns {string}
 */
const getCurrentDateFormatted = () => {
    let d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()
    ;

    return [year, month, day].join('-');
};

const updateStats = async (latestCoronaStats) => {
    const existingResults = await CoronaStats.fetchAll(excludeResults);

    let totalWorldConfirmed = 0;
    let totalWorldDeaths = 0;
    let totalWorldRecovered = 0;

    for(result of existingResults){
        let updatedCountryStats = matchCountryFromApi(result.country, latestCoronaStats);
        if(updatedCountryStats.length === 0){
            console.log(`Couldn't update stats for country ${result.country}, data missing from DB`);
            continue;
        }
        updatedCountryStats = updatedCountryStats[0];
        const statsArray = setDataForUpdate(result.stats, updatedCountryStats);

        const totalStats = {
            "confirmed":updatedCountryStats.cases,
            "deaths":updatedCountryStats.deaths,
            "recovered":updatedCountryStats.recovered,
        };
        totalWorldConfirmed += totalStats.confirmed;
        totalWorldDeaths += totalStats.deaths;
        totalWorldRecovered += totalStats.recovered;
        await CoronaStats.update(
            {"country":result.country},
            {$set:{"country_total_stats":totalStats,"stats":statsArray}}
            );
        console.log(`Updated country ${result.country} with data for date ${getCurrentDateFormatted()}`);
    }
    const savedWorldData = await CoronaStats.getSingleCountry("World");
    const worldTotalStats =
        {
            confirmed:totalWorldConfirmed,
            deaths:totalWorldDeaths,
            recovered:totalWorldRecovered
        };
    const worldStatsArray = setDataForUpdate(savedWorldData.stats, worldTotalStats);
    await CoronaStats.update(
        {"country":"World"},
        {$set:{"world_total_stats":worldTotalStats,"stats":worldStatsArray}}
        );
    console.log(`Updated World with data for date ${getCurrentDateFormatted()}`);
}

/**
 *
 * @param savedStatsArray
 * @param updatedCountryStats
 * @returns {array}
 */
const setDataForUpdate = (savedStatsArray, updatedCountryStats) => {
    const lastStatsItem = savedStatsArray.slice(-1)[0];

    if(!updatedCountryStats.cases){
        updatedCountryStats.cases = updatedCountryStats.confirmed;
    }

    if(lastStatsItem.date === getCurrentDateFormatted()){
        //update object of last item here
        lastStatsItem.confirmed = updatedCountryStats.cases;
        lastStatsItem.deaths = updatedCountryStats.deaths;
        lastStatsItem.recovered = updatedCountryStats.recovered;
    }else{
        savedStatsArray.push(
            {
                "date":getCurrentDateFormatted(),
                "confirmed":updatedCountryStats.cases,
                "deaths":updatedCountryStats.deaths,
                "recovered":updatedCountryStats.recovered
            }
        );
    }
    return savedStatsArray;
};

exports.updateStatsData = getData;