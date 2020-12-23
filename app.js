const express = require("express");
const db = require("./db/models");
const cors = require("cors");
const SequelizeSlugify = require("sequelize-slugify");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
const userRoutes = require("./routes/users");
const tripsRoutes = require("./routes/trips");
const bodyParser = require("body-parser");
const app = express();

// Middleware

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use(userRoutes);
app.use("/trips", tripsRoutes);

app.get("/", (req, res) => {
  console.log("HELLO");
  res.json({ message: "Hello World" });
});

// if i put wrong url for example: localhost:8000/tripssss
app.use((req, res, next) => {
  console.log("Path dosn't exist");
  res.status(404).json({ message: "Path not found" });
});

//all errors (error handle middle ware)
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status ?? 500);
  res.json({ message: err.message ?? "internal server error" });
});

const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};
run();
