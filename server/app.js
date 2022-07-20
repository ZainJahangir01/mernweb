const dotenv = require("dotenv");
const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const authenticate = require("./middleware/authenticate");

const app = express();

// configure env file and require connection file

dotenv.config({ path: "./config.env" });
require("./db/conn");
const port = process.env.PORT;

//require models

const Users = require("./models/userSchema");
const Message = require("./models/msgSchema");
const e = require("express");

//These Methods is used to get data and Cookies from Frontend

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

//Registration

app.post("/register", async (req, res) => {
  try {
    //get body or data

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const createUser = new Users({
      username: username,
      email: email,
      password: password,
    });
    //save Method is used to create user or Insert user
    //but before saving password will be hash
    //after hash it will save to db

    const created = await createUser.save();
    console.log(created);
    res.status(200).send("Registered");
  } catch (error) {
    res.status(400).send(error);
  }
});

//login
app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    //Find user if exist
    const user = await Users.findOne({ email: email });
    if (user) {
      //verify password
      const isMatch = await bcryptjs.compare(password, user.password);

      if (isMatch) {
        //generate token which is defined in user schema
        const token = await user.generateToken();
        res.cookie("jwt", token, {
          //Expires token in 24 hours
          expires: new Date(Date.now() + 86400000),
          httpOnly: true,
        });
        res.status(200).send("Logged In");
      } else {
        res.status(400).send("Invalid Credentials");
      }
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

//Message Api

app.post("/message", async (req, res) => {
  try {
    //get body or data

    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    const sendMsg = new Message({
      name: name,
      email: email,
      message: message,
    });
    //save Method is used to create user or Insert user
    //but before saving password will be hash
    //after hash it will save to db

    const created = await sendMsg.save();
    console.log(created);
    res.status(200).send("Sent");
  } catch (error) {
    res.status(400).send(error);
  }
});

//logout

app.get("/logout", (req, res) => {
  res.clearCookie("jwt", { path: "/" });
  res.status(200).send("User logged out");
});

//Authentication

app.get("/auth", authenticate, (req, res) => {});

app.listen(port, () => {
  console.log("Server is Running yas");
});

//backend is done and store data in database
//now connect front end to with back end
