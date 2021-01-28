const express = require('express')
const app = express()
const port = 3000

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/total-filtered', (req, res) => {
    res.send(["532", "64533"])
  })

app.get('/remaining-filter', (req, res) => {
  res.send(["19254", "12"])
})

app.get('/filter-state', (req, res) => {
  res.send(["WATER", "INACTIVE"]) // [0] = Filtre 1 | [1] = Filtre 2 | Peut prendre les valeurs "WATER" , "CLEANING" ou "INACTIVE"
})

app.get('/data-pressure', (req, res) => {
  res.send([[
    24,
    24,
    24,
    24,
    24,
    99,
    135,
    132,
    131,
    74,
    73,
    73,
    92,
    856,
    879,
    185,
    85,
    86,
    90,
    89,
    1289,
    154,
    152,
    153,
    152,
    152,
    152,
    152,
    152,
    152
  ],
  [
    24,
    24,
    24,
    24,
    24,
    99,
    135,
    132,
    131,
    74,
    22,
    73,
    92,
    856,
    879,
    185,
    85,
    86,
    90,
    100,
    1289,
    154,
    152,
    153,
    152,
    152,
    152,
    152,
    152,
    30
  ],
    [
    "11:48:21",
    "11:49:21",
    "11:50:21",
    "11:51:21",
    "11:52:21",
    "11:53:21",
    "11:54:21",
    "11:55:21",
    "11:56:21",
    "11:57:21",
    "11:58:21",
    "11:59:21",
    "12:00:21",
    "12:01:21",
    "12:02:21",
    "12:03:21",
    "12:04:21",
    "12:05:21",
    "12:06:21",
    "12:07:21",
    "12:08:21",
    "12:09:21",
    "12:10:21",
    "12:11:21",
    "12:12:21",
    "12:13:21",
    "12:14:21",
    "12:15:21",
    "12:16:21",
    "12:17:21"
  ]])
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})