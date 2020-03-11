console.clear()
var express = require("express")
const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header')
// var cors = require('cors')
var app = express()
//開放cors
app.all('/', function (req, res, next) {
  res.header({
    "Access-Control-Allow-Origin": "http://localhost:5500",
    "Access-Control-Expose-Headers": "*",
    "Access-Control-Max-Age": 86400,
    'Access-Control-Allow-Credentials': 'true',
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*",

  })
  res.header("Content-Security-Policy", "default-src", "self")
  next()
})
app.use((req, res, next) => {
  console.clear()
  console.log("Request Header:")
  console.log(req.headers)
  next()
})
app.use(expressCspHeader({
  directives: {
    'default-src': [SELF],
    'script-src': [SELF, INLINE, 'somehost.com'],
    'style-src': [SELF, 'mystyles.net'],
    'img-src': ['data:', 'images.com'],
    'worker-src': [NONE],
    'block-all-mixed-content': true
  }
}))
// app.options('*', cors(corsOptions))
app.get('/', (req, res) => {
  console.clear()
  console.log(req.headers)
  res.send("Hello World!")
})
app.post('/', function (req, res) {
  console.clear()
  console.log(req.headers)
  res.send('Got a POST request');
})
app.put('/', function (req, res) {
  res.send('Got a PUT request at /user');
})
app.delete('/', function (req, res) {
  console.log("DELET")

  res.send('Got a DELETE request at /user');
})
app.listen(3000, () => { console.log("Example app listening on port 3000!") })