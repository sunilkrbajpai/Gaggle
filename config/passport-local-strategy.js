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
        if(err){console.log('Error in finding user ----> passport');
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

//serialising the user
passport.serializeUser(function(user,done){
    done(null,user.id);
})

//deserialising the user
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding the user --> Passport');
            return done(err);
        }
        return done(null,user);
    })
})

//check if the user is authenticated
passport.checkAuth=function(req,res,next)
{
    //if user is signed-in then pass req to next function
    if(req.isAuthenticated()){
        return next();
    }
    //if not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthUser=function(req,res,next)
{
    if(req.isAuthenticated()){
        //if req.user contains the current signed in user from session cookie and we are just sending this to locals for views
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;