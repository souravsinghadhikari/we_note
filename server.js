const express = require("express");

const mongoose= require("mongoose");
const bodyParser= require("body-parser");
const app = express();
const path=require("path");

//middlewares

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));

//database

const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    password: String
});

const user = mongoose.model('user',userSchema);

const noteSchema = new mongoose.Schema({
    title: String,
    content : String,
    user : String
})

const note= mongoose.model('note',noteSchema);

// get req handle

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"));
})


app.get('/register',(req,res)=>{
    res.sendFile(path.join(__dirname,"public","register.html"));
})


app.get('/home',(req,res)=>{
    res.sendFile(path.join(__dirname,"public","home.html"));
})



//post req handle 

app.post('/register',(req,res)=>{
     // destructuring 
    const {name,email,password}=req.body;
    
})

// listening and connecting to port and mongoose database respectively 

app.listen(3000,()=>{
    console.log("server is running on port 3000");
    mongoose.connect("mongodb+srv://souravadhikari:sourav%4012mongodb@cluster0.nk4yjcv.mongodb.net/wekeep")
    .then(()=>{
        console.log("successfully connected with database");
    })
    .catch ((err)=>{
        console.log(err);
    })

})

