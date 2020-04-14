// console.clear()
var express = require('express')
var app = express()
var Joi = require('joi')
var fs = require("fs")
let datas = fs.readFileSync("data.json")
datas = JSON.parse(datas)
const dataSchema = {
  name: Joi.string().min(3).required(),
  email: Joi.string().min(3).required(),
  content: Joi.string().min(3).required(),
  deletePassword: Joi.string().min(3).optional()
}
//Middle Ware
// app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//Response Header
app.all('*', function (req, res, next) {
  // console.log(req.body)
  res.header({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Expose-Headers": "*",
    "Access-Control-Max-Age": 86400,
    'Access-Control-Allow-Credentials': 'true',
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*",
  })
  next()
})

//CRUD Method
app.get('/', (req, res) => {
  let sendData = JSON.parse(JSON.stringify(datas))
  sendData.map(comment => comment.isDelete ? blockDeletedContent(comment) : comment
  )
  res.send(sendData)
})
app.get('/start', (req, res) => {
  res.send("heroku server is open")
})
app.get('/ver', (req, res) => {
  res.send("1")
})
app.post('/', function (req, res) {
  let reqBody = deleteEmptyInObject(req.body)
  let result = Joi.validate(reqBody, dataSchema)
  if (result.error) {
    res.status(400).send(result.error.details[0].message)
    console.log(result.error.details[0].message)
    return
  }
  let newData = result.value
  newData.id = datas.length + 1
  datas.push(newData)
  res.send(newData)
  saveData()
})
app.put('/', (req, res) => {
  console.log(req.body)
  if (req.body.id > datas.length) {
    res.status(404).send('The data with the given ID was not found')
    return
  }
  if (datas[req.body.id - 1].isDelete) {
    res.status(404).send('The data with the given ID was deleted')
    return
  }
  let result = Joi.validate(req.body, dataSchema)
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return
  }
  datas[req.body.id - 1] = result.value
  datas[req.body.id - 1].id = req.body.id
  res.send(datas[req.body.id - 1])
  saveData()
})
app.delete('/:id/:deletePassword', (req, res) => {
  console.log("id")
  console.log(req.params.id)
  console.log("deletePassword")
  console.log(req.params.deletePassword)
  if (req.params.id > datas.length) {
    res.status(404).send('The data with the given ID was not found')
    return
  }
  if (datas[req.params.id - 1].isDelete) {
    res.status(404).send('The data with the given ID was already deleted')
    return
  }
  if (req.params.deletePassword === "n") {
    res.status(404).send('Please input password')
    return
  }
  if (req.params.deletePassword != datas[req.params.id - 1].deletePassword) {
    res.status(404).send('Your delete password is not correct')
    return
  }
  datas[req.params.id - 1].isDelete = true
  let send2 = JSON.parse(JSON.stringify(datas[req.params.id - 1]))
  send2.content = "內容已被使用者刪除"
  res.send(send2)
  saveData()
})
//help function
function saveData() {
  fs.writeFile('data.json', JSON.stringify(datas), (err) => {
    if (err) throw err
    console.log('Users saved!')
  })
}
function deleteEmptyInObject(obj) {
  let key = Object.keys(obj).find(key => obj[key] === "")
  let reqBody = JSON.parse(JSON.stringify(obj))
  delete reqBody[key]
  return reqBody
}
function blockDeletedContent(comment) {
  comment.content = "內容已被使用者刪除"
  return comment
}

const port = process.env.PORT || 3631
app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})
