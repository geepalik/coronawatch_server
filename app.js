const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const mongoConnect = require('./util/database').mongoConnect;
const statsRoutes = require('./routes/statsRoutes');

app.use((req, res, next) => {
    //allow access from every, eliminate CORS
    res.setHeader('Access-Control-Allow-Origin','*');
    //set the allowed HTTP methods to be requested
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE');
    //headers clients can use in their requests
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    //allow request to continue and be handled by routes
    next();
});

app.use('/coronawatch',statsRoutes);
app.use('/',statsRoutes);

/**
 * run this function on startup
 * create db connection for pooling from models
 * and listen to port for incoming connections
 * @returns {Promise<string>}
 */
initApp = async () =>{
    try{
        await mongoConnect();
        app.listen(process.env.PORT);
        return 'Connected!';
    }
    catch (err) {
        throw err;
    }
}

initApp()
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log('Error!: '+err);
        process.exit(1);
});
