const nodemailer=require('nodemailer');   //require nodemailer module
const ejs=require('ejs');
const path=require('path');

//set transporter
let transporter=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:process.env.EMAIL,              // put your email here
        pass:process.env.PASSWORD            //put your password here
    }
});

//render email template
let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){console.log('error in rendering template',err);return;}
            mailHTML=template;
        }
    )
    return mailHTML;
}

// exports nodemailer
module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}