const User=require('../models/user');                   //require user
const crypto=require('crypto');                         //require crypto
const resetMailers=require('../mailers/reset_mailer');  //require resetMailers to send mail
const loginMailer=require('../mailers/login_mailers'); //require login_Mailers to send mail
const bcrypt = require('bcrypt');                           //require bcrypt to encrypt
const saltRounds = 10;

// render profile page
module.exports.profile=function(req,res){
    return res.render('user_profile',{
        title:'User Profile'
    })
}

//create session for user using PASSPORT
module.exports.createSession=function(req,res)
{
    req.flash('success','Signed In successfully!')
    loginMailer.newLogin(req.user);
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
    // console.log(req.body);

    // if password and confirm_pass dont match
    if(req.body.password!=req.body.confirm_pwd)
    {
        req.flash('error','Password and confirm password should match!')
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('Error in finding the user while sign up');return;}

        // if user not found then create new user
        if(!user){

            const name=req.body.name;
            const email=req.body.email;
            const password=req.body.password;

            // encrypt password and save
            bcrypt.hash(password, saltRounds, function(err, hash) {
                let a={email:email,password:hash,name:name};
                User.create(a,function(err,user){
                    if(err){console.log('Error in creating user --> sign up');return;}
                    
                    req.flash('success','Registered successfully!');
                    return res.redirect('/users/sign-in');
                })

            });

        }else{
            req.flash('error','Email already exists!');
            return res.redirect('back');
        }
    })
}

// sign out code
module.exports.destroy=function(req,res){
    req.logout();
    req.flash('success','Signed out successfully!')
    return res.redirect('/');
}

// when change password in profile page
module.exports.changePwd=function(req,res)
{
    if(req.body.new_pass!=req.body.confirm_pass)
    {
        req.flash('error','Password and confirm password should match!');
        return res.redirect('back');
    }

    // use bcrypt to compare between plaintext from input and encrypted password in DB
    bcrypt.compare(req.body.old_pass, req.user.password, function(err, result) {
        // result == true
        if(!result)
        {
            req.flash('error','Password is wrong!');
            return res.redirect('back');
        }
        else{
            let updatedStatus = req.user;

            bcrypt.hash(req.body.new_pass, saltRounds, function(err, hash) {
                // Store hash in your password DB.
                updatedStatus.password=hash;
                User.findByIdAndUpdate(req.user._id, updatedStatus, function(err, updatedData){
                    if(err){ console.log(err)}
                     else { 
                         console.log("Password Updated!")
                        }
                })
                req.flash('success','Password changed!');
                return res.redirect('back');
                
            });
        }
    });

}

// render forgotPassword page
module.exports.forgotPassword=function(req,res){
    return res.render('forgot_password',{
        title:'Gaggle | Forgot password'
    });
}

// send reset password to mail
module.exports.reset=function(req,res){
    
    // console.log(req.body.email);
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('Error in finding the user in reset password');return;}

        if(user){

            let new_pass=crypto.randomBytes(20).toString('hex');
            // console.log(new_pass);
            let updatedStatus = user;

            bcrypt.hash(new_pass, saltRounds, function(err, hash) {
                // Store hash in your password DB.
                updatedStatus.password=hash;

                User.findByIdAndUpdate(user._id, updatedStatus, function(err, updatedData){
                if(err){ console.log(err)}
                else { 
                 console.log("New Password Generated!");
                 req.flash('success','New password sent to email');
                }
            })
        });
            

        //send mail to user a new password
        resetMailers.newReset(user,new_pass);

                return res.render('sendMail',{
                    title:'Gaggle | Reset password'
                });
        }else{
            // console.log('Invalid Email!');
            req.flash('error','Email not registered!')
            return res.redirect('back');
        }
    })
}
