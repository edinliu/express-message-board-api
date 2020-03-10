console.clear()
const express = require("express")
const app = express()

// app.all('/', function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD, OPTIONS")//"X-Requested-With"
//   res.header("Access-Control-Allow-Credentials", true)
//   res.header("Access-Control-Allow-Headers", "X-Requested-With, origin, content-type, accept")
//   // res.header("Access-Control-Allow-Methods", "GET")
//   next()
// })
app.use((req, res, next) => {
  console.log(req.headers)
  next()
})
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE", "OPTIONS")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.options(

)
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
app.delete('/', function (req, res) {
  res.send('Got a DELETE request at /user');
});
app.listen(3000, () => { console.log("Example app listening on port 3000!") })