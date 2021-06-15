const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "joel",
    password: "admin",
    database: "smartbrain",
  },
});

db.select("*")
  .from("users")
  .then((data) => {
    // console.log(data);
  });
// console.log(postgres.select("*").from("users"));

const app = express();

/* 

/ --> res = this is working
/signIn --> POST = success/fail
/register --> POST = user
/profile/:useerId --> GET = user
/image --> PUT --> user

*/

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post(
  "/signin",
  signin.handleSignin(db, bcrypt) // dependency injection  // advance functions(check signin.js in server line 1) (just a little alternative a bit cleaner)
);

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt); // dependency injection
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
