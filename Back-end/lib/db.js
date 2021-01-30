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
  filter: {
    create: async (user) => {
    },
    getAll: () => {
      return new Promise((resolve,reject) => {
        con.query("SELECT * FROM Data LIMIT 10;", function (err, result,fields) {
            if (err) throw err;
            result = JSON.parse(JSON.stringify(result))
            resolve(result)
          });
        });
    },
    list: async () => {
    },
    update: async(id, user) => {
    },
    delete: async (id) => {
    },
  },
  data: {
    create: async (user) => {
    },
    get: async (id) => {
    },
    list: async () => {
    },
    update: async(id, user) => {
    },
    delete: async (id) => {
    },
  },
  admin: {
    clear: async () => {
      await db.clear()
    }
  },
}
