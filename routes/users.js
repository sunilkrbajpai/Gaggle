const express=require('express');                   //require express
const router=express.Router();
const passport=require('passport');                 //require passport
const userController=require('../controllers/users_controller'); //require usercontroller

router.get('/profile',passport.checkAuth,userController.profile);         //send to profile page
router.get('/sign-up',userController.signUp);                              //send to sign up page
router.get('/sign-in',userController.signIn);                             //send to sign in page
router.post('/create',userController.create);                             //post the data to create user
router.post('/changePwd',userController.changePwd);                       //post the data to change password
router.get('/forgot-password',userController.forgotPassword);             //render forgot password
router.post('/create-session',passport.authenticate('local',{failureRedirect:'/users/sign-in'}),userController.createSession);  //create session


router.get('/sign-out',userController.destroy);                            //send to sign out
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));     //send to google authentication page
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),userController.createSession);   //send back to home
router.post('/reset-password',userController.reset);            //post the reset link

module.exports=router;   //router exported