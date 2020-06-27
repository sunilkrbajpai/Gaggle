const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');

//authentication using passport 
passport.use(new LocalStrategy({
    usernameField:'email'
},
function(email,password,done)
{
    //find user and establish identity
    User.findOne({email:email},function(err,user){
        if(err){console.log('Error in finding user---->passport');
        return;
    }
    if(!user || user.password!=password)
    {
        console.log('Invalid Username/password');
        return done(null,false);
    }
    return done(null,user);
    })

}
));