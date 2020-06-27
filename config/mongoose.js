const mongoose=require('mongoose');


mongoose.connect('mongodb://localhost/gaggle');

const db=mongoose.connection;
db.on('error',console.error.bind(console,"Error connecting to DB: MONGODB"));
db.once('open',function(){
    console.log('Connected to DB:: MONGODB');
});


module.exports=db;