/// AWT
require("dotenv").config();
///DB library
const db = require("./db");
///Express server library
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
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
  db.cartridge.updateVolume(req.body.volume)
  .then(()=>{
  db.data.create(req.body)
  .then(()=>{
    db.cartridge.getList()
    .then((cartridge)=>{
      
      RemainingFilter1 = cartridge[0].max_volume - cartridge[0].actual_volume
      RemainingFilter2 = cartridge[1].max_volume - cartridge[1].actual_volume
      filter1 = cartridge[0].state
      filter2 = cartridge[1].state
      filter1old = filter1
      filter2old = filter2
      date1 = cartridge[0].cleaning_date
      date2 = cartridge[1].cleaning_date
      volume1 = cartridge[0].actual_volume
      volume2 = cartridge[1].actual_volume

      if(cartridge[0].state==1 && RemainingFilter1<=0 && cartridge[1].state!=2 && RemainingFilter2>0){
        console.log("Filter1 : 2 ,Filter2 : 1")
        filter1 = 2
        filter2 = 1
      }
      else if(cartridge[0].state==1 && RemainingFilter1<=0 && cartridge[1].state==2){
        console.log("Filter1 : 2 ,Filter2 : 2")
        filter1 = 2
        filter2 = 2
      }
      if(cartridge[1].state==1 && RemainingFilter2<=0 && cartridge[0].state!=2 && RemainingFilter1>0){
        console.log("Filter1 : 2 ,Filter2 : 1")
        filter2 = 2
        filter1 = 1
      }
      else if(cartridge[1].state==1 && RemainingFilter2<=0 && cartridge[0].state==2){
        console.log("Filter1 : 2 ,Filter2 : 2")
        filter2 = 2
        filter1 = 2
      }
      console.log(cartridge[0].cleaning_date,",",cartridge[1].cleaning_date)
      if(filter1==2 && filter1!=filter1old)
        date1 = Math.round(new Date().getTime() / 1000)+cartridge[0].cleaning_time
      
      if(filter2==2 && filter2!=filter2old)
        date2 = Math.round(new Date().getTime() / 1000)+cartridge[1].cleaning_time
      
      if(filter1==2 && date1<Math.round(new Date().getTime() / 1000) && date1!=0){
        if(filter2!=1)
          filter1 = 1
        else 
          filter1 = 0
        date1 = 0
        volume1 = 0
      }

      if(filter2==2 && date2<Math.round(new Date().getTime() / 1000) && date2!=0){
        if(filter1!=1)
          filter2 = 1
        else 
          filter2 = 0
        date2 = 0
        volume2 = 0
      }

      db.cartridge.update(1,{state:filter1,cleaning_date:date1,actual_volume:volume1}).then(()=>{
        db.cartridge.update(2,{state:filter2,cleaning_date:date2,actual_volume:volume2}).then(()=>{
          res.send({0:filter1,1:filter2})
        })
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


app.listen(3000, () => {
  console.log(`Server is waiting for you at http://localhost:3001`)
})

module.exports = app;
