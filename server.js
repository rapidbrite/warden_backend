const env = require("./envload");
const express = require("express");
const cors = require("cors");
const http = require("http");
const con = require("./connection");
const route = require("./routes");
var cookies = require("cookie-parser");
const passport = require("passport");

const passportSetup = require("./passport");

const cookieSession = require("cookie-session");
var session = require("express-session");

const socketServer = require("./socket/server.js");

console.log(process.env);
const app = express();
// In server.js
// Session must be before passport
app.use(session({
  secret: process.env.SESSION_SECRET || "SECRET",
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',

    maxAge: 604800000 // 7 days
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Then configure CORS, then routes

app.use(express.json());


// app.use(
//   cors({
//     origin: "*", // Allows any domain
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true, // Set to true only if sending cookies or authorization headers
//   })
// );


app.use(
  cors({
    origin: function(origin, callback) {
      const allowedOrigins = [
        "https://warden-darshan.netlify.app", 
        "http://localhost:3000",
        "http://localhost:3002"
      ];
      
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS: ", origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);


app.use(cookies());
con();

app.get("/", (req, res) => {
  // return response(200,"Warden Connected..",null,res)
  res.sendFile(__dirname + "/login.html");
});
app.use(route);

const server = http.createServer(app);
socketServer(server);

server.listen(process.env.PORT, () => {
  console.log(`server is running... : ${process.env.PORT}`);
});
