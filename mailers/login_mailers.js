const nodemailer=require('../config/nodemailer');

//this is another way of exporting
exports.newLogin=(user)=>{
    console.log('Inside newComment mailer',user);
    nodemailer.transporter.sendMail({
        from:'gaggle.com',
        to:user.email,
        subject:"New Comment Published!",
        html:'<h2>You have just logged in to your account!</h2>'
    },(err,info)=>{
        if(err){
        console.log('error in sending mail',err);
        return;
    }

    console.log('Message sent',info);
    return;
    })
}