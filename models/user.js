const mongoose=require('mongoose');         //require mongoose
const userSchema=new mongoose.Schema({
    email:{                                   //store email
        type:String,
        required:true,
        unique:true
    },
    password:{                                  //store password
        type:String,
        required:true
    },
    name:{                                      //store name
        type:String,
        required:true
    }
},
{
    timestamps:true                             //store timestamps
});

// exports user
const User=mongoose.model('User',userSchema);
module.exports=User;