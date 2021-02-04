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

/**************  cartridges  ****************/

//Create
app.post("/cartridges", async (req, res) => {
  db.cartridge.create(req.body)
  .then((result)=>{
    res.status(201).send(result);
  })
  .catch((error)=>{
    res.status(404).send("Error");
  })
});

//get cartridges thanks to his id
app.get("/cartridges", async(req, res) => {
  db.cartridge.getList()
  .then((result)=>{
    res.status(200).send(result);
  })
  .catch((error)=>{
    res.status(404).send("Error");
  })
});

//get cartridges thanks to his id
app.get("/cartridges/:id", async(req, res) => {
  db.cartridge.get(req.params.id)
  .then((result)=>{
    res.status(200).send(result);
  })
  .catch((error)=>{
    res.status(404).send("Error");
  })
});

//modified a specific cartridge
app.put("/cartridges/:id", async (req, res) => {
  if (!req.body) throw new Error("request body is empty");
  if (!req.params.id) throw new Error("an id is needed");
  db.cartridge.update(req.params.id,req.body)
  .then(()=>{
    res.status(200).send("Modified");
  })
  .catch((error)=>{
    res.status(404).send("Error");
  })
});

//delete a specific cartridge
app.delete("/cartridges/:id", async (req, res) => {
  if (!req.params.id) throw new Error("an id is needed");
  db.cartridge.delete(req.params.id)
  .then((result)=>{
    res.status(200).send(result);
  })
  .catch((error)=>{
    res.status(404).send("Error");
  })
});

/**************  data  ****************/

app.post("/data/:id", async (req, res) => {
  db.data.create(req.params.id,req.body)
  .then(()=>{
    db.data.getLastValue(1)
    .then((lastValue1)=>{
      db.data.getLastValue(2)
      .then((lastValue2)=>{
        db.cartridge.getListVolume()
        .then((maxVolume)=>{
          RemainingFilter1= maxVolume[0].max_volume - (lastValue1.length>0?lastValue1[0].volume:0 )
          RemainingFilter2= 0//maxVolume[1].max_volume - lastValue2.length>0?lastValue2[0].volume:0
          console.log(RemainingFilter1)
          res.send({0:RemainingFilter1>=0?1:0,1:RemainingFilter2>=0?1:0})
        })
      })
    })
  })
  .catch((error)=>{
    res.status(404).send("Error");
  })
});

//get data thanks to his id
app.get("/data", async(req, res) => {
  db.data.get()
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
    db.data.getLastValue(2)
    .then((lastValue2)=>{
      volumeFilter1=lastValue1.length?lastValue1[0].volume:0
      volumeFilter2=lastValue2.length?lastValue2[0].volume:0
      res.send([volumeFilter1,volumeFilter2])
    })
  })
  .catch((error)=>{
    res.status(404).send(error);
  })
})

app.get('/current-data', (req, res) => {
  db.data.getLastValue(1)
  .then((lastValue1)=>{
    db.data.getLastValue(2)
    .then((lastValue2)=>{
      volumeFilter1=lastValue1.length?lastValue1[0].volume:0
      volumeFilter2=lastValue2.length?lastValue2[0].volume:0
      res.send([volumeFilter1,volumeFilter2])
    })
  })
  .catch((error)=>{
    res.status(404).send(error);
  })
})

app.get('/remaining-filter', (req, res) => {
  db.data.getLastValue(1)
  .then((lastValue1)=>{
    db.data.getLastValue(2)
    .then((lastValue2)=>{
      db.cartridge.getListVolume()
      .then((maxVolume)=>{
        volumeFilter1=lastValue1.length?lastValue1[0].volume:0
        volumeFilter2=lastValue2.length?lastValue2[0].volume:0
        res.send([maxVolume[0].max_volume-volumeFilter1,maxVolume[1].max_volume-volumeFilter2])
      })
    })
  })
  .catch((error)=>{
    res.status(404).send(error);
  })
})

app.get('/filter-state', (req, res) => {
  db.cartridge.getListState()
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

