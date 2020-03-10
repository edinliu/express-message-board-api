console.clear()
const express = require("express")
const app = express()

app.all('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  // res.header("Access-Control-Allow-Headers", "X-Requested-With")//"X-Requested-With"
  // res.header("Access-Control-Allow-Methods", "GET")
  // Access-Control-Allow-Credentials
  next()
})

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.get('/', (req, res) => {
  // console.log(req.headers)
  // console.log(res.headers)
  res.send("Hello World!")
})
app.post('/', function (req, res) {
  res.send('Got a POST request');
});
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});
app.listen(3000, () => { console.log("Example app listening on port 3000!") })