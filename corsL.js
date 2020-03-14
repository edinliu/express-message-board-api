console.clear()
var express = require('express')
var cors = require('cors')
var app = express()
app.all('/', function (req, res, next) {
  res.header({
    "Access-Control-Expose-Headers": "*",
  })

  next()
})
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.delete('/', function (req, res, next) {
  res.json({ msg: 'This is CORS-enabled for only example.com.' })
})

app.listen(3000, function () {
  console.log('CORS-enabled web server listening on port 3000')
})