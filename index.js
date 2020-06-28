const express=require('express');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const Mongostore=require('connect-mongo')(session);
const cookieParser=require('cookie-parser');
const googlePassport=require('./config/passport-google-oauth2-strategy');
const flash=require('connect-flash');
const middleware=require('./config/middleware');
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayouts);
//extract styles and scripts from sub pages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//setup view engine
app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store the session in DB
app.use(session({
    name:'Gaggle',
    secret:'KeyToEncryptSession',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new Mongostore({
        mongooseConnection:db,
        autoRemove:'disabled'
    },
    function(err){
        console.log(err||'connect-mongo setup ok');
    }
    )
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthUser);
app.use(flash());
app.use(middleware.setFlash);
//use express router
app.use('/',require('./routes'));

app.listen(port,function(err)
{
    if(err){
        console.log(`Error in running server: ${port}`);
    }
    console.log(`Server is running at Port: ${port}`);
})