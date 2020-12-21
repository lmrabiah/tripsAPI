const express = require("express");
const db = require("./db/models");

const app = express();
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
