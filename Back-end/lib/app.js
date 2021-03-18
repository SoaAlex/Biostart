/// AWT
require("dotenv").config();
///DB library
const db = require("./db");
///Express server library
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
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

app.post("/data", async (req, res) => {  
  if(req.body=="undefined") throw new Error("No data")
  if(req.body.volume=="undefined") throw new Error("No volume")
  db.cartridge.updateVolume(req.body.volume)
  db.data.create(req.body)
  .then(()=>{
    /*db.cartridge.getListVolume()
    .then((filterVolume)=>{
      console.log(filterVolume)
      RemainingFilter1 = filterVolume[0].max_volume - filterVolume[0].actual_volume
      RemainingFilter2 = filterVolume[1].max_volume - filterVolume[1].actual_volume
      res.json({0:RemainingFilter1>=0?1:0,1:RemainingFilter2>=0?1:0})
    })*/
	db.cartridge.getList()
    .then((filter)=>{
      console.log(filter)
      res.json({0:filter[0].state,1:filter[1].state})
	})
   })
  .catch((error)=>{
    res.status(404).send("Error "+error);
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

//get the total volume filtered
app.get('/total-filtered', (req, res) => {
  db.cartridge.getListVolume()
  .then((listVolume)=>{
    volumeFilter1=listVolume[0].actual_volume
    volumeFilter2=listVolume[1].actual_volume
    res.send([volumeFilter1,volumeFilter2])    
  })
  .catch((error)=>{
    res.status(404).send(error);
  })
})

//get the remaining volume filtered
app.get('/remaining-filter', (req, res) => {
  db.cartridge.getListVolume()
  .then((listVolume)=>{
    volumeFilter1 = listVolume[0].actual_volume
    maxVolume1 = listVolume[0].max_volume
    volumeFilter2=listVolume[1].actual_volume
    maxVolume2 = listVolume[1].max_volume
    res.send([maxVolume1-volumeFilter1,maxVolume2-volumeFilter2]) 
  })
  .catch((error)=>{
    res.status(404).send(error);
  })
})

//get the cartridge state
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

app.get('/current-data', (req, res) => {
  db.data.getLastValue()
  .then((lastValue)=>{
    res.send({0:lastValue[0].flow,1:lastValue[0].pressure_c1,2:lastValue[0].pressure_c2})
  })
  .catch((error)=>{
    res.status(404).send("Error");
  })
});

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
  db.data.listUtilData("flow,timestamp",30)
  .then((result)=>{

    promArray = [];

    pressure_c1 = []
    time = []
    console.log(result);
    result.forEach(element => {
      promArray.push(new Promise((resolve) => {
        pressure_c1.push(element.flow)

        var date = new Date(element.timestamp * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        time.push(formattedTime)
        resolve();
      }))
    });
    Promise.all(promArray).then(_ => {
      console.log(pressure_c1);
      res.status(201).send([pressure_c1.reverse(),time.reverse()]);

    })
    
  })
  .catch((error)=>{
    res.status(404).send("Error");
  })
})


app.listen(3001, () => {
  console.log(`Server is waiting for you at http://localhost:3001`)
})

module.exports = app;
