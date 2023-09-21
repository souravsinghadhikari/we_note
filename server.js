const express = require("express");
const bcrypt=require("bcrypt");
const mongoose= require("mongoose");
const bodyParser= require("body-parser");
const jwt = require("jsonwebtoken");
const path=require("path");
const app = express();


// mongoose connect

async function connect() {
    try {
      await mongoose.connect("mongodb+srv://souravadhikari:sourav%4012mongodb@cluster0.nk4yjcv.mongodb.net/wekeep");
      console.log("connected");
    } catch (error) {
      console.log("Error Connecting to DB" + error);
    }
  }
 connect();
//middlewares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));

//database

const userSchema = new mongoose.Schema({
    email : String,
    password: String
});

const user = mongoose.model('user',userSchema);

const noteSchema = new mongoose.Schema({
    title: String,
    content : String,
    email : String
})

const note= mongoose.model('note',noteSchema);

// get req handle

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"));
    console
})


app.get('/register',(req,res)=>{
    res.sendFile(path.join(__dirname,"public","register.html"));
})


app.get('/home',(req,res)=>{

    res.sendFile(path.join(__dirname,"public","home.html"));
})



//post req handle 

app.post('/register',async(req,res)=>{
     // destructuring 
    const {email,password}=req.body;
    let value = await user.findOne({email});
    // return a struct having all fields execute is used to execute the function else a object query will returned
    if (value) {
        bcrypt.compare(password, value.password, function (err, result) {
            if (err) {
                // Handle the error (e.g., log it)
                console.error(err);
                return res.status(500).send("An error occurred");
            }
            
            if (result === true) {
                // Passwords match
                try{
                    const options ={
                        expiresIn : '5h'
                    }
                    let token = jwt.sign({email:value.email},'key',options);
                    console.log(token);
                    return res.sendFile(path.join(__dirname,"public","home.html"));
                }catch(err){
                    console.log("error ho gya" + err);
                }
            } else {
                // Passwords do not match
                return res.send("Get out");
            }
        });
    }
    else {
        let token = jwt.sign({email:email},'key','5h');
        console.log(token);
        bcrypt.hash(password, 5, async (err, hash) =>{
        if(err) return res.write(err + "hashing is not done properly");
        try{
            await user.create({email:email,password:hash});
            console.log("good to go");
        }catch(err){
            return res.write(err + "data is not stored");
        }
       });
    }
})

app.post("/home",(req,res)=>{
    const {title ,content} = req.body();
    
})

// listening and connecting to port and mongoose database respectively 

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})

