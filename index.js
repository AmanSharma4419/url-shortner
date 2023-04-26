const express = require("express");
const urlRoutes = require("./routes/url");
const { connectToDB } = require("./connectionDb");
const app = express();
const PORT = 7000;
const dbUrl = "mongodb://localhost:27017/url-shortner";

connectToDB(dbUrl).then(() => {
  console.log("Mongodb connected");
});

app.use(express.json());

app.use("/", urlRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
