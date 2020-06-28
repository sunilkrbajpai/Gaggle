const User=require('../models/user');
const crypto=require('crypto');
const resetMailers=require('../mailers/reset_mailer');

module.exports.profile=function(req,res){
    return res.render('user_profile',{
        title:'User Profile'
    })
}

//create session for user using PASSPORT
module.exports.createSession=function(req,res)
{
    // const user=User.findById({email:req.body.email});
    // console.log(user);
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

module.exports.changePwd=function(req,res)
{
    // console.log(req.user.password);
    if(req.body.new_pass!=req.body.confirm_pass)
    {
        return res.redirect('back');
    }
    if(req.user.password!=req.body.old_pass)
    {
        //not match password
        return res.redirect('back');
    }
    else{
        let updatedStatus = req.user;
        updatedStatus.password=req.body.new_pass;
        User.findByIdAndUpdate(req.user._id, updatedStatus, function(err, updatedData){
            if(err){ console.log(err)}
             else { console.log("Password Updated!")}
        })
        return res.redirect('back');

    }
}

module.exports.forgotPassword=function(req,res){
    return res.render('forgot_password',{
        title:'Gaggle | Forgot password'
    });
}
module.exports.reset=function(req,res){
    
    // console.log(req.body.email);
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('Error in finding the user in reset password');return;}

        if(user){

            let new_pass=crypto.randomBytes(20).toString('hex');
            // console.log(new_pass);
            let updatedStatus = user;
            updatedStatus.password=new_pass;

        User.findByIdAndUpdate(user._id, updatedStatus, function(err, updatedData){
            if(err){ console.log(err)}
             else { console.log("New Password Generated!")}
        })

        //send mail to user a new password
        resetMailers.newReset(user);

                return res.render('sendMail',{
                    title:'Gaggle | Reset password'
                });
        }else{
            console.log('Invalid Email!');
            return res.redirect('back');
        }
    })
}