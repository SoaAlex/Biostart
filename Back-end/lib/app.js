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

/**************  cartbridges  ****************/

app.post("/cartbridges", async (req, res) => {

});

//get cartbridges thanks to his id
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

/**************  data  ****************/

app.post("/data", async (req, res) => {
  db.cartbridges.create(req.body)
  res.send("OK")
});

//get data thanks to his id
app.get("/data", async(req, res) => {
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

/******************* Front utileroute ************************/
app.get('/total-filtered', (req, res) => {
  db.data.getLastValue(1)
  .then((lastValue1)=>{
    db.data.getLastValue(1)
    .then((lastValue2)=>{
      res.send([lastValue1[0].volume,lastValue2[0].volume])
    })
  })
  .catch((error)=>{
    res.status(404).send(error);
  })
})

app.get('/remaining-filter', (req, res) => {
res.send(["19254", "12"])
})

app.get('/filter-state', (req, res) => {
  db.cartbridges.getListState()
  .then((result)=>{
    resultArray = []
    result.forEach(element => {
      resultArray.push(element.state==0?"INACTIVE":(element.state==1?"WATER":"CLEANING"))
    });
    res.status(201).send(resultArray);
  })
  .catch((error)=>{
    res.status(404).send(error);
  })
})

app.get('/data-pressure', (req, res) => { // [0] = Pression Amont | [1] = Pression aval | [2] = timestamp du prélèvement (date ou heure à réfléchir)
  db.data.listUtilData("pressure_c1,pressure_c2,timestamp",30)
  .then((result)=>{
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
    res.status(201).send([pressure_c1.reverse(),pressure_c2.reverse(),time.reverse()]);
  })
  .catch((error)=>{
    res.status(404).send("Error");
  })
})

app.get('/data-flow', (req, res) => {
  db.data.listUtilData("pressure_c1,timestamp",30)
  .then((result)=>{
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
    res.status(201).send([pressure_c1.reverse(),time.reverse()]);
  })
  .catch((error)=>{
    res.status(404).send("Error");
  })
})

module.exports = app;

