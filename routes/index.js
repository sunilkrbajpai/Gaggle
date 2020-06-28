const express=require('express');                                   //require express
const homeController=require('../controllers/home_controller');     //require homecontrller
const router=express.Router();                                      

router.get('/',homeController.home);                                //send to home 
router.use('/users',require('./users'));                            //if URL has /users then route to ./users

// export
module.exports=router;