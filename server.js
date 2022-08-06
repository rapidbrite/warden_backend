const express = require("express")
const con = require("./connection");
const {response} = require("./utils/response");
const route = require("./routes")


require('dotenv').config();
const app = express();
con();

app.listen(process.env.PORT,()=>{
    console.log(`server is running... : ${process.env.PORT}`)
})

app.get("/", (req,res)=>{
    return response(200,"Warden Connected..",null,res)
})
app.use(route)