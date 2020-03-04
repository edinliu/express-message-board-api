console.clear()
const express = require('express')
const Joi = require('joi')
const app = express()
const fs = require("fs")
let datas = fs.readFileSync("data.json")// Get content from file
datas = JSON.parse(datas)

//Middle Ware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//GET
app.get('/', (req, res) => {
  res.send(datas)
})
/**
/:param is in params
?var=value is in query
 */
app.get('/:year/:month', (req, res) => {
  res.send(JSON.stringify(req.params) + '\n' + JSON.stringify(req.query))
})
function validateData(data) {
  let schema = {
    name: Joi.string().min(3).required(),
    email: Joi.string().min(5).required(),
    title: Joi.string().min(5).required(),
    content: Joi.string().min(20).required(),
    tag: Joi.string().min(5).required(),
    deletPassword: Joi.string().min(5).required(),
  }
  return Joi.validate(data, schema)
}
app.post('/', function (req, res) {
  let result = validateData(req.body)
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return
  }
  let newData = result.value
  newData.id = datas.length + 1
  datas.push(newData)
  res.send(datas)
  fs.writeFile('data.json', JSON.stringify(datas), (err) => {
    if (err) throw err
    console.log('Users saved!')
  })
})

app.put('/:id', (req, res) => {
  let targetId
  let found = datas.find(i => i.id === parseInt(req.params.id) ? targetId = i.id : null
  )
  if (!found) {
    res.status(404).send('The course with the given ID was not found');
    return
  }
  let result = validateData(req.body); //參數傳入req.body，一行解決
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return
  }
  datas[targetId - 1] = result.value
  datas[targetId - 1].id = targetId
  res.send(datas)
})

app.delete('/api/courses/:id', (req, res) => {
  let found = datas.find(i => i.id === parseInt(req.params.id))
  if (!found) {
    res.status(404).send('The course with the given ID was not found')
    return
  }
  let index = datas.indexOf(found)
  /* The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.*/
  // what return is number 

  datas.splice(index, 1);
  // This method changes the contents of an array by removing existing elements and/or adding new elements.
  res.send(datas); //傳給client端
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})