const { v4: uuid } = require('uuid')
const { clone, merge } = require('mixme')
const microtime = require('microtime')
const mysql = require('mysql');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  //password: "",
  password: "raspberry",
  database: "biostart"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


module.exports = {
  cartridge: {
    create: async (data) => {
      return execQuery("INSERT INTO `cartridge` (filter_id,state,max_volume) VALUES ('"+data.filterId+"','"+data.state+"','"+data.max_volume+"');")
    },
    get: (cartridgeId) => {
      return execQuery("SELECT * FROM cartridge WHERE cartridge_id="+cartridgeId+";")
    },
    getList: () => {
      return execQuery("SELECT * FROM cartridge;")
    },
    getListState: () => {
      return execQuery("SELECT cartridge_id,state FROM cartridge;")
    },
    getListVolume: () => {
      return execQuery("SELECT cartridge_id,actual_volume,max_volume FROM cartridge;")
    },
    update: async(id, new_data) => {
      execQuery("SELECT * FROM cartridge WHERE cartridge_id="+id+";")
      .then((old_data)=>{
          data = merge(old_data[0],new_data)
          execQuery("UPDATE cartridge SET filter_id = '"+data.filter_id+"', state = '"+data.state+"', max_volume = '"+data.max_volume+"' WHERE cartridge_id="+id+";")
      })
    },
    updateVolume: async(new_data) => {
      execQuery("SELECT * FROM cartridge;")
      .then((old_data)=>{
        volumeF1 = 0,volumeF2=0
        if(old_data[0].state === 1 && old_data[1].state === 1){
          volumeF1=new_data/2
          volumeF2=new_data/2
        } else if (old_data[0].state === 1 && old_data[1].state === 0){
          volumeF1=new_data
        } else if (old_data[0].state === 0 && old_data[1].state === 1){
          volumeF1=new_data
        }
          actual_volumeF1 = volumeF1+old_data[0].actual_volume
          actual_volumeF2 = volumeF2+old_data[1].actual_volume

          execQuery("UPDATE cartridge SET actual_volume = '"+actual_volumeF1+"' WHERE cartridge_id="+1+";")
          execQuery("UPDATE cartridge SET actual_volume = '"+actual_volumeF2+"' WHERE cartridge_id="+2+";")
      })
    },
    delete: async (id) => {
      return execQuery("DELETE FROM cartridge WHERE cartridge_id="+id+";")
    },
  },
  data: {
    create: async (data) => {
      console.log(data)
      console.log(data.volume)
      if (!data){
        console.log("No data")
        throw new Error("no data")
      }
      if (typeof(data.flow) == "undefined")
      {
        console.log("No FLOW")
        throw new Error("no flow")
      }
      timestamp = Math.round(new Date().getTime()/1000)
      execQuery("INSERT INTO `data` (timestamp,filter_id,flow,pressure_c1,pressure_c2) VALUES ('"+timestamp+"','"+0+"','"+data.volume+"','"+data.pressure_c1+"','"+data.pressure_c2+"');")
    },
    get: async (timestamp) => {
      if (timestamp)
        return execQuery("SELECT * FROM data WHERE data_id = "+timestamp+";")
      else
        return execQuery("SELECT * FROM data WHERE timestamp=(SELECT max(timestamp) FROM data)")
    },
    getLastValue: async () => {
      return execQuery("SELECT * FROM data WHERE timestamp=(SELECT max(timestamp) FROM data);")
    },
    listUtilData: async (field,limit) => {
      return execQuery("SELECT "+field+" FROM data ORDER BY timestamp DESC LIMIT "+limit+";")
    },
    update: async(id, user) => {
    },
    delete: async (timestamp) => {
      return execQuery("DELETE FROM data WHERE timestamp="+timestamp+";")
    },
  },
}

const execQuery = (query)=>{
  return new Promise((resolve,reject) => {
    con.query(query, function (err, result,fields) {
        if (err) reject(err)
        else 
          resolve(JSON.parse(JSON.stringify(result)))
      });
    });
} 
