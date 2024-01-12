This is the backend of Login, register, forgot password and reset password

This is not deployed so you have to set up it on your local system

below are the steps to setup on your local machine 
1) fork this repo on your github account
2) clone the forked repository on your local machine
3) go to this url https://ethereal.email/ to set up nodemailer account
4) copy and paste these two lines into index.js file in /forgotPassword route
5)  auth: {
        user: 'bud.lowe@ethereal.email',
        pass: '9T1qyS9xn4SUnm7N12'
    }
6) Now , run **cd SnabbTech** command
7) run , **npm init** command
8) run , **nodemon index.js** command

All the reset email message will go to the messages section in nodemailer (https://ethereal.email/messages) .so you can that also for OTP verification.
if everything is setup , now you can check how it is working 
I tested everything which is working fine.
