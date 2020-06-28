const express=require('express');
const router=express.Router();
const passport=require('passport');
const userController=require('../controllers/users_controller');

router.get('/profile',passport.checkAuth,userController.profile);
router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);
router.post('/create',userController.create);
router.post('/create-session',passport.authenticate('local',{failureRedirect:'/users/sign-in'}),userController.createSession);
router.get('/sign-out',userController.destroy);
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),userController.createSession);

module.exports=router;   //router exported