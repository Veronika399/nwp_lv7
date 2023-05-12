const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const cors = require('cors');
const connectDB = require('./server/database/connection');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('./server/database/passport')

const app = express();

dotenv.config({path : 'config.env'});
const PORT = process.env.PORT || 8080;

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({extended: true}))
// Needed to get from data from requests
app.use(bodyparser.json());

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}


// // global allow cors
app.use(cors(corsOptions));
const sessionStore = MongoStore.create({ mongoUrl: process.env.MONGO_URI, dbName: 'projects' })

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        //secure: true,
        //httpOnly: false,
        //sameSite: 'none',
        maxAge: 1000 * 60 * 10
    }
}));
app.use(passport.initialize());
app.use(passport.session());

// load routes
app.use('/', require('./server/routes/router'))

app.listen(PORT, ()=>{console.log(`Server is running on http://localhost:${PORT}`)});