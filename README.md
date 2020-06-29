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

6. Go to (.env):\
&emsp;CLIENT_ID= Enter your Client Id\
&emsp;CLIENT_SECRET= Enter Client_secret\
&emsp;EMAIL= Enter your Gmail Id\
&emsp;PASSWORD= Enter your Gmail Password

7. For getting Client_ID and Client_secret, goto https://console.developers.google.com/ and register new credentials for OAuth 2.0.

8. During Registering credentials for oAuth: fill (Authorized JavaScript origins) and (Authorized redirect URIs ) as shown in image.

<img src="https://user-images.githubusercontent.com/25504941/85971701-818a5080-b9eb-11ea-848f-03db366fb17b.png" height=700>


\
Thanks! Feel free to improve the code :smile:	