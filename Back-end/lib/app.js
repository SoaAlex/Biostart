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


///Basic Route
app.get("/", (req, res) => {
  res.send(["<h1>Biostart Back-end</h1>"].join(""));
});

/**************  Filter  ****************/

app.post("/filters", async (req, res) => {

});

//get user thanks to his id
app.get("/cartbridges", async(req, res) => {
  db.cartbridges.get()
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

/******************* Front ************************/
app.get('/total-filtered', (req, res) => {
  res.send(["532", "64533"])
})

app.get('/remaining-filter', (req, res) => {
res.send(["19254", "12"])
})

app.get('/filter-state', (req, res) => {
//res.send(["WATER", "INACTIVE"]) // [0] = Filtre 1 | [1] = Filtre 2 | Peut prendre les valeurs "WATER" , "CLEANING" ou "INACTIVE"
  db.cartbridges.getListState()
  .then((result)=>{
    console.log(result);
    resultArray = []
    result.forEach(element => {
      resultArray.push(element.state==0?"INACTIVE":(element.state==1?"WATER":"CLEANING"))
    });
    res.status(201).send(resultArray);
  })
  .catch((error)=>{
    res.status(404).send("Error");
  })
})

app.get('/data-pressure', (req, res) => { // [0] = Pression Amont | [1] = Pression aval | [2] = timestamp du prélèvement (date ou heure à réfléchir)
  db.data.listUtilData("pressure_c1,pressure_c2,timestamp",30)
  .then((result)=>{
    console.log(result);
    pressure_c1 = []
    pressure_c2 = []
    time = []
    result.forEach(element => {
      pressure_c1.push(element.pressure_c1)
      pressure_c2.push(element.pressure_c2)

      var date = new Date(element.timestamp * 1000);
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds();
      var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
      time.push(formattedTime)
    });
    console.log([pressure_c1,pressure_c2,time]);
    res.status(201).send([pressure_c1,pressure_c2,time]);
  })
  .catch((error)=>{
    res.status(404).send("Error");
  })
})

app.get('/data-flow', (req, res) => {
  db.data.listUtilData("pressure_c1,timestamp",30)
  .then((result)=>{
    console.log(result);
    pressure_c1 = []
    time = []
    result.forEach(element => {
      pressure_c1.push(element.pressure_c1)

      var date = new Date(element.timestamp * 1000);
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds();
      var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
      time.push(formattedTime)
    });
    console.log([pressure_c1,time]);
    res.status(201).send([pressure_c1,time]);
  })
  .catch((error)=>{
    res.status(404).send("Error");
  })
})

module.exports = app;

