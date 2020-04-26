const axios = require('axios');
const CoronaStats = require('../models/CoronaStats');

const getData = async () =>{
    try{
        const url = "https://www.worldometers.info/coronavirus/";
        console.log("getting data from "+url);
        const response = await axios.get(url);
        const data = response.data;
        console.log("got data");
    }catch (e) {
        console.error("Error with retrieving data");
        throw "Error in data: "+e.toString();
    }
}

exports.updateStatsData = getData;