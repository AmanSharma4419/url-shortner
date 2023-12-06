const express = require("express");
const urlRoutes = require("./routes/url");
const staticRoutes = require("./routes/static.url");
const { connectToDB } = require("./connectionDb");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 7000;

// Adding the dotenv file configuration
require("dotenv").config();
// Db connection set up

connectToDB(process.env.DB_URL).then(() => {
  console.log("Mongodb connected");
});

// Middle ware to set up the view engine i.e ejs
app.set("view engine", "ejs");

// Middle ware to specify the path of ejs files
app.set("views", path.resolve("./views"));

// Middle ware to set teh json raw data into req body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Middle ware to implement the routes redirection
app.use("/", urlRoutes);
app.use("/", staticRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
