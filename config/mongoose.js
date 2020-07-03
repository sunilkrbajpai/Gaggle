const mongoose=require('mongoose');

// connect mongoDB
mongoose.connect('mongodb+srv://skb:skb123456789123456789skb@freecluster.7cdhk.mongodb.net/gaggleDB?retryWrites=true&w=majority');
const db=mongoose.connection;

// on error
db.on('error',console.error.bind(console,"Error connecting to DB: MONGODB"));
//on connection
db.once('open',function(){
    console.log('Connected to DB:: MONGODB');
});

// export db
module.exports=db;
