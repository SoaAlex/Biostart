const { v4: uuid } = require('uuid')
const { clone, merge } = require('mixme')
const microtime = require('microtime')
const mysql = require('mysql');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
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
      return execQuery("SELECT cartridge_id,max_volume FROM cartridge;")
    },
    update: async(id, new_data) => {
      execQuery("SELECT * FROM cartridge WHERE cartridge_id="+id+";")
      .then((old_data)=>{
          data = merge(old_data[0],new_data)
          execQuery("UPDATE cartridge SET filter_id = '"+data.filter_id+"', state = '"+data.state+"', max_volume = '"+data.max_volume+"' WHERE cartridge_id="+id+";")
      })
    },
    delete: async (id) => {
      return execQuery("DELETE FROM cartridge WHERE cartridge_id="+id+";")
    },
  },
  data: {
    create: async (id,data) => {
      timestamp = Math.round(new Date().getTime()/1000)
      execQuery("SELECT * FROM data WHERE timestamp=(SELECT max(timestamp) FROM data) AND cartridge_id="+id+";")
      .then((actualVolume)=>{ 
          execQuery("INSERT INTO `data` (timestamp,cartridge_id,volume,pressure_c1,pressure_c2) VALUES ('"+timestamp+"','"+id+"','"+(actualVolume[0].volume+data.volume)+"','"+data.pressure_c1+"','"+data.pressure_c2+"');")
      })
    },
    get: async (dataId) => {
      if (dataId)
        return execQuery("SELECT * FROM data WHERE data_id = "+dataId+";")
      else
        return execQuery("SELECT * FROM data WHERE timestamp=(SELECT max(timestamp) FROM data)")
    },
    getLastValue: async (dataId) => {
      return execQuery("SELECT * FROM data WHERE timestamp=(SELECT max(timestamp) FROM data) AND cartridge_id="+dataId+";")
    },
    listUtilData: async (field,limit) => {
      return execQuery("SELECT "+field+" FROM data ORDER BY timestamp DESC LIMIT "+limit+";")
    },
    update: async(id, user) => {
    },
    delete: async (id) => {
    },
  },
}

const execQuery = (query)=>{
  return new Promise((resolve,reject) => {
    con.query(query, function (err, result,fields) {
        if (err) throw err;
        resolve(JSON.parse(JSON.stringify(result)))
      });
    });
} 