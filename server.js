const express = require("express")
const cors = require("cors");
const con = require("./connection");
const response = require("./utils/response");
const route = require("./routes")
var cookies = require("cookie-parser");

require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookies());
con();

app.listen(process.env.PORT,()=>{
    console.log(`server is running... : ${process.env.PORT}`)
})

app.get("/", (req,res)=>{
    // return response(200,"Warden Connected..",null,res)
    res.sendFile(__dirname + "/login.html")
})
app.use(route)