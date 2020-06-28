const User=require('../models/user');

module.exports.profile=function(req,res){
    return res.render('user_profile',{
        title:'User Profile'
    })
}

//create session for user using PASSPORT
module.exports.createSession=function(req,res)
{
    return res.redirect('/');
}

// render sign up page
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title:"Gaggle | Sign Up"
    })
}

//render sign in page
module.exports.signIn=function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title:"Gaggle | Sign In"
    })
}

// get the sign up data
module.exports.create=function(req,res)
{
    if(req.body.password!=req.body.confirm_pwd)
    {
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('Error in finding the user while sign up');return;}

        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log('Error in creating user --> sign up');return;}
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    })
}

module.exports.destroy=function(req,res){
    req.logout();
    return res.redirect('/');
}