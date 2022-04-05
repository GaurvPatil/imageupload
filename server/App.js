const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./Db/connect");
require("./modules/imageSchema");

const imageroute = require("./routes/imageroute");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// requests
app.get("/", (req, res) => {
  res.send("Image upload");
});
app.use(imageroute);

// server
const port = 8080;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}... `));
  } catch (error) {
    console.log(error);
  }
};

start();
