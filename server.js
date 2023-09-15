const express = require("express");
const app = express();
const path=require("path");

app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"));
})

app.get('/home',(req,res)=>{
    res.sendFile(path.join(__dirname,"public","home.html"));
})

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})

