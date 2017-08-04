const express=require('express');
const api=require('./api');
const app=express();
const mongoose = require('mongoose');
const session=require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash=require('connect-flash');
const passport = require('passport');


app.use(session({
    secret: 'nodeblog',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new MongoStore({ mongooseConnection: mongoose.connection }) //session存储位置
}));
app.use(flash());
app.use(passport.initialize());
require('./passport').init();
app.use(api);   //最好放在下边

app.listen(8999, function(){
    console.log('Server up: http://localhost:8999' );
});
