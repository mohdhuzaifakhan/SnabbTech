const mongoose = require ('mongoose');
const  url = "mongodb://0.0.0.0:27017/user"
mongoose.connect(url,{
    useNewUrlParser: true
  }).then(()=>{
    console.log("connetion successful")
  }).catch((err)=>{
    console.log("No connection");
  });