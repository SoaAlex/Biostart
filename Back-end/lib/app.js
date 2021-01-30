/// AWT
require("dotenv").config();
///DB library
const db = require("./db");
///Express server library
const express = require("express");
const cors = require("cors");
const app = express();
///Add necessary element in app
app.use(require("body-parser").json());
//app.use(cors())
app.use(cors({ origin: true, credentials: true }));
/*****************************/

///Basic Route
app.get("/", (req, res) => {
  res.send(["<h1>Biostart Back-end</h1>"].join(""));
});

/**************  Filter  ****************/

app.post("/filters", async (req, res) => {

});

//get user thanks to his id
app.get("/cartbridges", async(req, res) => {
  db.filter.getAll()
  .then((result)=>{
    console.log(result);
    res.status(201).send(result);
  })
  .catch((error)=>{
    res.status(404).send("Error");
  })
});

//delete a specific user
app.delete("/filters/:id", async (req, res) => {

});

module.exports = app;
