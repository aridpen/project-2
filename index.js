// required packages
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const db = require("./models");
const crypto = require("crypto-js");
const axios = require("axios");
const path = require("path");

// instance of express
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 8000;
app.set("view engine", "ejs");
// parse request bodies from html forms
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// app.use(express.static(path.join(__dirname, "src")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "src", "index.html"));
// });

// tell express to parse incoming cookies
app.use(cookieParser());

// custom auth middleware that checks the cookies for a user id
// and it finds one, look up the user in the db
// tell all downstream routes about this user
app.use(async (req, res, next) => {
  try {
    if (req.cookies.userId) {
      // decrypt the user id and turn it into a string
      const decryptedId = crypto.AES.decrypt(
        req.cookies.userId,
        process.env.SECRET
      );
      const decryptedString = decryptedId.toString(crypto.enc.Utf8);
      // the user is logged in, lets find them in the db
      const user = await db.user.findByPk(decryptedString);
      // mount the logged in user on the res.locals
      res.locals.user = user;
    } else {
      // set the logged in user to be null for conditional rendering
      res.locals.user = null;
    }

    // move on the the next middleware/route
    next();
  } catch (err) {
    console.log("error in auth middleware: 🔥🔥🔥🔥", err);
    // explicity set user to null if there is an error
    res.locals.user = null;
    next(); // go to the next thing
  }
});

// example custom middleware (incoming request logger)
app.use((req, res, next) => {
  // our code goes here
  // console.log('hello from inside of the middleware!')
  console.log(`incoming request: ${req.method} - ${req.url}`);
  // res.locals are a place that we can put data to share with 'downstream routes'
  // res.locals.myData = 'hello I am data'
  // invoke next to tell express to go to the next route or middle
  next();
});

// app.get("/", (req, res) => {
//   res.send(`
//       <html>
//         <head>
//           <link rel="stylesheet" href="/styles.css">
//         </head>
//         <body>
//           <div class="bg-gray-400 text-gray-800 p-4">
//             <h1 class="text-2xl font-bold">Hello, World!</h1>
//           </div>
//         </body>
//       </html>
//     `);
// });

// routes and controllers
app.get("/", (req, res) => {
  // console.log(res.locals.user)
  res.render("home.ejs", {
    user: res.locals.user,
  });
});

app.use("/users", require("./controllers/users"));
app.use("/cocktails", require("./controllers/cocktails"));

// listen on a port
app.listen(PORT, () => {
  console.log(`authenticating users on PORT ${PORT} 🔐`);
});
module.exports = router;
