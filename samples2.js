console.clear()
const express = require('express')
const bodyParser = require('body-parser')
const Joi = require('joi')
let app = express()
const fs = require("fs")
let datas = fs.readFileSync("data.json")// Get content from file
// console.log(typeof datas)

datas = JSON.parse(datas)
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded())// parse application/x-www-form-urlencoded
app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})
function validateData(data) {
  let schema = {
    name: Joi.string().min(3).required()
  }
  return Joi.validate(data, schema);
}

app.get('/api/data', (req, res) => {
  res.send(datas)
})

app.post('/api/data', (req, res) => {
  // let schema = {
  //   name: Joi.string().min(3).required()
  // }
  // let result = Joi.validate(req.body, schema)
  // if (result.error) {
  //   res.status(400).send(result.error.details[0].message)
  //   return
  // }
  let course = {
    name: req.body.name,
    email: req.body.email,
    title: req.body.title,
    content: req.body.content,
    tag: req.body.tag,
    deletPassword: req.body.deletPassword
  }
  datas.push(course);




  // fs.exists('data.json', function (exists) {
  //   if (exists) {
  //     console.log("yes file exists")
  //     fs.readFile('myjsonfile.json', function readFileCallback(err, data) {
  //       if (err) {
  //         console.log(err)
  //       } else {
  //         obj = JSON.parse(data)
  //         for (i = 0; i < 5; i++) {
  //           obj.table.push({
  //             id: i,
  //             square: i * i
  //           })
  //         }
  //         let json = JSON.stringify(obj)
  //         fs.writeFile('myjsonfile.json', json)
  //       }
  //     });
  //   } else {
  //     console.log("file not exists")
  //   }
  // })




  res.send(course);
})

app.put('/api/data/:id', (req, res) => {
  let course = datas.find(courses => courses.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send('The course with the given ID was not found');
    return
  }
  let result = validateData(req.body)
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return
  }
  course.name = result.value.name
  res.send(course)
})

app.delete('/api/data/:id', (req, res) => {
  let course = datas.find(courses => courses.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send('The course with the given ID was not found');
    return;
  }
  let index = datas.indexOf(course)
  datas.splice(index, 1)
  res.send(course)
})