console.clear()
var express = require("express")
var cors = require('cors')
// const referrerPolicy = require('referrer-policy')
var app = express()

// app.all('/', function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Credentials", true)
//   res.header("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE", "OPTIONS")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
//   // res,header("Referrer-Policy","origin")
//   next()
// })

const corsOptions = {
  origin: [
    'http://localhost:5500',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.options('/products/:id', cors()) 

app.get('/', (req, res) => {
  res.send("Hello World!")
})
app.post('/', function (req, res) {
  res.send('Got a POST request');
})
app.put('/', function (req, res) {
  res.send('Got a PUT request at /user');
})
app.delete('/', function (req, res) {
  res.send('Got a DELETE request at /user');
})
app.listen(3000, () => { console.log("Example app listening on port 3000!") })