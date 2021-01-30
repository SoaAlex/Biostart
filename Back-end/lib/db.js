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
    /*create: async (user) => {
      return execQuery("SELECT * FROM cartridge WHERE cartridge="+cartbridgeId+";")
    },*/
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
    get: async (datId) => {
      return execQuery("SELECT * FROM data;")
    },
    listUtilData: async (field,limit) => {
      return execQuery("SELECT "+field+" FROM data LIMIT "+limit+";")
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