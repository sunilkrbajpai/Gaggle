const passport=require('passport');                                      //require passport
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;    // require google auth
const crypto=require('crypto');                                          //require crypto for generating random password
const User=require('../models/user');
const bcrypt = require('bcrypt');                                           //for encrypting password
const saltRounds = 10;
require('dotenv').config();                                                 //configure dotenv for ENv VARIABLES

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    // google auth credemntials
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL:"https://gaggle-skb.herokuapp.com/users/auth/google/callback",
},
function(accessToken,refreshToken,profile,done)
{
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){console.log('error in google passport strategy',err);return;}

        if(user)
        {
            //if found,set this user as req.user
            return done(null,user);
        }
        else{
            //if not found,create the user and set it as req.user

            let pass=crypto.randomBytes(20).toString('hex')

            // encrypt password and store
            bcrypt.hash(pass, saltRounds, function(err, hash) {
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:hash
                },function(err,user){
                    if(err){console.log('error in creating google-auth-strategy',err);return;}
    
                    return done(null,user);
                })
            });            
        }
    })
}
))

module.exports=passport;
