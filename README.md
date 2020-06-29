# Authentication Task

This is a node project which consists of Authentication modules like passport.js, social authentication(google oauth).


# Project Structure:--

-assets\
    &emsp;--css\
    &emsp;&emsp;---footer.css\
    &emsp;&emsp;---header.css\
        &emsp;&emsp;---home.css\
        &emsp;&emsp;---layout.css\
        &emsp;&emsp;---resetPassword.css\
        &emsp;&emsp;---user_profile.css\
        &emsp;&emsp;---user_sign_in.css\
    &emsp;--images\
    &emsp;--js\
        &emsp;&emsp;---sign-in.js\
-config\
    &emsp;--middleware.js\
    &emsp;--mongoose.js\
    &emsp;--nodemailer.js\
    &emsp;--passport-google-oauth2-strategy.js\
    &emsp;--passport-local-strategy.js\
-controllers\
    &emsp;--home_controller.js\
    &emsp;--users_controller.js\
-mailers\
    &emsp;--login_mailers.js\
    &emsp;--reset_mailer.js\
-models\
    &emsp;--user.js\
-routes\
    &emsp;--index.js\
    &emsp;--users.js\
-views\
    &emsp;--_footer.ejs\
    &emsp;--_header.ejs\
    &emsp;--forgot_password.ejs\
    &emsp;--home.ejs\
    &emsp;--layout.ejs\
    &emsp;--sendMail.ejs\
    &emsp;--user_profile.ejs\
    &emsp;--user_sign_in.ejs\
    &emsp;--user_sign_up.ejs\
-index.js\
-package.lock.json\
-package.json\
-README

# How to setup project

1. Clone this project
2. Start by installing npm and mongoDB if you don't have them already.
3. Run the Mongo Server.
4. Navigate to Project Directory by :

    > cd gaggle

5. Run command:

    > npm install 

    > npm start or node index.js

6. Go to (.env):\&emsp; Enter your Client Id\&emsp; Enter Client_secret\&emsp; Enter your Gmail Id\&emsp; Enter your Gmail Password
