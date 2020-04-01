const env = process.env.NODE_ENV || 'development';
const config = require('./config/env/'+env);

const express = require('express');
const app = express();
const mongoConnect = require('./util/database').mongoConnect;
const statsRoutes = require('./routes/statsRoutes');

app.use((req, res, next) => {
    //allow access from every, elminate CORS
    res.setHeader('Access-Control-Allow-Origin','*');
    //set the allowed HTTP methods to be requested
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE');
    //headers clients can use in their requests
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    //allow request to continue and be handled by routes
    next();
});

app.use('/coronawatch',statsRoutes);

mongoConnect();
app.listen(config.port);