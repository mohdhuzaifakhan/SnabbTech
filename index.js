require('./mongoose');
const passwordHash = require('password-hash');
const User = require('./model');
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const bodyparser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 5000

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json())
app.use(express.json());
app.use(cors())

app.post('/register', (req, res) => {
    const { email, password } = req.body
    console.log(passwordHash.generate(req.body.password))
    console.log(req.body);
    const user = new User({
        email: req.body.email,
        password: passwordHash.generate(req.body.password)
    })
    // console.log(user);

    try {

        User.findOne({ email: req.body.email }).then((response) => {
            console.log(response)
            if (response === null) {
                user.save().then(() => {
                    res.send({ msg: "User register successfully", status: 200 });
                }).catch(err => {
                    res.send({ msg: err.message, status: 500 });
                })
            } else {
                res.send({ msg: "Email already exist" })
            }
        }).catch((err) => {
            console.log(err)
            res.send({ msg: err.message })
        })


    } catch (e) {
        res.send({ msg: "Some internal error" })
    }

})

app.get('/login', (req, res) => {
    const { email, password } = req.query;
    // var hashedPassword = passwordHash.generate(password)
    console.log(email, password);
    // console.log(hashedPassword)

    User.findOne({ email: email }).then((response) => {
        if (passwordHash.verify(password, response.password)) {
            res.send({ msg: "Login successfully", data: response, status: 200 })
        } else {
            res.send({ msg: "Email or Password is wrong" })
        }
    }).catch((err) => {
        res.send({ msg: "Email does not exist" })
    })

})

app.post('/forgotPassword', (req, res) => {
    const { email } = req.body
    console.log(email)
    var transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'juliet.kovacek@ethereal.email',
            pass: '2aRv2y32uPFy8zDJW2'
        }
    });
    var otp = Math.floor(1000 + Math.random() * 9000)
    var mailOptions = {
        from: 'juliet.kovacek@ethereal.email',
        to: email,
        subject: 'Sending Email for OTP',
        text: `OTP ${otp}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.send({ msg: "mail sent successfully",otp:otp })
})

app.post('/resetpassword',(req,res)=>{
    const {email,password} = req.body
    const hash = passwordHash.generate(password)
    console.log(hash)
    console.log(email,password)
    try{
        User.updateOne({email:email},{$set:{password:hash}}).then((response)=>{
            console.log(response)
            res.send({msg:"Password updated successfully"})
        }).catch((err)=>{
            console.log(err)
            res.send({msg:"Could not update password"})
        })
    }catch(e){
        res.send({msg:e})
    }

})



app.listen(PORT, () => {
    console.log("server is running on port 5000");
})
