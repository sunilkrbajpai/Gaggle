# Authentication Task

This is a node project which consists of Authentication modules like passport.js, social authentication(google oauth).


# Project Structure:--

-assets\
    --css\
        ---footer.css
        ---header.css
        ---home.css
        ---layout.css
        ---resetPassword.css
        ---user_profile.css
        ---user_sign_in.css
    --images\
    --js\
        ---sign-in.js
-config\
    --middleware.js
    --mongoose.js
    --nodemailer.js
    --passport-google-oauth2-strategy.js
    --passport-local-strategy.js
-controllers\
    --home_controller.js
    --users_controller.js
-mailers\
    --login_mailers.js
    --reset_mailer.js
-models\
    --user.js
-routes\
    --index.js
    --users.js
-views\
    --_footer.ejs
    --_header.ejs
    --forgot_password.ejs
    --home.ejs
    --layout.ejs
    --sendMail.ejs
    --user_profile.ejs
    --user_sign_in.ejs
    --user_sign_up.ejs
-index.js
-package.lock.json
-package.json
-README

# How to setup project

1. Clone this project
2. Start by installing npm and mongoDB if you don't have them already.
3. Run the Mongo Server.
4. Navigate to Project Directory by :

    cd gaggle

5. Run command:

    npm install 

    npm start or node index.js

6. Go to: config >> nodemailer.js
7. On line no. (12,13) >> set user: as your gmail id && pass: as gmail password
