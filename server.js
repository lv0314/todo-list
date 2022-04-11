require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const { MONGO_URI } = process.env;

app.use(express.json());
app.use(cors());

mongoose.connect(MONGO_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to Database"));

const columnsRouter = require("./routes/columns");
app.use("/columns", columnsRouter);
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT || 8080);
