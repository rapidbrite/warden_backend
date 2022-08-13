const express = require("express")
const cors = require("cors");
const http = require("http");
const con = require("./connection");
const route = require("./routes")
var cookies = require("cookie-parser");
const passport = require("passport");
const passportSetup = require("./passport");

const cookieSession = require("cookie-session");
var session = require('express-session');

const socketServer = require("./socket/server.js");




require('dotenv').config();


const app = express();
app.use(session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);


app.use(cookies());
con();



app.get("/", (req,res)=>{
    // return response(200,"Warden Connected..",null,res)
    res.sendFile(__dirname + "/login.html")
})
app.use(route)


const server = http.createServer(app);
socketServer(server);

server.listen(process.env.PORT,()=>{
  console.log(`server is running... : ${process.env.PORT}`)
})