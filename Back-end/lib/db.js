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
  //pour des futurs updates
  /*filters: {
    create: async (user) => {
    },
    getAll: () => {
    },
    list: async () => {
    },
    update: async(id, user) => {
    },
    delete: async (id) => {
    },
  },*/
  cartbridges: {
    create: async (data) => {
      timestamp = Math.round(new Date().getTime()/1000)
      return execQuery("INSERT INTO `data` (timestamp,cartridge_id,volume,pressure_c1,pressure_c2) VALUES ('"+timestamp+"','"+data.cartridge_id+"','"+data.volume+"','"+data.pressure_c1+"','"+data.pressure_c2+"');")
    },
    get: (cartbridgeId) => {
      return execQuery("SELECT * FROM cartridge WHERE cartridge="+cartbridgeId+";")
    },
    getListState: () => {
      return execQuery("SELECT cartridge_id,state FROM cartridge;")
    },
    list: async () => {
      return execQuery("SELECT * FROM cartridge;")
    },
    update: async(id, user) => {
    },
    delete: async (id) => {
    },
  },
  data: {
    create: async (user) => {
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