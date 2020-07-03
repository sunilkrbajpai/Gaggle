const express=require('express');
const app=express();
const port=process.env.PORT || 8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
//used for session cookie
const session=require('express-session');
const passport=require('passport');
// imported modules
const passportLocal=require('./config/passport-local-strategy');            //for local authentication
const Mongostore=require('connect-mongo')(session);                         //for storing session
const cookieParser=require('cookie-parser');                                //for parsing cookie
const googlePassport=require('./config/passport-google-oauth2-strategy');   //for google auth
const flash=require('connect-flash');                                       //for showing flash messages
const middleware=require('./config/middleware');                            //for flash
const bcrypt = require('bcrypt');                                           //for encrypting the password
require('dotenv').config();                                                 //configure dotenv for ENv VARIABLES


//console.log(process.env);
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));                                           //set up static folder
app.use(expressLayouts);                                                        //use expressLayouts

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

//initialize passport and create session
app.use(passport.initialize());
app.use(passport.session());

//set authentication
app.use(passport.setAuthUser);

//use flash module
app.use(flash());
app.use(middleware.setFlash);

//use express router
app.use('/',require('./routes'));

//run server
app.listen(port,function(err)
{
    if(err){
        console.log(`Error in running server: ${port}`);
    }
    console.log(`Server is running at Port: ${port}`);
})
