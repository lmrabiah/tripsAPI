const express = require("express");
const db = require("./db/models");
const cors = require("cors");
const SequelizeSlugify = require("sequelize-slugify");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
const userRoutes = require("./routes/users");
const bodyParser = require("body-parser");
const app = express();

// Middleware

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use(userRoutes);

app.get("/", (req, res) => {
  console.log("HELLO");
  res.json({ message: "Hello World" });
});
const run = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};
run();
