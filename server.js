const express = require("express")
const cors = require("cors");
const con = require("./connection");
const route = require("./routes")
var cookies = require("cookie-parser");
const passport = require("passport");
const passportSetup = require("./passport");

const cookieSession = require("cookie-session");
var session = require('express-session');



require('dotenv').config();


const app = express();
app.use(session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use(
  cors({
    origin: "https://qkblch-3000.preview.csb.app",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

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